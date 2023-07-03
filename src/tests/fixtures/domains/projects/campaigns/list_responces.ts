export const domainsAndProjects = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      domains: [
        {
          active: true,
          id: "1",
          name: "Test domain",
        },
      ],
      projects: [
        {
          active: true,
          id: "1",
          name: "Test project",
          parent: "1",
        },
      ],
    },
  }),
};

//  Список доменов
export const domainsList = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      domain: [
        {
          active: true,
          id: "1",
          name: "Test domain",
        },
      ],
    },
  }),
};

export const domainsListRelData = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      rel_data: [
        {
          id: "1",
          name: "Test domain",
        },
      ],
    },
  }),
};

//  Список проектов
export const projectsList = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      project: [
        {
          active: true,
          id: "1",
          name: "Test project",
          parent: "1",
        },
      ],
    },
  }),
};

//  Список проектов
export const campaignsList = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaign: [
        {
          active: true,
          id: "1",
          name: "Test campaign",
          parent: "1",
          campaign_period_start: "2023-02-01T00:00:00Z",
          campaign_period_stop: "2025-02-28T00:00:00Z",
          campaign_priority: "background",
          version: 8,
        },
        {
          active: true,
          id: "2",
          name: "Test campaign 2",
          parent: "1",
          campaign_period_start: "2023-02-01T00:00:00Z",
          campaign_period_stop: "2025-02-28T00:00:00Z",
          campaign_priority: "background",
          version: 8,
        },
      ],
    },
  }),
};

export const campaignsDetails = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaignChannels: [
        {
          channels: [
            {
              campaign_id: "1",
              channel: {
                id: 31,
                is_active: true,
                name: "Test channel 2",
                players: [
                  {
                    guid: "7779329485c04424b7b5e45249f773c5",
                    id: 49,
                    is_active: false,
                    last_query: "2023-05-11T08:27:47.192532Z",
                    last_update: "2023-05-04T07:05:01.055316Z",
                    name: "DESKTOP-8PHF50T",
                    object_passport_id: null,
                    player_code_id: 37,
                    project_id: 1,
                  },
                ],
                project_id: 1,
              },
              channel_id: 31,
              id: 10,
              version: 2,
            },
            {
              campaign_id: "2",
              channel: {
                id: 32,
                is_active: true,
                name: "Test channel 2",
                players: [
                  {
                    guid: "8879329485c04424b7b5e45249f773c5",
                    id: 59,
                    is_active: true,
                    last_query: "2023-05-11T08:27:47.192532Z",
                    last_update: "2023-05-04T07:05:01.055316Z",
                    name: "DESKTOP-8PHF50T",
                    object_passport_id: null,
                    player_code_id: 47,
                    project_id: 1,
                  },
                ],
                project_id: 1,
              },
              channel_id: 31,
              id: 10,
              version: 2,
            },
          ],
        },
      ],
    },
  }),
};

export const fullCampaignsDetails = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaign: [
        {
          campaign_all_days_start_minutes: 0,
          campaign_all_days_stop_minutes: 0,
          campaign_days_type: "daily",
          campaign_end_type: "break",
          campaign_low_priority_end_type: "break",
          campaign_period_start: "2023-05-29T00:00:00Z",
          campaign_period_stop: "2023-05-31T00:00:00Z",
          campaign_play_order: "byOrder",
          campaign_play_tracks_period_type: "minutes",
          campaign_play_tracks_period_value: 0,
          campaign_play_tracks_quantity: 0,
          campaign_play_type: "continuous",
          campaign_priority: "higher",
          campaign_type: "simple",
          channels: [],
          days: [
            {
              campaign_id: "1",
              day_num: 1,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1129",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 2,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1130",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 3,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1131",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 4,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1132",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 5,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1133",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 6,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1134",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 7,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1135",
              is_active: true,
            },
          ],
          id: "1",
          name: "Test campaign",
          playlists: [
            {
              allDaysStartMinutes: 0,
              allDaysStopMinutes: 0,
              campaignId: "157",
              campaignPlaylist: {
                campaign_id: "157",
                duration: 201,
                files: [
                  {
                    file: {
                      composer: "",
                      duration: 201,
                      file_name: "1134d2df-2cf6-4ebb-a0b2-36ca61cf3dc4.mp3",
                      hash_sum: "dDbUbwG6ksW9ahVGTwtTbRPgoxQ=",
                      id: "476",
                      last_change_date: "2023-06-01T12:32:33.651941Z",
                      mime_type: "audio/mpeg",
                      origin_name: "vivaldi-vremena-goda-vesna-allegro-3.mp3",
                      player_file_id: "26062",
                      project_id: "71",
                      title: "Времена Года (Весна) (Allegro)",
                    },
                    file_id: "476",
                    id: "470",
                    playlist_id: "355",
                    sort: 1,
                    volume: 100,
                  },
                ],
                id: "355",
                is_overall_volume: true,
                name: "Test",
                overall_volume: 100,
                project_id: "71",
              },
              campaignPlaylistId: 355,
              days: [
                {
                  dayNum: 1,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4810",
                  isActive: true,
                },
                {
                  dayNum: 2,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4811",
                  isActive: true,
                },
                {
                  dayNum: 3,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4812",
                  isActive: true,
                },
                {
                  dayNum: 4,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4813",
                  isActive: true,
                },
                {
                  dayNum: 5,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4814",
                  isActive: true,
                },
                {
                  dayNum: 6,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4815",
                  isActive: true,
                },
                {
                  dayNum: 7,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4816",
                  isActive: true,
                },
              ],
              daysType: "daily",
              id: "461",
              isCampaignTimetable: true,
              periodStart: "2023-05-29T00:00:00Z",
              periodStop: "2023-05-31T00:00:00Z",
              playCounter: 1,
              projectPlaylist: null,
              projectPlaylistId: null,
              shuffle: false,
              sortOrder: 3,
            },
          ],
          project_id: "71",
          version: 41,
        },
      ],
    },
  }),
};

export const deleteCampaignSuccessfull = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaign_delete: {
        affected_rows: 1,
      },
    },
  }),
};

export const itemsCountAfterDelete = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaign: [
        {
          count: 1,
        },
      ],
    },
  }),
};

export const itemsListAfterDelete = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaign: [
        {
          active: true,
          id: "2",
          name: "Test campaign 2",
          parent: "1",
          campaign_period_start: "2023-02-01T00:00:00Z",
          campaign_period_stop: "2025-02-28T00:00:00Z",
          campaign_priority: "background",
          version: 8,
        },
      ],
    },
  }),
};

export const campaignsDetailsAfterDelete = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaignChannels: [
        {
          channels: [
            {
              campaign_id: "1",
              channel: {
                id: 31,
                is_active: true,
                name: "Test channel 2",
                players: [
                  {
                    guid: "7779329485c04424b7b5e45249f773c5",
                    id: 49,
                    is_active: false,
                    last_query: "2023-05-11T08:27:47.192532Z",
                    last_update: "2023-05-04T07:05:01.055316Z",
                    name: "DESKTOP-8PHF50T",
                    object_passport_id: null,
                    player_code_id: 37,
                    project_id: 1,
                  },
                ],
                project_id: 1,
              },
              channel_id: 31,
              id: 10,
              version: 2,
            },
          ],
        },
      ],
    },
  }),
};

export const storeCampaign = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaignStore: [
        {
          campaign_all_days_start_minutes: 0,
          campaign_all_days_stop_minutes: 0,
          campaign_days_type: "daily",
          campaign_end_type: "break",
          campaign_low_priority_end_type: "break",
          campaign_period_start: "2023-05-29T00:00:00Z",
          campaign_period_stop: "2023-05-31T00:00:00Z",
          campaign_play_order: "byOrder",
          campaign_play_tracks_period_type: "minutes",
          campaign_play_tracks_period_value: 0,
          campaign_play_tracks_quantity: 0,
          campaign_play_type: "continuous",
          campaign_priority: "higher",
          campaign_type: "simple",
          channels: [],
          days: [
            {
              campaign_id: "1",
              day_num: 1,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1129",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 2,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1130",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 3,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1131",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 4,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1132",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 5,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1133",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 6,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1134",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 7,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1135",
              is_active: true,
            },
          ],
          id: "1",
          name: "Test campaign",
          playlists: [
            {
              allDaysStartMinutes: 0,
              allDaysStopMinutes: 0,
              campaignId: "157",
              campaignPlaylist: {
                campaign_id: "157",
                duration: 201,
                files: [
                  {
                    file: {
                      composer: "",
                      duration: 201,
                      file_name: "1134d2df-2cf6-4ebb-a0b2-36ca61cf3dc4.mp3",
                      hash_sum: "dDbUbwG6ksW9ahVGTwtTbRPgoxQ=",
                      id: "476",
                      last_change_date: "2023-06-01T12:32:33.651941Z",
                      mime_type: "audio/mpeg",
                      origin_name: "vivaldi-vremena-goda-vesna-allegro-3.mp3",
                      player_file_id: "26062",
                      project_id: "71",
                      title: "Времена Года (Весна) (Allegro)",
                    },
                    file_id: "476",
                    id: "470",
                    playlist_id: "355",
                    sort: 1,
                    volume: 100,
                  },
                ],
                id: "355",
                is_overall_volume: true,
                name: "Test",
                overall_volume: 100,
                project_id: "71",
              },
              campaignPlaylistId: 355,
              days: [
                {
                  dayNum: 1,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4810",
                  isActive: true,
                },
                {
                  dayNum: 2,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4811",
                  isActive: true,
                },
                {
                  dayNum: 3,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4812",
                  isActive: true,
                },
                {
                  dayNum: 4,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4813",
                  isActive: true,
                },
                {
                  dayNum: 5,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4814",
                  isActive: true,
                },
                {
                  dayNum: 6,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4815",
                  isActive: true,
                },
                {
                  dayNum: 7,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4816",
                  isActive: true,
                },
              ],
              daysType: "daily",
              id: "461",
              isCampaignTimetable: true,
              periodStart: "2023-05-29T00:00:00Z",
              periodStop: "2023-05-31T00:00:00Z",
              playCounter: 1,
              projectPlaylist: null,
              projectPlaylistId: null,
              shuffle: false,
              sortOrder: 3,
            },
          ],
          project_id: "71",
          version: 41,
        },
      ],
    },
  }),
};

export const itemsListAfterCopy = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaign: [
        {
          active: true,
          id: "1",
          name: "Test campaign",
          parent: "1",
          campaign_period_start: "2023-02-01T00:00:00Z",
          campaign_period_stop: "2025-02-28T00:00:00Z",
          campaign_priority: "background",
          version: 8,
        },
        {
          active: true,
          id: "2",
          name: "Test campaign 2",
          parent: "1",
          campaign_period_start: "2023-02-01T00:00:00Z",
          campaign_period_stop: "2025-02-28T00:00:00Z",
          campaign_priority: "background",
          version: 8,
        },
        {
          active: true,
          id: "3",
          name: "Test campaign 3",
          parent: "1",
          campaign_period_start: "2001-01-01T00:00:00Z",
          campaign_period_stop: "2001-11-01T00:00:00Z",
          campaign_priority: "background",
          version: 8,
        },
      ],
    },
  }),
};

export const itemsCountAfterCopy = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaign: [
        {
          count: 3,
        },
      ],
    },
  }),
};

export const campaignsDetailsAfterCopy = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaignChannels: [
        {
          channels: [
            {
              campaign_id: "1",
              channel: {
                id: 31,
                is_active: true,
                name: "Test channel 2",
                players: [
                  {
                    guid: "7779329485c04424b7b5e45249f773c5",
                    id: 49,
                    is_active: false,
                    last_query: "2023-05-11T08:27:47.192532Z",
                    last_update: "2023-05-04T07:05:01.055316Z",
                    name: "DESKTOP-8PHF50T",
                    object_passport_id: null,
                    player_code_id: 37,
                    project_id: 1,
                  },
                ],
                project_id: 1,
              },
              channel_id: 31,
              id: 10,
              version: 2,
            },
          ],
        },
      ],
    },
  }),
};

export const fullCampaignsDetailsOnCopy = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaigns: [
        {
          campaign_all_days_start_minutes: 0,
          campaign_all_days_stop_minutes: 0,
          campaign_days_type: "daily",
          campaign_end_type: "break",
          campaign_low_priority_end_type: "break",
          campaign_period_start: "2023-05-29T00:00:00Z",
          campaign_period_stop: "2023-05-31T00:00:00Z",
          campaign_play_order: "byOrder",
          campaign_play_tracks_period_type: "minutes",
          campaign_play_tracks_period_value: 0,
          campaign_play_tracks_quantity: 0,
          campaign_play_type: "continuous",
          campaign_priority: "higher",
          campaign_type: "simple",
          channels: [],
          days: [
            {
              campaign_id: "1",
              day_num: 1,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1129",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 2,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1130",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 3,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1131",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 4,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1132",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 5,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1133",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 6,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1134",
              is_active: true,
            },
            {
              campaign_id: "1",
              day_num: 7,
              days_start_minutes: 0,
              days_stop_minutes: 1439,
              id: "1135",
              is_active: true,
            },
          ],
          id: "1",
          name: "Test campaign",
          playlists: [
            {
              allDaysStartMinutes: 0,
              allDaysStopMinutes: 0,
              campaignId: "157",
              campaignPlaylist: {
                campaign_id: "157",
                duration: 201,
                files: [
                  {
                    file: {
                      composer: "",
                      duration: 201,
                      file_name: "1134d2df-2cf6-4ebb-a0b2-36ca61cf3dc4.mp3",
                      hash_sum: "dDbUbwG6ksW9ahVGTwtTbRPgoxQ=",
                      id: "476",
                      last_change_date: "2023-06-01T12:32:33.651941Z",
                      mime_type: "audio/mpeg",
                      origin_name: "vivaldi-vremena-goda-vesna-allegro-3.mp3",
                      player_file_id: "26062",
                      project_id: "71",
                      title: "Времена Года (Весна) (Allegro)",
                    },
                    file_id: "476",
                    id: "470",
                    playlist_id: "355",
                    sort: 1,
                    volume: 100,
                  },
                ],
                id: "355",
                is_overall_volume: true,
                name: "Test",
                overall_volume: 100,
                project_id: "71",
              },
              campaignPlaylistId: 355,
              days: [
                {
                  dayNum: 1,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4810",
                  isActive: true,
                },
                {
                  dayNum: 2,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4811",
                  isActive: true,
                },
                {
                  dayNum: 3,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4812",
                  isActive: true,
                },
                {
                  dayNum: 4,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4813",
                  isActive: true,
                },
                {
                  dayNum: 5,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4814",
                  isActive: true,
                },
                {
                  dayNum: 6,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4815",
                  isActive: true,
                },
                {
                  dayNum: 7,
                  daysStartMinutes: 0,
                  daysStopMinutes: 1439,
                  id: "4816",
                  isActive: true,
                },
              ],
              daysType: "daily",
              id: 461,
              isCampaignTimetable: true,
              periodStart: "2023-05-29T00:00:00Z",
              periodStop: "2023-05-31T00:00:00Z",
              playCounter: 1,
              projectPlaylist: null,
              projectPlaylistId: null,
              shuffle: false,
              sortOrder: 3,
            },
          ],
          project_id: "71",
          version: 41,
        },
      ],
    },
  }),
};

export const publishCampaign = {
  status: 200,
  contentType: "application/json",
  body: JSON.stringify({
    data: {
      campaignPublish: true,
    },
  }),
};

export const responceError = {
  status: 500,
  contentType: "application/json",
  body: JSON.stringify({
    data: {},
  }),
};
