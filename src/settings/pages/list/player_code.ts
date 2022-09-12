import { EditPageLinkGenerator, ListPageConfiguration, PageUrl } from '../system/list';
import ListPageEditDeleteButtons from "components/ListPageEditDeleteButtons";
import { getCurrentState } from 'context/AuthorizationContext';
import { FilterFieldsConfiguration } from 'services/listDataLoader/filterLoader/types';
import { ListFieldsConfiguration } from 'services/listDataLoader/listLoader/types';

/**
 * Конфигурация листинга кодов плееров
 */
 export class PlayerCodeListingConfiguration
 implements ListPageConfiguration<"player_code">
{
 filter: FilterFieldsConfiguration<"player_code"> = {};
 listFields: ListFieldsConfiguration<"player_code"> = {
   fields: {
    channels: {
       field: "channels",
       title: "",
       isEnabled: true,
       isHidden: true,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
     close_time: {
       field: "close_time",
       title: "",
       isEnabled: true,
       isHidden: true,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
     code: {
       field: "code",
       title: "player-codes.list.headers.code",
       isEnabled: true,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
     id: {
       field: "id",
       title: "",
       isEnabled: true,
       isHidden: true,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
     is_active: {
       field: "is_active",
       title: "player-codes.list.headers.is_active",
       isEnabled: true,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
     open_time: {
       field: "open_time",
       title: "",
       isEnabled: true,
       isHidden: true,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
     players: {
       field: "players",
       title: "",
       isEnabled: true,
       isHidden: true,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
     project_channels: {
       field: "project_channels",
       title: "",
       isEnabled: true,
       isHidden: true,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
     project_id: {
       field: "project_id",
       title: "",
       isEnabled: true,
       isHidden: true,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
     reload_time: {
       field: "reload_time",
       title: "",
       isEnabled: true,
       isHidden: true,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
   },
   actions: ListPageEditDeleteButtons,
 };
 schema: "player_code" = "player_code";
 elementsPerPage: number = 25;
 editPageUrl: EditPageLinkGenerator = (pk) => {
   const {domain, project} = getCurrentState();

   return {
   href: "/domain/[domainId]/project/[projectId]/player-codes/edit/[entityId]",
   as: `/domain/${domain}/project/${project}/player-codes/edit/${pk}`,
 }};
 addPageUrl: {(): PageUrl} = () => {
   const {domain, project} = getCurrentState();

   return {
     href: "/domain/[domainId]/project/[projectId]/player-codes/add",
     as: `/domain/${domain}/project/${project}/player-codes/add`,
   }
 };
 hidePagination = true;
 hideFilter = true;
}