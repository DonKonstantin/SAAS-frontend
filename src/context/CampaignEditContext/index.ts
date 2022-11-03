import { CampaignEditContextActionsTypes, CampaignEditContextTypes } from './interface';
import { BehaviorSubject, combineLatest, filter, map, Observable, switchMap, tap } from "rxjs";
import { Campaign, CampaignPlaylistConnectInput } from 'services/campaignListService/types';
import { campaignListService } from "../../services/campaignListService";

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

    return { ...getCampaign, playlists: getCampaign.playlists.filter(playlist => playlist.id !== playlistId) }

  }),
  //@ts-ignore
  tap((campaign) => campaign$.next(campaign)),
  tap(() => deletePlaylistId$.next(undefined))
)

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

export const campaignEditActions: CampaignEditContextActionsTypes = {
  loadCampaign,
  storeCampaignPlaylist,
  deleteCampaignPlaylist,
  setCampaign,
};
