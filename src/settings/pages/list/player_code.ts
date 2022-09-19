import { EditPageLinkGenerator, ListPageConfiguration, PageUrl } from '../system/list';
import ListPageEditDeleteButtons from "components/ListPageEditDeleteButtons";
import { getCurrentState } from 'context/AuthorizationContext';
import { FilterFieldsConfiguration } from 'services/listDataLoader/filterLoader/types';
import { ListFieldsConfiguration } from 'services/listDataLoader/listLoader/types';
import EmptyCell from 'components/ListPageCustom/EmptyCell';
import PlayerCodeActions from "components/ListPageCustom/PlayerCodeActions";
import { ListHeaderProps } from 'components/ListPageParts/TableCaption';

/**
 * Конфигурация листинга кодов плееров
 */
 export class PlayerCodeListingConfiguration
 implements ListPageConfiguration<"player_code">
{
 filter: FilterFieldsConfiguration<"player_code"> = {};
 listFields: ListFieldsConfiguration<"player_code"> = {
   fields: {
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
       width: 115,
       fieldType: {
         config: undefined,
         type: "Simple",
       },
     },
     is_active: {
       field: "is_active",
       title: "player-codes.list.headers.is_active",
       isEnabled: true,
       width: 100,
       align: 'left',
       fieldType: {
         config: undefined,
         type: "Simple",
         customComponent: EmptyCell,
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
 action: React.ComponentType<ListHeaderProps> = PlayerCodeActions;
}