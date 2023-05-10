import { ProjectData } from "services/loaders/domainsAndProjects/LoaderQuery";

export interface GetProjectsByIdsQueryRequest {
  projectIds: string[];
};

export interface GetProjectsByIdsQueryResnonce {
  projects: ProjectData[];
};