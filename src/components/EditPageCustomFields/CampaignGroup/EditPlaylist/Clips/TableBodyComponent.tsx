import React, { FC, memo } from "react";
import { CampaignPlayListFileType } from "services/campaignListService/types";
import { TableBody } from "@mui/material";
import ClipsTableRow from "./ClipsTableRow";
import EmptyRow from "./EmptyRow";

interface Props {
  selected: string[];
  rows: CampaignPlayListFileType[];
  setSelected: (selected: string[]) => void;
}

/**
 * Компонент тела таблицы загруженных треков
 * @param param0
 * @returns
 */
const TableBodyComponent: FC<Props> = ({ rows, selected, setSelected }) => {
  return (
    <TableBody>
      {!!rows.length &&
        rows.map((row) => (
          <ClipsTableRow
            key={row.id}
            row={row}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      {!rows.length && <EmptyRow />}
    </TableBody>
  );
};

export default memo(TableBodyComponent);
