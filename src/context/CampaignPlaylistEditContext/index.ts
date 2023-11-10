import { CampaignPlaylistEditContextActionsTypes, CampaignPlaylistEditContextTypes, Tabs } from './interface';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  Observable,
  pairwise,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
  timer,
  withLatestFrom,
} from "rxjs";
import { CampaignPlaylistConnect, CampaignPlayListFileType } from 'services/campaignListService/types';
import { fileService } from 'services/FileService';
import { getCurrentState } from 'context/AuthorizationContext';
import { daysName } from "../../components/EditPageCustomFields/CampaignGroup/CampaignInfoGroup";
import dayjs from 'dayjs';
import projectListService from 'services/projectListService';
import { ProjectMediaFile } from 'services/MediaLibraryService/interface';
import { isEqual, uniqBy } from 'lodash';

class DefaultContextData implements CampaignPlaylistEditContextTypes {
  playlist: CampaignPlaylistConnect | undefined = undefined;
  availableTabs: Tabs[] = [Tabs.tracks, Tabs.clips];
  isEdit: boolean = false;
  projectId: string = "";
  loadedClips: CampaignPlayListFileType[] = [];
  uploadedClips: string[] = [];
  isLoading: boolean = false;
};

export const campaignPlaylistEditContext$ = new BehaviorSubject<CampaignPlaylistEditContextTypes>(new DefaultContextData());

const playlist$ = new BehaviorSubject<CampaignPlaylistConnect | undefined>(undefined);
const availableTabs$ = new BehaviorSubject<Tabs[]>([Tabs.tracks, Tabs.clips]);
const isEdit$ = new BehaviorSubject<boolean>(false);
const moveTrack$ = new Subject<{fileId: string, direction: 'up' | 'down'}>();
const removeTrack$ = new Subject<string>();
const projectId$ = new Subject<string>();
const loadedClips$ = new BehaviorSubject<CampaignPlayListFileType[]>([]);
const removeLoadedFile$ = new Subject<string[]>();
const addLoadedToPlaylist$ = new Subject<string[]>();
const uploadedClips$ = new BehaviorSubject<string[]>([]);
const isLoading$ = new BehaviorSubject<boolean>(false);

//  Stream for fire removing not used in playlists project files by file IDs bus
const removeClips$ = new Subject<string[]>();

/**
 * Removing not used in playlists project files by file IDs bus
 */
const removeClipsBus$ = removeClips$.pipe(
  debounceTime(10),
  tap(() => isLoading$.next(true)),
  switchMap(async fileIds => {
    try {
      return await fileService().deleteProjectFilesByFileIds(fileIds);
    } catch {
      return 0;
    }
  }),
  shareReplay(1),
);

//  шина проверки доступности в графе выгруженных клипов
const checkUploadedFilesBus$ = combineLatest([
  uploadedClips$.pipe(
    //  не инициируем загрузку если нет новых файлов
    pairwise(),
    filter(([prev, curr]) => !isEqual(prev, curr)),
    map(values => values[1]),

    //  показывем лоадет только если подгрузился новый файл
    tap(() => isLoading$.next(true)),
    startWith([]),
  ),

  //  reloading clips after removing some clips from the server
  removeClipsBus$.pipe(
    //  reloading clips only if some clips was removed
    filter(result => !!result),
    startWith(0),
  ),

  //  проверяем файлы каждые 5 секунд
  timer(0, 5000),
]).pipe(
  debounceTime(10),
  withLatestFrom(projectId$, playlist$),
  //  если плэйлит не подгружен в контекст или у него нет собственного плэйлиста останавливаем стрим
  filter(params => !!params[2]?.campaignPlaylist),
  map((props) => ({
    projectId: props[1],
    playlist: props[2],
  })),
  switchMap(async ({ projectId, playlist }) => {
    try {
      let projectFiles: ProjectMediaFile[] = [];

      //  проверка свободных файлов проекта
      projectFiles = await fileService().getProjectFilesByProjectId(projectId);
      
      //  подгрузка всех файлов кампаний кроме текущей
      const campaigFiles = await projectListService().getCampaignsFiles(projectId, playlist!.id);

      //  Filter campaign files from project files to protect removing them from server
      const filteredProjectFiles = projectFiles
        .filter(file => campaigFiles.every(cFile => file.file_name !== cFile.file_name));        

      return [...filteredProjectFiles, ...campaigFiles];
    } catch (error) {
      throw error;
    }
  }),
  filter(files => !!files[0]?.origin_name?.length),
  shareReplay(1),
);

//  шина добавления загруженного клипа в плейлист
const addLoadedToPlaylistBus$ = addLoadedToPlaylist$.pipe(
  filter(ids => !!ids.length),
  map(ids => {
    const loadedClips = loadedClips$.getValue();

    removeLoadedFile$.next(ids);

    return loadedClips.filter(clip => ids.some(i => i === clip.file_id));
  }),
  map(loadedClips => {
    const playlist = playlist$.getValue();

    if (!playlist) {
      return undefined;
    }

    const existsFiles = playlist.campaignPlaylist?.files;

    if (!existsFiles) {
      return undefined;
    }

    return {
      ...playlist,
      campaignPlaylist: {
        ...playlist.campaignPlaylist,
        campaign_id: playlist.campaignPlaylist?.campaign_id || '',
        duration: playlist.campaignPlaylist?.duration || 0,
        is_overall_volume: playlist.campaignPlaylist?.is_overall_volume || true,
        overall_volume: playlist.campaignPlaylist?.overall_volume || 100,
        name: playlist.campaignPlaylist?.name || '',
        project_id: playlist.campaignPlaylist?.project_id || '',
        files: [...existsFiles, ...loadedClips],
        sort: playlist.campaignPlaylist?.sort || 0,
      }
    };
  }),
  filter(playlist => !!playlist),
  tap((playlist) => playlist$.next(playlist))
);

//  шина удаления загруженного клипа из списка доступных
const removeLoadedFileBus$ = removeLoadedFile$.pipe(
  filter(ids => !!ids.length),
  map(ids => {
    const loadedClips = loadedClips$.getValue();

    return loadedClips.filter(clip => !ids.some(i => i === clip.file_id));
  }),
);

//  шина удаления трека в плейлисте
const removeTrackBus$ = removeTrack$.pipe(
  map(fileId => {
    const playlist = campaignPlaylistEditContext$.getValue().playlist!;

    const playlistType = !!playlist.campaignPlaylist ? "campaignPlaylist" : "projectPlaylist";

    const playlistData = playlist[playlistType];

    const files = playlistData?.files
      //@ts-ignore
      .filter(file => file.file_id !== fileId)
      .sort((a, b) => {
        const aValue = Number(a.sort);
        const bValue = Number(b.sort);

        return aValue - bValue;
      })
      .map((file, index) => ({ ...file, sort: index + 1 }));

    return {
      ...playlist,
      [playlistType]: {
        ...playlistData,
        files,
      }
    };
  }),
)

//  шина изменения позиции воспроизведения трека в плейлисте
const moveTrackBus$ = moveTrack$.pipe(
  map(({ fileId, direction }) => {
    const playlist = campaignPlaylistEditContext$.getValue().playlist!;

    const playlistType = !!playlist.campaignPlaylist ? "campaignPlaylist" : "projectPlaylist";

    const playlistData = playlist[playlistType];

    if (!playlistData) {
      return playlist
    }

    // @ts-ignore
    const sortingFile = playlistData.files.filter(file => file.file_id === fileId)[0];

    if (direction === 'up' && sortingFile.sort === 1) {
      return playlist;
    }

    if (direction === 'down' && sortingFile.sort === playlistData?.files.length) {
      return playlist;
    }

    const adjacentFileSort = direction === 'up' ? sortingFile.sort - 1 : sortingFile.sort + 1;

    //@ts-ignore
    const adjacentFile = playlistData!.files.filter(file => file.sort === adjacentFileSort)[0];

    const newAdjacentFileSort = direction === 'up' ? adjacentFile.sort + 1 : adjacentFile.sort - 1;

    const newSortingFileSort = direction === 'up' ? sortingFile.sort - 1 : sortingFile.sort + 1;

    //@ts-ignore
    const filteredFiles = playlistData?.files.filter(file => file.file_id !== sortingFile.file_id && file.file_id !== adjacentFile.file_id);

    const files = [
      //@ts-ignore
      ...filteredFiles,
      {
        ...adjacentFile,
        sort: newAdjacentFileSort,
      },
      {
        ...sortingFile,
        sort: newSortingFileSort,
      }
    ];

    return {
      ...playlist,
      [playlistType]: {
        ...playlistData,
        files,
      }
    }
  })
);

const collectBus$: Observable<Pick<CampaignPlaylistEditContextTypes,
  'playlist'
  | 'availableTabs'
  | 'isEdit'
  | 'projectId'
  | 'loadedClips'
  | 'uploadedClips'
  | 'isLoading'
>> = combineLatest([
  playlist$,
  availableTabs$,
  isEdit$,
  projectId$,
  loadedClips$,
  uploadedClips$,
  isLoading$,
]).pipe(
  map(
    ([
       playlist,
       availableTabs,
       isEdit,
       projectId,
       loadedClips,
       uploadedClips,
       isLoading,
     ]) => ({
      playlist,
      availableTabs,
      isEdit,
      projectId,
      loadedClips,
      uploadedClips,
      isLoading,
    })
  )
);

export const InitCampaignEditContext = () => {
  const subscriber = campaignPlaylistEditContext$.subscribe();

  subscriber.add(
    collectBus$.subscribe({
      next: (value) => {
        campaignPlaylistEditContext$.next({
          ...campaignPlaylistEditContext$.getValue(),
          ...value,
        });
      },
    })
  );

  subscriber.add(moveTrackBus$.subscribe(playlist$));

  subscriber.add(
    removeTrackBus$.subscribe(playlist$)
  );

  subscriber.add(
    removeLoadedFileBus$.subscribe(loadedClips$)
  );

  subscriber.add(
    addLoadedToPlaylistBus$.subscribe()
  );

  subscriber.add(checkUploadedFilesBus$.subscribe(
    clips => {
      const ids = new Set(clips.map(clip => String(clip.id)));

      const { project } = getCurrentState();

      const playlist = playlist$.getValue();

      const campaignPlaylist = playlist?.campaignPlaylist;

      const playlistFiles = !campaignPlaylist ? [0] : campaignPlaylist.files.map(file => file.sort);

      const lastSortNumber = Math.max(...playlistFiles);

      const checkLastNumberForFinite = isFinite(lastSortNumber);

      const finalLastSortNumber = checkLastNumberForFinite ? lastSortNumber : 0;

      const preparedClips: CampaignPlayListFileType[] = clips.map((clip, index) => ({
        file: {
          ...clip,
          last_change_date: new Date(clip.last_change_date),
          player_file_id: "",
          id: String(clip.id),
          project_id: project,
          creation_date: dayjs().format("DD-MM-YYYY"),
        },
        file_id: String(clip.id),
        id: "",
        playlist_id: "",
        sort: finalLastSortNumber + index + 1,
        volume: 100,
        isFreeProjectFile: !!clip.isFreeProjectFile,
      }));

      const preparedLoadedClips = uniqBy(preparedClips, "file_id");

      loadedClips$.next(preparedLoadedClips);

      const uploadedClips = uploadedClips$.getValue();

      uploadedClips$.next(uploadedClips.filter(clip => ids.has(clip)));

      isLoading$.next(false);
    }
  ));

  /**
   * Removing not used in playlists project files by file names bus
   */
  subscriber.add(removeClipsBus$.subscribe());

  return () => subscriber.unsubscribe();
};

/**
 * Записываем плэйлист в контекст
 * @param campaign
 */
const setPlaylist: CampaignPlaylistEditContextActionsTypes['setPlaylist'] = campaign => {
  const { project } = getCurrentState();

  projectId$.next(project);

  playlist$.next(campaign);
};

/**
 * Очистка контекста
 */
const clearContext: CampaignPlaylistEditContextActionsTypes['clearContext'] = () => {
  playlist$.next(undefined);

  availableTabs$.next([Tabs.tracks, Tabs.clips]);

  isEdit$.next(false);

  projectId$.next("");
};

/**
 * Записывает флаг доступности дополнительных табов табов
 * @param value
 */
const setAvailableTabs: CampaignPlaylistEditContextActionsTypes['setAvailableTabs'] = (value) => {
  availableTabs$.next(value);
};

/**
 * Записывает чистый объект плэйлиста в контекст
 * @param campaignId
 * @param sortOrder
 */
const setNewPlaylist: CampaignPlaylistEditContextActionsTypes['setNewPlaylist'] = (campaignId, sortOrder) => {
  const { project } = getCurrentState();

  projectId$.next(project);

  playlist$.next({
    allDaysStartMinutes: 0,
    allDaysStopMinutes: 0,
    campaignId: campaignId,
    campaignPlaylist: {
      campaign_id: campaignId,
      duration: 0,
      files: [],
      is_overall_volume: true,
      name: '',
      overall_volume: 100,
      project_id: project,
      sort: sortOrder,
    },
    //@ts-ignore
    days: Object.keys(daysName)
      .map((_, index) => ({
        dayNum: index + 1,
        isActive: true,
        daysStartMinutes: 0,
        daysStopMinutes: 1439,
      })),
    daysType: 'daily',
    isCampaignTimetable: true,
    periodStart: new Date(),
    periodStop: new Date(),
    playCounter: 1,
    shuffle: false,
    sortOrder: sortOrder,
  });
};

/**
 * Устанавливает флаг редактирования true
 */
const setIsEditable: CampaignPlaylistEditContextActionsTypes['setIsEditable'] = () => {
  isEdit$.next(true);
};

/**
 * Двигает трэк в зависимости от направления
 * @param fileId
 * @param direction
 */
const moveTrack: CampaignPlaylistEditContextActionsTypes['moveTrack'] = (fileId, direction) => {
  moveTrack$.next({
    fileId,
    direction
  });
};

/**
 * Удаляет трэк из списка
 * @param fileId
 */
const removeTrack: CampaignPlaylistEditContextActionsTypes['removeTrack'] = fileId => {
  removeTrack$.next(fileId);
};

/**
 * Удаляет трэк из списка
 * @param projectId
 */
const setProjectId: CampaignPlaylistEditContextActionsTypes['setProjectId'] = projectId => {
  projectId$.next(projectId);
};

/**
 * Удаляет загруженный ролик из списка доступных для добавления к плэйлисту
 * @param fileIds
 */
const removeLoadedFile: CampaignPlaylistEditContextActionsTypes['removeLoadedFile'] = fileIds => {
  removeLoadedFile$.next(fileIds);
};

/**
 * Добавляем загруженные файлы к плэйлисту
 * @param fileIds
 */
const addLoadedToPlaylist: CampaignPlaylistEditContextActionsTypes['addLoadedToPlaylist'] = fileIds => {
  addLoadedToPlaylist$.next(fileIds);
};

/**
 * Добавляем список загруженных файлов
 * @param fileIds
 */
const addFilesToUpload: CampaignPlaylistEditContextActionsTypes['addFilesToUpload'] = fileIds => {
  uploadedClips$.next([
    ...uploadedClips$.getValue(),
    ...fileIds
  ]);
};

/**
 * Добавляем загруженные файлы к плэйлисту
 * @param isLoading
 */
const setIsLoading: CampaignPlaylistEditContextActionsTypes['setIsLoading'] = isLoading => {
  isLoading$.next(isLoading);
};

/**
 * Remove not using in playlists project files by file names
 * @param fileNames
 */
const removeClips: CampaignPlaylistEditContextActionsTypes['removeClips'] = fileNames => {
  removeClips$.next(fileNames);
};

export const campaignEditActions: CampaignPlaylistEditContextActionsTypes = {
  setPlaylist,
  clearContext,
  setNewPlaylist,
  setAvailableTabs,
  setIsEditable,
  moveTrack,
  removeTrack,
  removeClips,
  setProjectId,
  removeLoadedFile,
  addLoadedToPlaylist,
  addFilesToUpload,
  setIsLoading,
};