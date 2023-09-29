import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  filter,
  map,
  merge,
  shareReplay,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs";
import { CampaignClipsListPageContextActionsType } from "./interface";
import { campaignListService } from "services/campaignListService";
import { ClipListItemType, DownloadClipPropsType, RequestErrorResponse } from "./types";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";
import { Campaign, CampaignPlayList, CampaignPlayListFileType, CampaignPlaylistConnect, Project_PlayList } from "services/campaignListService/types";
import { SortType } from "components/EditPageCustomFields/CampaignGroup/Channels/types";
import { groupBy, isNull } from "lodash";
import projectPlaylistService from "services/projectPlaylistService";
import campaignPlaylistService from "services/campaignPlaylistService";
import { notificationsDispatcher } from "services/notifications";
import i18n from "i18n";
import { getCurrentState } from "context/AuthorizationContext";
import mediaFileClient from "services/MediaFileClient";

const productId$ = new Subject<string>();
const reloadListData$ = new Subject<void>();
export const sortStream$ = new BehaviorSubject<SortType>({
  column: 'name',
  direction: 'asc',
});
export const tablePage$ = new BehaviorSubject<number>(0);
export const rowsPerPage$ = new BehaviorSubject<number>(10);

const removeClips$ = new Subject<ClipListItemType[]>();
const downloadClip$ = new Subject<DownloadClipPropsType>();

/**
 * Шина загрузки кампаний
 */
const loadingProjectCampaignsBus$ = combineLatest([
  productId$,
  reloadListData$.pipe(startWith(undefined)),
]).pipe(
  switchMap(async ([projectId]) => {
    try {
      return await campaignListService().getCampaignsByProjectId(projectId);
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
const clips$ = allCampaigns$.pipe(
  map(campaigns => campaigns.flatMap(campaign => campaign.playlists)),
  map(playlists => {
    const result: ClipListItemType[] = playlists.map(playlist => {
      const startPeriod = new Date(playlist.periodStart).getTime();
      const endPeriod = new Date(playlist.periodStop).getTime();
      const now: number = new Date().getTime();
  
      const isActive: boolean = startPeriod - now < 0 && now - endPeriod < 0;

      const projectPlaylistsFiles: ProjectPlayListFile[] = playlist.projectPlaylist?.files || [];
      const campaignPlaylistsFiles: CampaignPlayListFileType[] = playlist.campaignPlaylist?.files || [];

      const preparedProjectPlaylistsFiles: ClipListItemType[] = projectPlaylistsFiles.map(file => ({
        isActive,
        campaignId: playlist.campaignId,
        playlistId: playlist.projectPlaylist?.id || "",
        isProject: true,
        file,
        isLast: projectPlaylistsFiles.length === 1,
      }));
      const preparedCampignsPlaylistsFiles: ClipListItemType[] = campaignPlaylistsFiles.map(file => ({
        isActive,
        campaignId: playlist.campaignId,
        playlistId: playlist.campaignPlaylist?.id || "",
        isProject: false,
        file,
        isLast: campaignPlaylistsFiles.length === 1,
      }));

      return [...preparedProjectPlaylistsFiles, ...preparedCampignsPlaylistsFiles] as ClipListItemType[];
    }).flat(1);

    return result;
  }),
  shareReplay(1),
);

/**
 * Сортировка строк таблицы
 */
export const sortedClips$ = combineLatest([
  clips$,
  sortStream$,
]).pipe(
  map(([clips, sortParams]) => ({ clips, sortParams })),
  map(({ clips, sortParams }) => clips.sort((a, b) => {
    const aValue = sortParams.column === 'name'
      ? a.file.file.origin_name
      : new Date(a.file.file.creation_date || a.file.file.last_change_date).getTime();
    const bValue = sortParams.column === 'name'
      ? b.file.file.origin_name
      : new Date(b.file.file.creation_date || b.file.file.last_change_date).getTime();

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
export const tableRows$: Observable<ClipListItemType[]> = combineLatest([
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
  tap(data => console.log(data, "Data")),
  map(({ clips, pagination, rowsPerPage }) => clips.slice(pagination, pagination + rowsPerPage)),
  shareReplay(1),
);

/**
 * Шина удаления роликов
 */
const removeClipsBus$ = removeClips$.pipe(
  withLatestFrom(allCampaigns$),
  map(([removeingClips, campaigns]) => {
    const { project } = getCurrentState();

    return {
      removeingClips,
      campaigns,
      projectId: Number(project),
    };
  }),
  map(({ removeingClips, campaigns, projectId }) => {
    const groupedClips = groupBy(removeingClips, clip => clip.playlistId);

    const result = Object.entries(groupedClips).map(([playlistId, clips]) => {
      const campaign: Campaign | undefined = campaigns.find(camp => camp.id === clips[0].campaignId);

      if (!campaign) {
        return null;
      }
      
      const campaignPlaylist: CampaignPlaylistConnect | undefined =
        campaign.playlists
          .find(playlist => playlist[clips[0].isProject ? "projectPlaylist" : "campaignPlaylist"]?.id === playlistId);
    
      if (!campaignPlaylist) {
        return null;
      }

      const currentPlaylist: Project_PlayList | CampaignPlayList | undefined =
        campaignPlaylist[clips[0].isProject ? "projectPlaylist" : "campaignPlaylist"];

      if (!currentPlaylist) {
        return null;
      }

      const playlistFiles: (ProjectPlayListFile | CampaignPlayListFileType)[] =
        (currentPlaylist.files as any[]).filter(file => clips.every(clip => clip.file.file_id !== file.file_id));

      const playlist = { 
        files:
          playlistFiles.map((file) => ({
            id: Number(file.id),
            fileId: Number(file.file_id),
            volume: file.volume,
            sort: file.sort,
          })),
        projectId,
        name: currentPlaylist.name,
        isOverallVolume: currentPlaylist.is_overall_volume,
        overallVolume: currentPlaylist.overall_volume,
        campaignId: Number(clips[0].campaignId),
        id: Number(playlistId),
      };

      if (!!clips[0].isProject) {
        //@ts-ignore
        delete playlist["campaignId"]
      }

      return {
        playlist,
        clipNames: clips.map(clip => clip.file.file.origin_name),
        isProject: clips[0].isProject,
      };
    });

    return result;
  }),
  map(items => items.filter(item => !isNull(item))),
  switchMap(async (items) => {
    let successI: number = 0;
    const rejectedArray: string[] = [];

    for (const playlist of items) {
      const removeMethod = playlist?.isProject 
        ? projectPlaylistService
        : campaignPlaylistService;

      try {
        await removeMethod()[playlist?.isProject ? "storePlaylistChanges" : "storeCampaignPlaylist"](playlist!.playlist);

        successI += playlist!.clipNames.length;
      } catch (error) {
        rejectedArray.push(...playlist!.clipNames);
      }
    }

    return {
      successI,
      rejectedArray,
    };
  }),
  tap(({ rejectedArray }) => {
    if (!rejectedArray.length) {
      return
    }

    for (let clipName of rejectedArray) {
      notificationsDispatcher().dispatch({
        message: i18n.t("campaign-clips-list.error.remove-clips", { name: clipName } ),
        type: "error",
      });
    }
  }),
  tap(({ successI }) => {
    if (!successI) {
      return
    }

    notificationsDispatcher().dispatch({
      message: successI === 1
        ? i18n.t("campaign-clips-list.success.remove-clip")
        : i18n.t("campaign-clips-list.success.remove-clips", { amount: successI }),
      type: "success",
    });

    reloadListData();
  }),
);

/**
 * Шина загрузки ролика
 */
const downloadClipBus$ = downloadClip$.pipe(
  switchMap(async ({ fileName, isProject, title }) => {
    try {
      const response = await mediaFileClient().Load(
        fileName,
        isProject,
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
    productId$.pipe(map(() => ({ loadingProjectCampaigns: true }))),
    loadingProjectCampaignsBus$.pipe(map(() => ({ loadingProjectCampaigns: false }))),
  ).pipe(startWith({ loadingProjectCampaigns: false })),

  //  Подготовка строк таблицы
  merge(
    loadingProjectCampaignsBus$.pipe(map(() => ({ prepareRows: true }))),
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
    clips$.pipe(map(() => ({ sortRows: true }))),
    sortStream$.pipe(map(() => ({ sortRows: true }))),
    sortedClips$.pipe(map(() => ({ sortRows: false }))),
  ).pipe(startWith({ sortRows: false })),

  //  Обработка пагинации таблицы
  merge(
    sortedClips$.pipe(map(() => ({ paginateRows: true }))),
    sortStream$.pipe(map(() => ({ paginateRows: true }))),
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
  productId$.next(projctId);
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
const downloadClip: CampaignClipsListPageContextActionsType['downloadClip'] = (fileName, title, isProject) => {
  downloadClip$.next({ fileName, isProject, title });
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