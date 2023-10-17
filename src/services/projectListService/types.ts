import { CampaignPlayList } from "services/campaignListService/types";
import { ProjectData } from "services/loaders/domainsAndProjects/LoaderQuery";

export interface GetProjectsByIdsQueryRequest {
  projectIds: string[];
};

export interface GetProjectsByIdsQueryResnonce {
  projects: ProjectData[];
};

export interface GetCampaignsFilesRequest {
  projectId: string;
};

export interface GetCampaignsFilesResnonce {
  campaigns: {
    playlists: {
      campaignPlaylist: CampaignPlayList;
    };
  }[];
};