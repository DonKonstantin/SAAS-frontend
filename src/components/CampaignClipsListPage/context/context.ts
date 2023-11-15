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
import { CampaignPlayListFileType } from "services/campaignListService/types";
import { SortType } from "components/EditPageCustomFields/CampaignGroup/Channels/types";
import { notificationsDispatcher } from "services/notifications";
import i18n from "i18n";
import mediaFileClient from "services/MediaFileClient";
import { fileService } from "services/FileService";
import { ProjectMediaFile } from "services/MediaLibraryService/interface";
import { isNull, xor } from "lodash";
import { CampaignFileWithCampaignName } from "services/campaignListService/interface";

const projectId$ = new Subject<string | null>();
const reloadListData$ = new Subject<void>();
export const sortStream$ = new BehaviorSubject<SortType>({
  column: 'origin_name',
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
  map(([projectId, rowsPerPage, tablePage]) => ({
    projectId,
    rowsPerPage,
    tablePage,
  })),
);

/**
 * Шина загрузки кампаний
 */
const loadingProjectCampaignsBus$ = loadListDataProps$.pipe(
  switchMap(async ({ projectId }) => {
    try {
      return await campaignListService().getCampaignsPlaylistsByProjectId(projectId!);
    } catch (errorObject) {
      return { error: String(errorObject) } as RequestErrorResponse;
    }
  }),
  shareReplay(1),
);

/**
 * Загруженные кампании
 */
const loadedCampaignsClips$: Observable<CampaignFileWithCampaignName[]> = loadingProjectCampaignsBus$.pipe(
  filter(response => !(response as RequestErrorResponse)?.error && !!response),
  map(response => response as CampaignFileWithCampaignName[]),
);

/**
 * Подготовленный масив роликов
 */
const campaignsClips$ = loadedCampaignsClips$.pipe(
  map(playlists => {
    const result: CampaignPlayListFileType[] = playlists.map(({ files, campaignName }) => {
      const campaignPlaylistsFiles: CampaignPlayListFileType[] = files
      .map(file => ({
        file: file.file,
        file_id: file.file_id,
        id: file.id,
        playlist_id: file.playlist_id,
        sort: file.sort,
        volume: file.volume,
        isFreeProjectFile: false,
        campaignName,
      }));

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
 * The bus for aggregate project files list
 */
const loadProjectListAggregationBus$ = loadListDataProps$.pipe(
  switchMap(async ({ projectId }) => {
    try {
      const [{ count }] = await fileService().getProjectFilesByProjectIdAggregate(projectId!);
      
      return count;
    } catch (errorObject) {
      return { error: String(errorObject) } as RequestErrorResponse;
    }
  }),
  shareReplay(1),
);

/**
 * Loaded project files list aggregation
 */
export const loadedProjectListAggregation$: Observable<number> = loadProjectListAggregationBus$.pipe(
  filter(response => !(response as RequestErrorResponse)?.error && !!response),
  map(response => response as number),
);

/**
 * Bus for loading free project files
 */
const loadProjectFilesBus$ = combineLatest([
  loadListDataProps$,
  
  rowsPerPage$,

  tablePage$,

  sortStream$,

  removeClipsBus$.pipe(
    filter(result => !!result),
    startWith(undefined),
  ),
]).pipe(
  debounceTime(10),
  map(([{ projectId }, rowsPerPage, tablePage, sort]) => ({ projectId, rowsPerPage, tablePage, sort })),
  switchMap(async ({ projectId, rowsPerPage, tablePage, sort }) => {
    const offset: number = tablePage * rowsPerPage;

    try {
      return await fileService().getProjectFilesByProjectId(
        projectId!,
        rowsPerPage,
        offset,
        [{
          direction: sort.direction,
          priority: 1,
          by: sort.column,
        }]
      );
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
export const clips$ = combineLatest([
  loadedProjectFiles$,
  campaignsClips$,
]).pipe(
  map(([projectFiles, campaignsClips]) => {
    //  Filter campaign files from project files to protect removing them from server
    const filteredProjectFiles = projectFiles
    .map(file => {
      const campaignName = campaignsClips
        .filter(clip => file.file.file_name === clip.file.file_name)
        .map(file => file.campaignName)
        .join(", ");

      return {
        ...file,
        isFreeProjectFile: campaignsClips.every(cFile => file.file.file_name !== cFile.file.file_name),
        campaignName,
      };
    });

    return [...filteredProjectFiles] as CampaignPlayListFileType[];
  }),
  filter(clips => !!clips),
  startWith([]),
  pairwise(),
  filter(([prev, curr]) => !!xor(prev.map(item => Number(item.file_id)), curr.map(item => Number(item.file_id))).length),
  map(values => values[1]),
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
    loadProjectFilesBus$.pipe(map(() => ({ sortRows: false }))),
  ).pipe(startWith({ sortRows: false })),

  //  Обработка пагинации таблицы
  merge(
    rowsPerPage$.pipe(map(() => ({ paginateRows: true }))),
    loadProjectFilesBus$.pipe(map(() => ({ paginateRows: false }))),
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