import { Collapse, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { FC, memo } from "react";
import { useOpenRows } from "./openSubrowContext";
import { ListFieldRow } from "services/listDataLoader/listLoader/types";
import { useEntityList } from "context/EntityListContext";
import { distinctUntilKeyChanged } from "rxjs";
import { PlayerChannel } from "services/playerList/interfaces";
import PlayerSubRow from "./PlayerSubRow";

interface Props {
  item: ListFieldRow<'player'>;
}

/**
 * Компонент выподающей подстраки с каналами для листинга плееров
 * @param param0
 * @returns
 */
const ProjectPlayerCampigns: FC<Props> = ({ item }) => {
  const openRows = useOpenRows();

  const { data } = useEntityList(distinctUntilKeyChanged("data"));

  if (!data) {
    return null;
  }

  const { currentData: { additionData: { campaigns } } } = data;

  const rowCampaigns: PlayerChannel[] = campaigns
    ?.filter(campaign => campaign.id === item.primaryKeyValue)[0]?.campaigns || [];

  const open = openRows.includes(item.primaryKeyValue);

  return (
    <TableRow>
      <TableCell sx={{ p: 0, border: 0 }} colSpan={7}>
        <Collapse in={open}>
          <Table>
            <TableBody>
              {rowCampaigns.map((subRow, index) => (
                <PlayerSubRow row={subRow} key={subRow.channel.name + index} />
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default memo(ProjectPlayerCampigns);
