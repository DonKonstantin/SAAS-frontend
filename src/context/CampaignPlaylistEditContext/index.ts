import { CampaignPlaylistEditContextActionsTypes, CampaignPlaylistEditContextTypes, Tabs } from './interface';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from "rxjs";
import { CampaignPlaylistConnect } from 'services/campaignListService/types';

class DefaultContextData implements CampaignPlaylistEditContextTypes {
  playlist: CampaignPlaylistConnect | undefined = {
    allDaysStartMinutes: 0,
    allDaysStopMinutes: 0,
    campaignId: "12",
    campaignPlaylist: {
      id: "35",
      campaign_id: '',
      duration: 0,
      files: [
        {
          campaign_id: "12",
          duration: 10,
          file_id: "1",
          is_overall_volume: true,
          name: "",
          overall_volume: 100,
          playlist_id: "1",
          project_id: "13",
          volume: 100,
          sort: 1,
          files: [],
          file: {
            duration: 10,
            composer: "",
            file_name: "",
            hash_sum:  "",
            last_change_date: new Date(),
            mime_type:  "",
            origin_name:  "",
            player_file_id: "10",
            title:  "First track",
          }
        },
        {
          campaign_id: "12",
          duration: 10,
          file_id: "2",
          is_overall_volume: true,
          name: "",
          overall_volume: 100,
          playlist_id: "1",
          project_id: "13",
          volume: 100,
          sort: 2,
          files: [],
          file: {
            duration: 10,
            composer: "",
            file_name: "",
            hash_sum:  "",
            last_change_date: new Date(),
            mime_type:  "",
            origin_name:  "",
            player_file_id: "10",
            title:  "Second track",
          }
        },
        {
          campaign_id: "12",
          duration: 10,
          file_id: "3",
          is_overall_volume: true,
          name: "",
          overall_volume: 100,
          playlist_id: "1",
          project_id: "13",
          volume: 100,
          sort: 3,
          files: [],
          file: {
            duration: 10,
            composer: "",
            file_name: "",
            hash_sum:  "",
            last_change_date: new Date(),
            mime_type:  "",
            origin_name:  "",
            player_file_id: "10",
            title:  "Third track",
          }
        }
      ],
      is_overall_volume: true,
      name: '',
      overall_volume: 100,
      project_id: "13",
    },
    days: [],
    daysType: 'daily',
    isCampaignTimetable: false,
    periodStart: new Date(),
    periodStop: new Date(),
    playCounter: 0,
    shuffle: false,
    sortOrder: 1,
  };
  availableTabs: Tabs[] = [Tabs.tracks];
  isEdit: boolean = false;
  projectId: string = "";
};

export const campaignPlaylistEditContext$ = new BehaviorSubject<CampaignPlaylistEditContextTypes>(new DefaultContextData());

const playlist$ = new BehaviorSubject<CampaignPlaylistConnect | undefined>({
  allDaysStartMinutes: 0,
  allDaysStopMinutes: 0,
  campaignId: "59",
  campaignPlaylist: {
    campaign_id: '59',
    duration: 0,
    files: [
      {
        campaign_id: "59",
        duration: 10,
        file_id: "470",
        is_overall_volume: true,
        name: "",
        overall_volume: 100,
        playlist_id: "1",
        project_id: "13",
        volume: 100,
        sort: 1,
        files: [],
        file: {
          duration: 10,
          composer: "",
          file_name: "",
          hash_sum:  "",
          last_change_date: new Date(),
          mime_type:  "",
          origin_name:  "",
          player_file_id: "10",
          title:  "First track",
        }
      },
      {
        campaign_id: "59",
        duration: 10,
        file_id: "469",
        is_overall_volume: true,
        name: "",
        overall_volume: 100,
        playlist_id: "1",
        project_id: "13",
        volume: 100,
        sort: 2,
        files: [],
        file: {
          duration: 10,
          composer: "",
          file_name: "",
          hash_sum:  "",
          last_change_date: new Date(),
          mime_type:  "",
          origin_name:  "",
          player_file_id: "10",
          title:  "Second track",
        }
      },
      {
        campaign_id: "59",
        duration: 10,
        file_id: "468",
        is_overall_volume: true,
        name: "",
        overall_volume: 100,
        playlist_id: "1",
        project_id: "13",
        volume: 100,
        sort: 3,
        files: [],
        file: {
          duration: 10,
          composer: "",
          file_name: "",
          hash_sum:  "",
          last_change_date: new Date(),
          mime_type:  "",
          origin_name:  "",
          player_file_id: "10",
          title:  "Third track",
        }
      }
    ],
    is_overall_volume: true,
    name: '',
    overall_volume: 100,
    project_id: "13",
  },
  days: [],
  daysType: 'daily',
  isCampaignTimetable: false,
  periodStart: new Date(),
  periodStop: new Date(),
  playCounter: 0,
  shuffle: false,
  sortOrder: 1,
});
const availableTabs$ = new BehaviorSubject<Tabs[]>([Tabs.tracks]);
const isEdit$ = new BehaviorSubject<boolean>(false);
const moveTrack$ = new Subject<{fileId: string, direction: 'up' | 'down'}>();
const removeTrack$ = new Subject<string>();
const projectId$ = new BehaviorSubject<string>("13");

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
>
> = combineLatest([
  playlist$,
  availableTabs$,
  isEdit$,
  projectId$,
]).pipe(
  map(
    ([
      playlist,
      availableTabs,
      isEdit,
      projectId,
    ]) => ({
      playlist,
      availableTabs,
      isEdit,
      projectId,
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
    moveTrackBus$.subscribe(
      sortedData => playlist$.next(sortedData)
    )
  );

  subscriber.add(
    removeTrackBus$.subscribe(
      sortedData => playlist$.next(sortedData)
    )
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
 const setAvailableTabs: CampaignPlaylistEditContextActionsTypes['setAvailableTabs'] = (value) => {
  availableTabs$.next(value);
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
    shuffle: false,
    sortOrder: 1,
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
 */
 const moveTrackUp: CampaignPlaylistEditContextActionsTypes['moveTrackUp'] = fileId => {
  moveTrack$.next({
    fileId,
    direction: 'up',
  });
};

/**
 * Двигает трэк в вниз по очереди
 */
 const moveTrackDown: CampaignPlaylistEditContextActionsTypes['moveTrackDown'] = fileId => {
  moveTrack$.next({
    fileId,
    direction: 'down',
  });
};

/**
 * Удаляет трэк из списка
 */
 const removeTrack: CampaignPlaylistEditContextActionsTypes['removeTrack'] = fileId => {
  removeTrack$.next(fileId);
};

/**
 * Удаляет трэк из списка
 */
 const setProjectId: CampaignPlaylistEditContextActionsTypes['setProjectId'] = projectId => {
  projectId$.next(projectId);
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
};
