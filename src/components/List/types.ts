import { SxProps, Theme } from "@mui/system";
import { SortType } from "components/EditPageCustomFields/CampaignGroup/Channels/types";
import { SortDirection } from "components/EditPageCustomFields/EditProjectPlaylist/FileList/List/ListHeader";

export type ListHeaderCellType = {
  isSortable: boolean;
  sorted: SortDirection | undefined;
  name: string;
  title: string;
  align: any;
  sx: SxProps<Theme>;
  setSort: (sortValue: SortType) => void;
};