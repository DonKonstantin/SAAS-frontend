import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import { TableColumnSortType } from "./TrackTable";
import { CampaignPlayListFileType } from "services/campaignListService/types";
import { styled } from "@mui/system";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import { distinctUntilKeyChanged } from "rxjs";
import TableLoader from "./TableLoader";

interface Props {
  rows: CampaignPlayListFileType[];
  selected: string[];
  sort: TableColumnSortType;
  setSort: (sort: TableColumnSortType) => void;
  setSelected: (selected: string[]) => void;
}

const StyledNameCell = styled(TableCell)({
  width: 200,
  color: "#393535",
  fontWeight: 400,
  fontSize: 12,
});

/**
 * Компонент заголовка для таблицы загруженных треков
 * @param param0
 * @returns
 */
const TableHeader: FC<Props> = ({
  rows,
  selected,
  sort,
  setSort,
  setSelected,
}) => {
  const { t } = useTranslation();

  const { uploadedClips } = useCampaignPlaylistEditContext(
    distinctUntilKeyChanged("uploadedClips")
  );

  const allPrimaryKeys = rows.map((row) => row.file_id!);

  const isAllItemsSelected = allPrimaryKeys.length === selected.length;

  const onToggleItemCheckedState = () => {
    if (!!allPrimaryKeys.length && allPrimaryKeys.length !== selected.length) {
      setSelected(allPrimaryKeys);

      return;
    }

    setSelected([]);
  };

  return (
    <TableHead sx={{ borderTop: "1px solid #E0E0E0" }}>
      <TableRow>
        <CheckBoxCell
          isHeader={true}
          indeterminate={!isAllItemsSelected && selected.length > 0}
          checked={isAllItemsSelected && allPrimaryKeys.length > 0}
          onChange={onToggleItemCheckedState}
        />
        <StyledNameCell>
          <TableSortLabel
            active={true}
            direction={sort}
            onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
          >
            {t("edit-campaign-playlist.table.header.track-name")}
          </TableSortLabel>
        </StyledNameCell>
        <TableCell />
        <TableCell width={38} />
      </TableRow>
      {!!uploadedClips.length && <TableLoader />}
    </TableHead>
  );
};

export default memo(TableHeader);
