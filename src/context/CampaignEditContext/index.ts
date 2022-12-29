import {CampaignEditContextActionsTypes, CampaignEditContextTypes} from './interface';
import {auditTime, BehaviorSubject, combineLatest, delay, filter, interval, map, Observable, Subject, switchMap, tap} from "rxjs";
import {
  Campaign,
  CampaignChannelInputObject,
  CampaignDaysType,
  CampaignPlayList,
  CampaignPlaylistConnect
} from 'services/campaignListService/types';
import {campaignListService} from "../../services/campaignListService";
import {fileService} from "../../services/FileService";
import campaignPlaylistService from "../../services/campaignPlaylistService";
import { ProjectChannel } from 'services/playerCodeService/interfaces';
import { getCurrentState } from 'context/AuthorizationContext';
import { projectChannelsService } from 'services/projectChannelsService';

class DefaultContextData implements CampaignEditContextTypes {
  campaign: Campaign | undefined = undefined;
  isLoading: boolean = false
  campaignListErrorText: string | undefined = undefined
  isInitialized: boolean = false
  successCreatedPlaylist: boolean = false
  loadedChannels: ProjectChannel[] = [];
  isChannelsLoading: boolean = false;
  error: string | undefined = undefined;
  selectedChannels: CampaignChannelInputObject[] | undefined = undefined;
};

export const campaignEditContext$ = new BehaviorSubject<CampaignEditContextTypes>(new DefaultContextData());

const campaign$ = new BehaviorSubject<Campaign | undefined>(undefined);
// Сущность для получения компании по даннму ID
const campaignId$ = new BehaviorSubject<string | undefined>('');
// Стрим для хранения ошибок
const campaignListErrorText$ = new BehaviorSubject<string | undefined>(undefined);
// Сущность нового плейлиста
const newPlayList$ = new BehaviorSubject<CampaignPlaylistConnect | undefined>(undefined)
// ID для удаления плейлиста
const deletePlaylistId$ = new BehaviorSubject<string | undefined>(undefined)
// ID и состояние "перемешать" для плейлиста
const shufflePlaylist$ = new BehaviorSubject<{playlistId: string, shuffle: boolean} | undefined>(undefined)
// Счетчик для плейлиста
const playCounterPlaylist$ = new BehaviorSubject<{playlistId: string, playCounter: number} | undefined>(undefined)
// Делает сортировку плейлиста
const movePlaylist$ = new BehaviorSubject<{playlistId: string, direction: 'up' | 'down'} | undefined>(undefined);
// Для загруженных треков по Drop Zone
const uploadedTracksToPlaylist$ = new BehaviorSubject<string[]>([]);
// Первоначальная загрузка компании
const isInitialized$ = new BehaviorSubject<boolean>(false)
//  Флаг для процесса загрузки
const isLoading$ = new BehaviorSubject<boolean>(false);
//  Флаг для автосохранения плейлиста при добавлении музыки
const successCreatedPlaylist$ = new BehaviorSubject<boolean>(false);
//  Загруженные доступные для кампании каналы
const loadedChannels$ = new BehaviorSubject<ProjectChannel[]>([]);
//  Инициатор загрузки доступных каналов
const loadChannels$ = new Subject<void>();
//  Флаг загрузки каналов
const isChannelsLoading$ = new BehaviorSubject<boolean>(false);
//  Текст ошибки
const error$ = new BehaviorSubject<string | undefined>(undefined);
//  Стрим для выбраных каналов
const selectedChannels$ = new BehaviorSubject<CampaignChannelInputObject[]>([]);

const loadCampaign$ = campaignId$.pipe(
  filter((companyId) => !!companyId),
  tap(() => isInitialized$.next(true)),
  tap(() => campaignListErrorText$.next(undefined)),
  switchMap(async (campaignId) => {
    if (!campaignId) {

      return;
    }

    try {
      return await campaignListService().getCampaignById(campaignId)
    } catch (error) {
      campaignListErrorText$.next(error);

      return undefined;
    }
  }),
  filter((result) => !!result),
  map((response) => {
    if (!response) {
      return
    }

    const refactorPlaylists = response.playlists.map(playlist => {

      let playlistForTable;

      if (playlist.campaignPlaylistId) {
        playlistForTable = {
          name: playlist.campaignPlaylist?.name,
          campaignPlaylist: playlist.campaignPlaylist,
          campaignPlaylistId: playlist.campaignPlaylistId,
          duration: playlist.campaignPlaylist?.duration,
          files: playlist.campaignPlaylist?.files
        }
      } else if (playlist.projectPlaylistId) {
        playlistForTable = {
          name: playlist.projectPlaylist?.name,
          projectPlaylist: playlist.projectPlaylist,
          projectPlaylistId: playlist.projectPlaylistId,
          duration: playlist.projectPlaylist?.duration,
          files: playlist.projectPlaylist?.files
        }
      } else {
        return false
      }

      const refactorPlaylistDay = playlist.days.map(day => {
        //@ts-ignore
        delete day['campaignPlaylistConnectId']
        return day
      })

      return ({
        ...playlist,
        ...playlistForTable,
        days: refactorPlaylistDay
      })
    })

    const refactorChannels = response.channels.map(channel => ({
      channel_id: channel?.channel_id,
      id: channel.id,
      is_active: channel.channel.is_active,
      name: channel.channel.name,
      players: channel.channel.players
    }))

    return ({
      ...response,
      playlists: refactorPlaylists.filter(playlist => !!playlist),
      channels: refactorChannels.filter(channel => !!channel)
    })

  }),
  //@ts-ignore
  tap((campaign) => campaign$.next(campaign)),
  tap(() => isInitialized$.next(false)),
  tap(() => campaignId$.next(undefined))
)

const setNewPlaylistForCampaign$ = newPlayList$.pipe(
  filter((newPlayList) => !!newPlayList),
  map((newPlaylist) => {
    if (!newPlaylist) {
      return
    }

    const getCampaign = campaign$.getValue()
    if (!getCampaign) {
      return
    }

    const campaignPlaylistType = newPlaylist.campaignPlaylist ? "campaignPlaylistId" : "projectPlaylistId"

    let newMappedPlaylists;
    const findCurrentPlaylist = getCampaign.playlists.find(campaignPlaylist => Number(campaignPlaylist[campaignPlaylistType]) === Number(newPlaylist[campaignPlaylistType]))

    if (findCurrentPlaylist) {
      newMappedPlaylists = getCampaign.playlists.map(campaignPlaylist => Number(campaignPlaylist[campaignPlaylistType]) === Number(newPlaylist[campaignPlaylistType]) ? { ...campaignPlaylist, ...newPlaylist } : campaignPlaylist)
    } else {
      newMappedPlaylists = [...getCampaign.playlists, newPlaylist]
    }

    return { ...getCampaign, playlists: newMappedPlaylists }
  }),
  filter((result) => !!result),
  //@ts-ignore
  tap((campaign) => campaign$.next(campaign)),
  tap(() => newPlayList$.next(undefined))
)

const deletePlaylistFromProject$ = deletePlaylistId$.pipe(
  filter((playlistId) => !!playlistId),
  map((playlistId) => {
    if (!playlistId) {
      return
    }

    const getCampaign = campaign$.getValue()
    if (!getCampaign) {
      return
    }

    const filteredPlaylists = getCampaign.playlists.filter(playlist => playlist.id !== playlistId)
    const newSortablePlaylist = filteredPlaylists.map((playlist, index) => ({ ...playlist, sortOrder: index + 1 }))
    return { ...getCampaign, playlists: newSortablePlaylist }

  }),
  //@ts-ignore
  tap((campaign) => campaign$.next(campaign)),
  tap(() => deletePlaylistId$.next(undefined))
)

const shuffleCampaignPlaylist$ = shufflePlaylist$.pipe(
  filter((shufflePlaylist) => !!shufflePlaylist),
  map((shufflePlaylist) => {
    if (!shufflePlaylist) {
      return
    }

    const getCampaign = campaign$.getValue()
    if (!getCampaign) {
      return
    }

    const shufflePlaylistById = getCampaign.playlists.map(playlist => playlist.id === shufflePlaylist.playlistId
      ? {
        ...playlist,
        shuffle: shufflePlaylist.shuffle
      } : playlist)

    return { ...getCampaign, playlists: shufflePlaylistById }

  }),
  //@ts-ignore
  tap((campaign) => campaign$.next(campaign)),
  tap(() => shufflePlaylist$.next(undefined))
)

const playCounterCampaignPlaylist$ = playCounterPlaylist$.pipe(
  filter((playCounterPlaylist) => !!playCounterPlaylist),
  map((playCounterPlaylist) => {
    if (!playCounterPlaylist) {
      return
    }

    const getCampaign = campaign$.getValue()
    if (!getCampaign) {
      return
    }

    const playCounterPlaylistById = getCampaign.playlists.map(playlist => playlist.id === playCounterPlaylist.playlistId
      ? {
        ...playlist,
        playCounter: playCounterPlaylist.playCounter
      } : playlist)

    return { ...getCampaign, playlists: playCounterPlaylistById }

  }),
  //@ts-ignore
  tap((campaign) => campaign$.next(campaign)),
  tap(() => playCounterPlaylist$.next(undefined))
)

//  шина изменения позиции воспроизведения трека в плейлисте
const movePlaylistBus$ = movePlaylist$.pipe(
  filter((sortPlaylists) => !!sortPlaylists),
  map((sortPlaylists) => {
    if (!sortPlaylists) {
      return
    }

    const { playlistId, direction } = sortPlaylists

    const getCampaign = campaign$.getValue()
    if (!getCampaign) {

      return;
    }

    const findIndexOfCurrentPlaylist = getCampaign.playlists.findIndex(playlist => playlist.id === playlistId)

    if (findIndexOfCurrentPlaylist === -1) {

      return getCampaign;
    }

    if (direction === 'up' && findIndexOfCurrentPlaylist === 0) {

      return getCampaign;
    }

    if (direction === 'down' && findIndexOfCurrentPlaylist === getCampaign.playlists.length - 1) {

      return getCampaign;
    }

    const findCurrentPlaylist = getCampaign.playlists[findIndexOfCurrentPlaylist]
    const findChangeableIndexPlaylist = direction === 'up' ? findIndexOfCurrentPlaylist - 1 : findIndexOfCurrentPlaylist + 1
    const findChangeablePlaylist = getCampaign.playlists[findChangeableIndexPlaylist]

    getCampaign.playlists[findIndexOfCurrentPlaylist] = {
      ...findChangeablePlaylist,
      sortOrder: findCurrentPlaylist.sortOrder
    }

    getCampaign.playlists[findChangeableIndexPlaylist] = {
      ...findCurrentPlaylist,
      sortOrder: findChangeablePlaylist.sortOrder
    }

    return { ...getCampaign }
  }),
  tap((campaign) => campaign$.next(campaign)),
  tap(() => movePlaylist$.next(undefined))
);

//  шина проверки доступности в графе выгруженных плейлистов
const checkUploadedFilesBus$ = combineLatest([interval(6000), uploadedTracksToPlaylist$]).pipe(
  filter(incomingData => !!incomingData[1]?.length),
  map(incomingData => incomingData[1]),
  tap(() => successCreatedPlaylist$.next(false)),
  switchMap(async uploadedTracks => {
    if (!uploadedTracks) {
      return
    }

    try {
      return await fileService().getProjectFilesListByFileIds(uploadedTracks)
    } catch (error) {
      return undefined
    }
  }),
  filter((files) => !!files?.length),
  map((fileResponse) => {
    if (!fileResponse) {
      return
    }

    const campaign = campaign$.getValue()
    if (!campaign) {
      return
    }

    return {
      campaignId: Number(campaign.id),
      name: "Новый плейлист",
      isOverallVolume: true,
      overallVolume: 100,
      files: fileResponse.map((file, index) => (
        {
          volume: 100,
          fileId: file.id!,
          sort: index + 1
        }
      )),
      projectId: Number(campaign.project_id)
    }
  }),
  tap(() => isLoading$.next(true)),
  auditTime(6000),
  switchMap(async data => {
    if (!data) {
      return
    }

    let response;

    while (!response) {
      try {
        response = await campaignPlaylistService().storeCampaignPlaylist(data)
      } catch (error) {
        return
      }
    }

    return response as CampaignPlayList
  })
);

/**
 * Шина загрузки каналов для вкладки каналов кампании
 */
const loadChannelsBus$ = loadChannels$.pipe(
  map(() => {
    const { project } = getCurrentState();

    return project;
  }),
  filter(projectId => !!projectId),
  tap(() => error$.next(undefined)),
  tap(() => isChannelsLoading$.next(true)),
  switchMap(async projectId => {
    try {
      return projectChannelsService().getChannels(projectId);
    } catch (_) {
      error$.next('pages.campaigns.edit.errors.load-channels');

      return [];
    }
  }),
  tap(() => isChannelsLoading$.next(false)),
);

/**
 * Шина сброса ошибки
 */
const clearErrorBus$ = error$.pipe(
  filter(error => !!error),
  delay(10000),
);

const collectBus$: Observable<Pick<CampaignEditContextTypes,
  'campaign'
  | 'isLoading'
  | 'campaignListErrorText'
  | 'loadedChannels'
  | 'isChannelsLoading'
  | 'error'
  | 'selectedChannels'
>> = combineLatest([
  campaign$,
  isLoading$,
  campaignListErrorText$,
  isInitialized$,
  successCreatedPlaylist$,
  loadedChannels$,
  isChannelsLoading$,
  error$,
  selectedChannels$,
]).pipe(
  map(
    ([
       campaign,
       isLoading,
       campaignListErrorText,
       isInitialized,
       successCreatedPlaylist,
       loadedChannels,
       isChannelsLoading,
       error,
       selectedChannels,
     ]) => ({
      campaign,
      isLoading,
      campaignListErrorText,
      isInitialized,
      successCreatedPlaylist,
      loadedChannels,
      isChannelsLoading,
      error,
      selectedChannels,
    })
  )
);

export const InitCampaignEditContext = () => {
  const subscriber = campaignEditContext$.subscribe();

  subscriber.add(
    collectBus$.subscribe({
      next: (value) => {
        campaignEditContext$.next({
          ...campaignEditContext$.getValue(),
          ...value,
        });
      },
    })
  );

  subscriber.add(loadCampaign$.subscribe());
  subscriber.add(setNewPlaylistForCampaign$.subscribe());
  subscriber.add(deletePlaylistFromProject$.subscribe());
  subscriber.add(shuffleCampaignPlaylist$.subscribe());
  subscriber.add(playCounterCampaignPlaylist$.subscribe());
  subscriber.add(movePlaylistBus$.subscribe());
  subscriber.add(checkUploadedFilesBus$.subscribe(async (newCampaignPlaylist) => {

    if (!newCampaignPlaylist) {
      return
    }

    const getCampaign = campaign$.getValue()
    if (!getCampaign) {
      return
    }

    const newPlaylist = {
      id: newCampaignPlaylist.id,
      playCounter: 1,
      periodStop: new Date(),
      shuffle: false,
      periodStart: new Date(),
      daysType: 'daily' as CampaignDaysType,
      days: [],
      isCampaignTimetable: false,
      allDaysStartMinutes: 0,
      allDaysStopMinutes: 0,
      sortOrder: getCampaign.playlists.length + 1,
      name: newCampaignPlaylist.name,
      duration: newCampaignPlaylist.duration,
      files: newCampaignPlaylist.files,
      campaignPlaylistId: newCampaignPlaylist.id,
      campaignPlaylist: newCampaignPlaylist
    }

    //@ts-ignore
    campaign$.next({ ...getCampaign, playlists: [...getCampaign.playlists, newPlaylist] })

    const playlistFiles = newCampaignPlaylist?.files.map(file => Number(file.id))
    const filesValues = uploadedTracksToPlaylist$.getValue()
    uploadedTracksToPlaylist$.next(filesValues.filter(file => playlistFiles.some(playlistFile => Number(playlistFile) === Number(file))))
    isLoading$.next(false)
    successCreatedPlaylist$.next(true)
  }));

  subscriber.add(loadChannelsBus$.subscribe(channels => {
    loadedChannels$.next(channels);
  }));

  subscriber.add(clearErrorBus$.subscribe(() => error$.next(undefined)));

  return () => subscriber.unsubscribe();
};

/**
 * Запрашивает компанию по ID
 * @param campaignId
 */
const loadCampaign: CampaignEditContextActionsTypes['loadCampaign'] = campaignId => {
  campaignId$.next(campaignId);
}

/**
 * Записывает сущьность кампании в контекст
 * @param campaign
 */
const setCampaign: CampaignEditContextActionsTypes['setCampaign'] = campaign => {
  campaign$.next(campaign);
  successCreatedPlaylist$.next(true);
}

/**
 * Записывает сущьность плейлиста в компанию
 * @param playlist
 */
const storeCampaignPlaylist: CampaignEditContextActionsTypes['storeCampaignPlaylist'] = playlist => {
  newPlayList$.next(playlist);
}
/**
 * Удаляет плейлист с проекта
 * @param playlistId
 */
const deleteCampaignPlaylist: CampaignEditContextActionsTypes['deleteCampaignPlaylist'] = playlistId => {
  deletePlaylistId$.next(playlistId);
}

/**
 * Изменяет параметр перемешать для плейлиста
 * @param playlistId
 * @param shuffle
 */
const shuffleCampaignPlaylist: CampaignEditContextActionsTypes['shuffleCampaignPlaylist'] = (playlistId, shuffle) => {
  shufflePlaylist$.next({ playlistId, shuffle });
}

/**
 * Изменяет счетчик для плейлиста
 * @param playlistId
 * @param playCounter
 */
const playCounterCampaignPlaylist: CampaignEditContextActionsTypes['playCounterCampaignPlaylist'] = (playlistId, playCounter) => {
  playCounterPlaylist$.next({ playlistId, playCounter });
}

/**
 * Изменяет сортировку плейлиста
 * @param playlistId
 * @param direction
 */
const movePlaylistCampaign: CampaignEditContextActionsTypes['movePlaylistCampaign'] = (playlistId, direction) => {
  movePlaylist$.next({
    playlistId,
    direction
  });
}

/**
 * Проверяем загруженный файл и создаем плейлист
 * @param fileIds
 */
const addFilesToUploadPlaylist: CampaignEditContextActionsTypes['addFilesToUploadPlaylist'] = fileIds => {
  uploadedTracksToPlaylist$.next([
    ...uploadedTracksToPlaylist$.getValue(),
    ...fileIds
  ]);
};

/**
 * Устанавливаем флаг успешной сохранении компании при автосохранении компании
 */
const newAddedCampaignPlaylist: CampaignEditContextActionsTypes['newAddedCampaignPlaylist'] = (newPlaylist) => {
  successCreatedPlaylist$.next(newPlaylist);
};

/**
 * Загружает доступные для кампании каналы
 */
 const loadChannels: CampaignEditContextActionsTypes['loadChannels'] = () => {
  loadChannels$.next();
};

/**
 * Очищает загруженные каналы
 */
 const cleareLoadedChannels: CampaignEditContextActionsTypes['cleareLoadedChannels'] = () => {
  loadedChannels$.next([]);
};

/**
 * Записываем выбранные каналы
 */
 const setChannels: CampaignEditContextActionsTypes['setChannels'] = (channels) => {
  selectedChannels$.next(channels);
};

export const campaignEditActions: CampaignEditContextActionsTypes = {
  loadCampaign,
  storeCampaignPlaylist,
  deleteCampaignPlaylist,
  shuffleCampaignPlaylist,
  playCounterCampaignPlaylist,
  movePlaylistCampaign,
  addFilesToUploadPlaylist,
  newAddedCampaignPlaylist,
  setCampaign,
  loadChannels,
  cleareLoadedChannels,
  setChannels,
};
