import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  filter,
  map,
  merge,
  pairwise,
  shareReplay,
  startWith,
  switchMap,
  tap,
  timer,
} from "rxjs";
import { CampaignClipsListPageContextActionsType } from "./interface";
import { campaignListService } from "services/campaignListService";
import { DownloadClipPropsType, RequestErrorResponse } from "./types";
import { Campaign, CampaignPlayListFileType } from "services/campaignListService/types";
import { SortType } from "components/EditPageCustomFields/CampaignGroup/Channels/types";
import { notificationsDispatcher } from "services/notifications";
import i18n from "i18n";
import mediaFileClient from "services/MediaFileClient";
import { fileService } from "services/FileService";
import { ProjectMediaFile } from "services/MediaLibraryService/interface";
import { isNull, xor } from "lodash";

const projectId$ = new Subject<string | null>();
const reloadListData$ = new Subject<void>();
export const sortStream$ = new BehaviorSubject<SortType>({
  column: 'name',
  direction: 'asc',
});
export const tablePage$ = new BehaviorSubject<number>(0);
export const rowsPerPage$ = new BehaviorSubject<number>(10);

const removeClips$ = new Subject<string[]>();
const downloadClip$ = new Subject<DownloadClipPropsType>();

const loadListDataProps$ = combineLatest([
  projectId$.pipe(startWith(null)),

  timer(0, 5000),

  reloadListData$.pipe(startWith(undefined)),
]).pipe(
  debounceTime(10),
  filter(([projectId]) => !isNull(projectId)),
  map(([projectId]) => projectId),
);

/**
 * Шина загрузки кампаний
 */
const loadingProjectCampaignsBus$ = loadListDataProps$.pipe(
  switchMap(async projectId => {
    try {
      return await campaignListService().getCampaignsByProjectId(projectId!);
    } catch (errorObject) {
      return { error: String(errorObject) } as RequestErrorResponse;
    }
  }),
  shareReplay(1),
);

/**
 * Загруженные кампании
 */
export const allCampaigns$: Observable<Campaign[]> = loadingProjectCampaignsBus$.pipe(
  filter(response => !(response as RequestErrorResponse)?.error && !!response),
  map(response => response as Campaign[]),
);

/**
 * Подготовленный масив роликов
 */
const campaignsClips$ = allCampaigns$.pipe(
  map(campaigns => campaigns.flatMap(campaign => campaign.playlists.map(playlist => ({
    playlist: playlist,
    campaignName: campaign.name,
  })))),
  map(playlists => {
    const result: CampaignPlayListFileType[] = playlists.map(({ playlist, campaignName }) => {
      const campaignPlaylistsFiles: CampaignPlayListFileType[] = playlist.campaignPlaylist?.files
      .map(file => ({
        file: file.file,
        file_id: file.file_id,
        id: file.id,
        playlist_id: file.playlist_id,
        sort: file.sort,
        volume: file.volume,
        isFreeProjectFile: false,
        campaignName,
      })) || [];

      return campaignPlaylistsFiles as CampaignPlayListFileType[];
    }).flat(1);

    return result;
  }),
  shareReplay(1),
);

/**
 * Removing not used in playlists project files by file IDs bus
 */
const removeClipsBus$ = removeClips$.pipe(
  debounceTime(10),
  switchMap(async fileIds => {
    try {
      return await fileService().deleteProjectFilesByFileIds(fileIds);
    } catch {
      return 0;
    }
  }),
  tap(result => {
    if (!!result) {
      return
    }

    notificationsDispatcher().dispatch({
      message: i18n.t("campaign-clips-list.error.remove-clips"),
      type: "error",
    });
  }),
  tap((result) => {
    if (!result) {
      return
    }

    notificationsDispatcher().dispatch({
      message: result === 1
        ? i18n.t("campaign-clips-list.success.remove-clip")
        : i18n.t("campaign-clips-list.success.remove-clips", { amount: result }),
      type: "success",
    });
  }),
  shareReplay(1),
);

/**
 * Bus for loading free project files
 */
const loadProjectFilesBus$ = combineLatest([
  loadListDataProps$,
  removeClipsBus$.pipe(
    filter(result => !!result),
    startWith(undefined),
  ),
]).pipe(
  map(([loadListDataProps]) => loadListDataProps),
  switchMap(async projectId => {
    try {
      return await fileService().getProjectFilesByProjectId(projectId!);
    } catch (errorObject) {
      return { error: String(errorObject) } as RequestErrorResponse;
    }
  }),
  shareReplay(1),
);

/**
 * Loaded project files
 */
const loadedProjectFiles$: Observable<CampaignPlayListFileType[]> = loadProjectFilesBus$.pipe(
  filter(response => !(response as RequestErrorResponse)?.error && !!response),
  map(response => response as ProjectMediaFile[]),
  map(files => files.map(file => ({
    file: file as any,
    file_id: file.id || "0",
    id: file.id,
    playlist_id: "",
    sort: 0,
    volume: 0,
    isFreeProjectFile: true,
  })) as CampaignPlayListFileType[]),
);

/**
 * Combine clips from the project files and from campaigns
 */
const clips$ = combineLatest([
  loadedProjectFiles$,
  campaignsClips$,
]).pipe(
  map(([projectFiles, campaignsClips]) => {
    //  Filter campaign files from project files to protect removing them from server
    const filteredProjectFiles = projectFiles
    .filter(file => campaignsClips.every(cFile => file.file.file_name !== cFile.file.file_name));

    return [...campaignsClips, ...filteredProjectFiles] as CampaignPlayListFileType[];
  }),
  filter(clips => !!clips),
  startWith([]),
  pairwise(),
  filter(([prev, curr]) => !!xor(prev.map(item => Number(item.file_id)), curr.map(item => Number(item.file_id))).length),
  map(values => values[1]),
);

/**
 * Сортировка строк таблицы
 */
export const sortedClips$ = combineLatest([
  clips$,
  sortStream$,
]).pipe(
  map(([clips, sortParams]) => ({ clips: clips as CampaignPlayListFileType[], sortParams })),
  map(({ clips, sortParams }) => clips.sort((a, b) => {
    const aValue = sortParams.column === 'name'
      ? a.file.origin_name
      : new Date(a.file.creation_date || a.file.last_change_date).getTime();
    const bValue = sortParams.column === 'name'
      ? b.file.origin_name
      : new Date(b.file.creation_date || b.file.last_change_date).getTime();

    if (sortParams.direction === "asc") {
      return sortParams.column === 'name' 
        ? (bValue as string).localeCompare(aValue as string) 
        : Number(bValue) - Number(aValue);
    }

    return sortParams.column === 'name' 
        ? (aValue as string).localeCompare(bValue as string) 
        : Number(aValue) - Number(bValue);
  })),
  shareReplay(1),
  tap(() => tablePage$.next(0)),
);

/**
 * Строки таблицы для отрисовки
 */
export const tableRows$: Observable<CampaignPlayListFileType[]> = combineLatest([
  sortedClips$,
  merge(
    sortStream$.pipe(map(() => 0)),
    rowsPerPage$.pipe(map(() => 0)),
    tablePage$,
  ),
  rowsPerPage$,
]).pipe(
  debounceTime(100),
  map(([clips, pagination, rowsPerPage]) => ({ clips, pagination, rowsPerPage })),
  map(({ clips, pagination, rowsPerPage }) => clips.slice(pagination * rowsPerPage, (pagination + 1) * rowsPerPage)),
  shareReplay(1),
);

/**
 * Шина загрузки ролика
 */
const downloadClipBus$ = downloadClip$.pipe(
  switchMap(async ({ fileName, title }) => {
    try {
      const response = await mediaFileClient().Load(
        fileName,
        true,
      );

      const url = window.URL.createObjectURL(response);

      const link = document.createElement('a');

      link.href = url;

      link.setAttribute(
        'download',
        `${title}`,
      );
  
      document.body.appendChild(link);
  
      link.click();
  
      link?.parentNode?.removeChild(link);
    } catch (error) {
      notificationsDispatcher().dispatch({
        message: i18n.t("campaign-clips-list.error.load-clip"),
        type: "error",
      });
    }
  })
);

/**
 * Флаг загрузки листинга
 */
export const isLoading$ = combineLatest([
  //  Загрузка кампаний проекта
  merge(
    projectId$.pipe(map(() => ({ loadingProjectCampaigns: true }))),
    loadingProjectCampaignsBus$.pipe(map(() => ({ loadingProjectCampaigns: false }))),
  ).pipe(startWith({ loadingProjectCampaigns: false })),

  //  Подготовка строк таблицы
  merge(
    projectId$.pipe(map(() => ({ prepareRows: true }))),
    clips$.pipe(map(() => ({ prepareRows: false }))),
  ).pipe(startWith({ prepareRows: false })),
]).pipe(
  map(response => response.map(el => Object.values(el)).some(value => !!value[0])),
  shareReplay(1),
);

/**
 * Флаг обработки операций над листингом без подгрузки новых данных
 */
export const isLocalLoading$: Observable<boolean> = combineLatest([
  //  Обработка сортировки строк таблицы
  merge(
    sortStream$.pipe(map(() => ({ sortRows: true }))),
    sortedClips$.pipe(map(() => ({ sortRows: false }))),
  ).pipe(startWith({ sortRows: false })),

  //  Обработка пагинации таблицы
  merge(
    rowsPerPage$.pipe(map(() => ({ paginateRows: true }))),
    tableRows$.pipe(map(() => ({ paginateRows: false }))),
  ).pipe(startWith({ paginateRows: false })),

  //  Удаление файлов с сервера
  merge(
    removeClips$.pipe(map(() => ({ removeClips: true }))),
    removeClipsBus$.pipe(map(() => ({ removeClips: false }))),
  ).pipe(startWith({ removeClips: false })),

  //  Pfuheprf файлов с сервера
  merge(
    downloadClip$.pipe(map(() => ({ downloadClip: true }))),
    downloadClipBus$.pipe(map(() => ({ downloadClip: false }))),
  ).pipe(startWith({ downloadClip: false })),
]).pipe(
  map(response => response.map(el => Object.values(el)).some(value => !!value[0])),
  shareReplay(1),
);

/**
 * Записываем ID продукта для инициализации контекста
 * @param projctId
 */
const setProjctId: CampaignClipsListPageContextActionsType['setProjctId'] = projctId => {
  projectId$.next(projctId);
};

/**
 * Записываем параметры сортировки таблицы
 * @param sortParams
 */
const setSortParams: CampaignClipsListPageContextActionsType['setSortParams'] = sortParams => {
  sortStream$.next(sortParams);
};

/**
 * Перезагружаем список кампаний
 */
const reloadListData: CampaignClipsListPageContextActionsType['reloadListData'] = () => {
  reloadListData$.next();
};

/**
 * Изменение страницы листинга
 */
const onChangeListPage: CampaignClipsListPageContextActionsType['onChangeListPage'] = (pageCount) => {
  tablePage$.next(pageCount);
};

/**
 * Изменение лимита строк на страницу
 */
const onChangeLimit: CampaignClipsListPageContextActionsType['onChangeLimit'] = (limit) => {
  rowsPerPage$.next(limit);

  tablePage$.next(0);
};

/**
 * Удаление переданых клипов
 */
const removeClips: CampaignClipsListPageContextActionsType['removeClips'] = (clips) => {
  removeClips$.next(clips);
};

/**
 * Скачиваем ролик
 */
const downloadClip: CampaignClipsListPageContextActionsType['downloadClip'] = (fileName, title) => {
  downloadClip$.next({ fileName, title });
};

export const actions: CampaignClipsListPageContextActionsType = {
  setProjctId,
  setSortParams,
  reloadListData,
  onChangeListPage,
  onChangeLimit,
  removeClips,
  downloadClip,
};