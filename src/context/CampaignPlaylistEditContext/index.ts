import { CampaignPlaylistEditContextActionsTypes, CampaignPlaylistEditContextTypes } from './interface';
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { CampaignPlaylistConnect } from 'services/campaignListService/types';

class DefaultContextData implements CampaignPlaylistEditContextTypes {
  playlist: CampaignPlaylistConnect | undefined = undefined;
  isTabsAvailable: boolean = false;
  isEdit: boolean = false;
};

export const campaignPlaylistEditContext$ = new BehaviorSubject<CampaignPlaylistEditContextTypes>(new DefaultContextData());

const playlist$ = new BehaviorSubject<CampaignPlaylistConnect | undefined>(undefined);
const isTabsAvailable$ = new BehaviorSubject<boolean>(false);
const isEdit$ = new BehaviorSubject<boolean>(false);

const collectBus$: Observable<
Pick<
  CampaignPlaylistEditContextTypes,
  'playlist'
  | 'isTabsAvailable'
  | 'isEdit'
>
> = combineLatest([
  playlist$,
  isTabsAvailable$,
  isEdit$,
]).pipe(
  map(
    ([
      playlist,
      isTabsAvailable,
      isEdit,
    ]) => ({
      playlist,
      isTabsAvailable,
      isEdit,
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

  return () => subscriber.unsubscribe();
};

/**
 * Записываем плэйлист в контекст
 * @param campaign 
 */
const setPlaylist: CampaignPlaylistEditContextActionsTypes['setPlaylist'] = campaign => {
  playlist$.next(campaign);
};

/**
 * Очистка контекста
 */
 const clearContext: CampaignPlaylistEditContextActionsTypes['clearContext'] = () => {
  playlist$.next(undefined);
};

/**
 * Записывает флаг доступности дополнительных табов табов
 * @param value 
 */
 const setIsTabsAvailable: CampaignPlaylistEditContextActionsTypes['setIsTabsAvailable'] = (value) => {
  isTabsAvailable$.next(value);
};

/**
 * Записывает чистый объект плэйлиста в контекст
 * @param projectId 
 */
 const setNewPlaylist: CampaignPlaylistEditContextActionsTypes['setNewPlaylist'] = (projectId) => {
  playlist$.next({
    allDaysStartMinutes: 0,
    allDaysStopMinutes: 0,
    campaignId: "",
    campaignPlaylist: {
      campaign_id: '',
      duration: 0,
      files: [],
      is_overall_volume: true,
      name: '',
      overall_volume: 100,
      project_id: projectId,
    },
    days: [],
    daysType: 'daily',
    isCampaignTimetable: false,
    periodStart: new Date(),
    periodStop: new Date(),
    playCounter: 0,
    projectPlaylist: {
      campaigns: [],
      duration: 0,
      files: [],
      is_overall_volume: true,
      name: '',
      overall_volume: 100,
      project_id: Number(projectId),
    },
    shuffle: false,
    sortOrder: 1,
  });
};

/**
 * Устанавливает флаг редактирования true
 */
 const setIsEdit: CampaignPlaylistEditContextActionsTypes['setIsEdit'] = () => {
  isEdit$.next(true);
};

export const campaignEditActions: CampaignPlaylistEditContextActionsTypes = {
  setPlaylist,
  clearContext,
  setNewPlaylist,
  setIsTabsAvailable,
  setIsEdit,
};
