import { Campaign, CampaignInput } from "services/campaignListService/types";

export const prepareCampaignDataForStore = (campaign: Campaign): CampaignInput => {
  const playlists = campaign.playlists.map((playlist) => ({
    projectPlaylistId: playlist.projectPlaylistId,
    playCounter: playlist.playCounter,
    periodStop: playlist.periodStop,
    shuffle: playlist.shuffle,
    periodStart: playlist.periodStart,
    daysType: playlist.daysType,
    sortOrder: playlist.sortOrder,
    isCampaignTimetable: playlist.isCampaignTimetable,
    allDaysStartMinutes: playlist.allDaysStartMinutes,
    allDaysStopMinutes: playlist.allDaysStopMinutes,
    campaignPlaylistId: playlist.campaignPlaylistId,
    days: playlist.days.map((day) => ({
      dayNum: day.dayNum,
      isActive: day.isActive,
      daysStartMinutes: day.daysStartMinutes,
      daysStopMinutes: day.daysStopMinutes,
      id: Number(day.id),
    })),
    id: Number(playlist.id),
  }));

  return {
    campaign_play_tracks_quantity: Number(
      campaign.campaign_play_tracks_quantity
    ),
    campaign_all_days_start_minutes: Number(
      campaign.campaign_all_days_start_minutes
    ),
    campaign_all_days_stop_minutes: Number(
      campaign.campaign_all_days_stop_minutes
    ),
    campaign_days_type: campaign.campaign_days_type,
    campaign_end_type: campaign.campaign_end_type,
    campaign_low_priority_end_type:
      campaign.campaign_low_priority_end_type,
    campaign_period_start: campaign.campaign_period_start,
    campaign_period_stop: campaign.campaign_period_stop,
    campaign_play_order: campaign.campaign_play_order,
    campaign_play_tracks_period_type:
      campaign.campaign_play_tracks_period_type,
    campaign_play_tracks_period_value: Number(
      campaign.campaign_play_tracks_period_value
    ),
    campaign_play_type: campaign.campaign_play_type,
    campaign_priority: campaign.campaign_priority,
    campaign_type: campaign.campaign_type,
    channels: [],
    days: campaign.days.map((day) => ({
      day_num: day.day_num,
      is_active: day.is_active,
      days_start_minutes: day.days_start_minutes,
      days_stop_minutes: day.days_stop_minutes,
      id: day.id,
    })),
    playlists,
    project_id: campaign.project_id,
    name: campaign.name,
  };
};