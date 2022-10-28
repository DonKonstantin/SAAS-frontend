import { Grid } from "@mui/material";
import { useEntityEdit } from "context/EntityEditContext";
import React, { FC, memo, useEffect, useState, useMemo } from "react";
import { distinctUntilKeyChanged } from "rxjs";
import { ProjectChannel } from "services/playerCodeService/interfaces";
import ActionButtons from "./ActionButtons";
import AddChannel from "./AddChannel";
import ChannelsTable from "./ChannelsTable";
import Pagination from "./Pagination";
import { SortType } from "./types";

/**
 * Страница добавления каналов при редактировании кампании
 * @returns 
 */
const Channels: FC = () => {
  const { entityData } = useEntityEdit(distinctUntilKeyChanged('entityData'));
  
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const [preparedRows, setPreparedRows] = useState<ProjectChannel[]>([]);

  const [limit, setLimit] = useState<number>(10);

  const [offset, setOffset] = useState<number>(0);

  const [sort, setSort] = useState<SortType>({column: 'name', direction: 'asc'});

  if (!entityData) {
    return null;
  }

  const { additionData, values } = entityData;

  const rows = useMemo(() => [...additionData.channels, ...values.channels as any[]], [additionData, values]);

  useEffect(() => {
    let localRows: ProjectChannel[] = [];

    if (sort.column === 'name') {
        localRows = rows
        .sort((a, b) => {
          const aValue = a.name;
          const bValue = b.name;

          return aValue.localeCompare(bValue);
        });
    }

    if (sort.column === 'isActive') {
      localRows = rows
      .sort((a, b) => {
        const aValue = a.is_active;
        const bValue = b.is_active;

        return (aValue === bValue)? 0 : aValue? -1 : 1;
      });
    }

    if (sort.column === 'playersCount') {
      localRows = rows
      .sort((a, b) => {
        const aValue = a.players?.length!;
        const bValue = b.players?.length!;

        return aValue - bValue;
      });
    }

    setPreparedRows(sort.direction === 'asc' ? localRows.reverse() : localRows);
  }, [rows, sort, setPreparedRows]);

  useEffect(() => {
    setPreparedRows(rows);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <AddChannel />
      </Grid>
      <Grid item xs={12}>
        <ChannelsTable 
          sort={sort}
          setSort={setSort}
          limit={limit}
          offset={offset}
          checkedItems={checkedItems}
          onChangeCheckedItems={setCheckedItems}
          rows={preparedRows}
        />
      </Grid>
      <Grid item xs={6}>
        <Pagination
          count={rows.length}
          limit={limit}
          offset={offset}
          setLimit={setLimit}
          setOffset={setOffset}
        />
      </Grid>
      <Grid item xs={6}>
        <ActionButtons checkedItems={checkedItems} />
      </Grid>
    </Grid>
  );
};

export default memo(Channels);
