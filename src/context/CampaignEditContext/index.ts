import { CampaignEditContextActionsTypes, CampaignEditContextTypes } from './interface';
import { BehaviorSubject, combineLatest, filter, interval, map, Observable, switchMap, tap } from "rxjs";
import { Campaign, CampaignPlaylistConnectInput } from 'services/campaignListService/types';
import { campaignListService } from "../../services/campaignListService";
import { fileService } from "../../services/FileService";

class DefaultContextData implements CampaignEditContextTypes {
  campaign: Campaign | undefined = undefined;
  isLoading: boolean = false
  campaignListErrorText: string | undefined = undefined
};

export const campaignEditContext$ = new BehaviorSubject<CampaignEditContextTypes>(new DefaultContextData());

const campaign$ = new BehaviorSubject<Campaign | undefined>(undefined);
// Сущность для получения компании по даннму ID
const campaignId$ = new BehaviorSubject<string | undefined>('');
// Стрим для хранения ошибок
const campaignListErrorText$ = new BehaviorSubject<string | undefined>(undefined);
//  Флаг для процесса загрузки
const isLoading$ = new BehaviorSubject<boolean>(false);
// Сущность нового плейлиста
const newPlayList$ = new BehaviorSubject<CampaignPlaylistConnectInput | undefined>(undefined)
// ID для удаления плейлиста
const deletePlaylistId$ = new BehaviorSubject<string | undefined>(undefined)
// ID и состояние "перемешать" для плейлиста
const shufflePlaylist$ = new BehaviorSubject<{ playlistId: string, shuffle: boolean } | undefined>(undefined)
// Делает сортировку плейлиста
const movePlaylist$ = new BehaviorSubject<{ playlistId: string, direction: 'up' | 'down' } | undefined>(undefined);
// Для загруженных треков по Drop Zone
const uploadedTracksToPlaylist$ = new BehaviorSubject<string[]>([]);

const loadCampaign$ = campaignId$.pipe(
  filter((companyId) => !!companyId),
  tap(() => isLoading$.next(true)),
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
  tap((response) => campaign$.next(response)),
  tap(() => isLoading$.next(false)),
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

    const findPlaylist = getCampaign.playlists.find(playlist => playlist.id === newPlaylist.id)
    if (findPlaylist) {

      return getCampaign.playlists.map(playlist => playlist.id === newPlaylist.id ? newPlaylist : playlist)
    }

    return { ...getCampaign, playlists: [...getCampaign.playlists, newPlaylist] }

  }),
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
const checkUploadedFilesBus$ = combineLatest([interval(1000), uploadedTracksToPlaylist$]).pipe(
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
  tap((data) => console.log(data))
);

const collectBus$: Observable<Pick<CampaignEditContextTypes,
  'campaign'
  | 'isLoading'
  | 'campaignListErrorText'>> = combineLatest([
  campaign$,
  isLoading$,
  campaignListErrorText$
]).pipe(
  map(
    ([
       campaign,
       isLoading,
       campaignListErrorText
     ]) => ({
      campaign,
      isLoading,
      campaignListErrorText
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
  subscriber.add(movePlaylistBus$.subscribe());
  subscriber.add(checkUploadedFilesBus$.subscribe());

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

export const campaignEditActions: CampaignEditContextActionsTypes = {
  loadCampaign,
  storeCampaignPlaylist,
  deleteCampaignPlaylist,
  shuffleCampaignPlaylist,
  movePlaylistCampaign,
  addFilesToUploadPlaylist,
  setCampaign,
};
