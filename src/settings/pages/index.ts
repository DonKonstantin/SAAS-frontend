import { Schemas } from "../schema";
import { ListPageConfiguration } from "./system/list";
import { EditPageConfiguration } from "./system/edit";
import { UserListingConfiguration } from "./list/user";
import { PermissionCategoryListingConfiguration } from "./list/permission_category";
import { PermissionListingConfiguration } from "./list/permission";
import { RoleListingConfiguration } from "./list/role";
import { DomainListingConfiguration } from "./list/domain";
import { ProjectListingConfiguration } from "./list/project";
import { PermissionCategoryEditPageConfig } from "./edit/permission_category";
import { PermissionEditPageConfig } from "./edit/permission";
import { DomainEditPageConfig } from "./edit/domain";
import { ProjectEditPageConfig } from "./edit/project";
import { RoleEditPageConfig } from "./edit/role";
import { UserEditPageConfig } from "./edit/user";
import { NotificationsTemplateListingConfiguration } from "./list/notifications_template";
import { NotificationsTemplateEditPageConfig } from "./edit/notifications_template";
import { NotificationConfigListingConfiguration } from "./list/notification_config";
import { NotificationConfigEditPageConfig } from "./edit/notification_config";
import { FileListingConfiguration } from "./list/file";
import { ObjectsPassportListingConfiguration } from "./list/object_passport";
import { ObjectPassportEditPageConfig } from "./edit/object_passport";
import { PlayersListingConfiguration } from "./list/player";
import { PlayerEditPageConfiguration } from "./edit/player";
import { PlayerCodeListingConfiguration } from "./list/player_code";
import { PlaylistListingConfiguration } from "./list/project_playlist";
import { ProjectPlaylistEditPageConfig } from "./edit/project_playlist";
import { PlayerCodeEditPageConfig } from "./edit/player_code";
import { CampaignListingConfiguration } from "./list/campaign";

// Параметры конфигурации листинга сущностей
export type ListSchemaConfiguration = {
  [P in keyof Schemas]?: ListPageConfiguration<P>;
};
export const listSchemaConfiguration: {
  (): ListSchemaConfiguration;
} = (): ListSchemaConfiguration => {
  return {
    user: new UserListingConfiguration(),
    permission_category: new PermissionCategoryListingConfiguration(),
    file: new FileListingConfiguration(),
    permission: new PermissionListingConfiguration(),
    role: new RoleListingConfiguration(),
    domain: new DomainListingConfiguration(),
    project: new ProjectListingConfiguration(),
    notifications_template: new NotificationsTemplateListingConfiguration(),
    notification_config: new NotificationConfigListingConfiguration(),
    object_passport: new ObjectsPassportListingConfiguration(),
    player_code: new PlayerCodeListingConfiguration(),
    project_playlist: new PlaylistListingConfiguration(),
    player: new PlayersListingConfiguration(),
    campaign: new CampaignListingConfiguration()
  };
};

// Параметры конфигурации страниц редактирования сущностей
export type EditSchemaConfiguration = {
  [P in keyof Schemas]?: EditPageConfiguration<P>;
};
export const editSchemaConfiguration: {
  (): EditSchemaConfiguration;
} = (): EditSchemaConfiguration => {
  return {
    permission_category: new PermissionCategoryEditPageConfig(),
    permission: new PermissionEditPageConfig(),
    domain: new DomainEditPageConfig(),
    project: new ProjectEditPageConfig(),
    role: new RoleEditPageConfig(),
    user: new UserEditPageConfig(),
    notifications_template: new NotificationsTemplateEditPageConfig(),
    notification_config: new NotificationConfigEditPageConfig(),
    object_passport: new ObjectPassportEditPageConfig(),
    project_playlist: new ProjectPlaylistEditPageConfig(),
    player: new PlayerEditPageConfiguration(),
    player_code: new PlayerCodeEditPageConfig(),
  };
};
