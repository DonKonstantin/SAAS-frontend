import { CampaignPlaylistEditContextActionsTypes, CampaignPlaylistEditContextTypes, Tabs } from './interface';
import { BehaviorSubject, combineLatest, filter, interval, map, Observable, Subject, switchMap } from "rxjs";
import { CampaignPlaylistConnect, CampaignPlayListFileType } from 'services/campaignListService/types';
import { fileService } from 'services/FileService';
import { getCurrentState } from 'context/AuthorizationContext';

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
const projectId$ = new BehaviorSubject<string>("13");
const loadedClips$ = new BehaviorSubject<CampaignPlayListFileType[]>([]);
const removeLoadedFile$ = new Subject<string[]>();
const addLoadedToPlaylist$ = new Subject<string[]>();
const uploadedClips$ = new BehaviorSubject<string[]>([]);
const isLoading$ = new BehaviorSubject<boolean>(false);

//  шина проверки доступности в графе выгруженных клипов
const checkUploadedFilesBus$ = combineLatest([interval(5000), uploadedClips$]).pipe(
  filter(incomingData => !!incomingData[1].length),
  map(incomingData => incomingData[1]),
  switchMap(async uploadedClips => {
    try {
      return await fileService().getFilesListByFileIds(uploadedClips);
    } catch (error) {
      throw error;
    }
  }),
  filter(files => !!files.length),
);

//  шина добавления загруженного клипа в плейлист
const addLoadedToPlaylistBus$ = addLoadedToPlaylist$.pipe(
  filter(ids => !!ids.length),
  map(ids => {
    const loadedClips = loadedClips$.getValue();

    removeLoadedFile$.next(ids);

    const filteredLoadedClips = loadedClips.filter(clip => ids.some(i => i === clip.file_id));

    return filteredLoadedClips;
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
      .map((file, index) => ({...file, sort: index + 1}));

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

    //@ts-ignore
    const sortingFile = playlistData.files.find(file => file.file_id === fileId);

    if (direction === 'up' && sortingFile.sort === 1) {
      return playlist;
    }

    if (direction === 'down' && sortingFile.sort === playlistData?.files.length) {
      return playlist;
    }

    const adjacentFileSort = direction === 'up' ? sortingFile.sort - 1 : sortingFile.sort + 1;

    //@ts-ignore
    const adjacentFile = playlistData!.files.find(file => file.sort === adjacentFileSort);

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
    };
  }),
);

const collectBus$: Observable<
  Pick<
    CampaignPlaylistEditContextTypes,
    'playlist'
    | 'availableTabs'
    | 'isEdit'
    | 'projectId'
    | 'loadedClips'
    | 'uploadedClips'
    | 'isLoading'
    >
  > = combineLatest([
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

  subscriber.add(
    moveTrackBus$.subscribe(playlist$)
  );

  subscriber.add(
    removeTrackBus$.subscribe(playlist$)
  );

  subscriber.add(
    removeLoadedFileBus$.subscribe(loadedClips$)
  );

  subscriber.add(
    addLoadedToPlaylistBus$.subscribe(playlist$)
  );

  subscriber.add(checkUploadedFilesBus$.subscribe(
    clips => {
      const ids = clips.map(clip => clip.id);

      const { project } = getCurrentState();

      const playlist = playlist$.getValue();

      const lastSortNumber = Math.max(...playlist?.campaignPlaylist?.files.map(file => file.sort)!);

      const preparedClips: CampaignPlayListFileType[] = clips.map((clip, index) => ({
        file: {
          composer: clip.composer,
          file_name: clip.file_name,
          last_change_date: new Date(clip.last_change_date),
          duration: clip.duration,
          hash_sum: clip.hash_sum,
          mime_type: clip.mime_type,
          origin_name: clip.origin_name,
          player_file_id: "",
          title: clip.title,
          id: clip.id,
          project_id: project,
        },
        file_id: clip.id,
        id: "",
        playlist_id: "",
        sort: lastSortNumber + index + 1,
        volume: 100,
      }));

      const loadedClips = loadedClips$.getValue();

      loadedClips$.next([...loadedClips, ...preparedClips]);

      const uploadedClips = uploadedClips$.getValue();

      uploadedClips$.next(uploadedClips.filter(clip => !ids.some(id => id === clip)));
    }
  ));

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

  availableTabs$.next([Tabs.tracks]);

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
 * @param sortOrder
 */
const setNewPlaylist: CampaignPlaylistEditContextActionsTypes['setNewPlaylist'] = (sortOrder) => {
  const { project, domain } = getCurrentState();

  projectId$.next(project);

  playlist$.next({
    allDaysStartMinutes: 0,
    allDaysStopMinutes: 0,
    campaignId: domain,
    campaignPlaylist: {
      campaign_id: '',
      duration: 0,
      files: [],
      is_overall_volume: true,
      name: '',
      overall_volume: 100,
      project_id: project,
      sort: sortOrder,
    },
    days: [],
    daysType: 'daily',
    isCampaignTimetable: false,
    periodStart: new Date(),
    periodStop: new Date(),
    playCounter: 0,
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
 * Двигает трэк в вверх по очереди
 * @param fileId
 */
const moveTrackUp: CampaignPlaylistEditContextActionsTypes['moveTrackUp'] = fileId => {
  moveTrack$.next({
    fileId,
    direction: 'up',
  });
};

/**
 * Двигает трэк в вниз по очереди
 * @param fileId
 */
const moveTrackDown: CampaignPlaylistEditContextActionsTypes['moveTrackDown'] = fileId => {
  moveTrack$.next({
    fileId,
    direction: 'down',
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

export const campaignEditActions: CampaignPlaylistEditContextActionsTypes = {
  setPlaylist,
  clearContext,
  setNewPlaylist,
  setAvailableTabs,
  setIsEditable,
  moveTrackDown,
  moveTrackUp,
  removeTrack,
  setProjectId,
  removeLoadedFile,
  addLoadedToPlaylist,
  addFilesToUpload,
  setIsLoading,
};