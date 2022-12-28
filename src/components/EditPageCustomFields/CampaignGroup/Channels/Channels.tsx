import { Alert, Collapse, Grid } from "@mui/material";
import { useCampaignEditContext } from "context/CampaignEditContext/useCampaignEditContext";
import { difference, xor } from "lodash";
import React, { FC, memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { distinctUntilChanged } from "rxjs";
import { ProjectChannel } from "services/playerCodeService/interfaces";
import ActionButtons from "./ActionButtons";
import ChannelsTable from "./ChannelsTable";
import Pagination from "./Pagination";
import { SortType } from "./types";

/**
 * Страница добавления каналов при редактировании кампании
 * @returns
 */
const Channels: FC = () => {
  const { t } = useTranslation();

  const {
    savedChannels,
    loadedChannels,
    isChannelsLoading,
    error,
    loadChannels,
    cleareLoadedChannels,
    setChannels,
  } = useCampaignEditContext(
    distinctUntilChanged(
      (prev, curr) =>
        !xor(prev.savedChannels, curr.savedChannels).length &&
        !xor(prev.loadedChannels, curr.loadedChannels).length &&
        prev.isChannelsLoading === curr.isChannelsLoading &&
        prev.error === curr.error
    )
  );

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const [preparedRows, setPreparedRows] = useState<ProjectChannel[]>([]);

  const [limit, setLimit] = useState<number>(10);

  const [offset, setOffset] = useState<number>(0);

  const [sort, setSort] = useState<SortType>({
    column: "name",
    direction: "asc",
  });

  const savedChannelsIds = savedChannels.map(el => el.channel_id) as string[];

  const isDifferent = !!difference(checkedItems, savedChannelsIds).length;

  const rows = useMemo(() => [...(loadedChannels as any[])], [loadedChannels]);

  const setCheckedHandler = (checked: string[]) => {
    const channels = loadedChannels.filter(ch => checked.some(item => item === ch.id)).map(el => ({
      channel_id: Number(el.id),
    }));

    setChannels(channels);

    setCheckedItems(checked);
  };

  useEffect(() => {
    let localRows: ProjectChannel[] = [];

    if (sort.column === "name") {
      localRows = rows.sort((a, b) => {
        const aValue = a.name;
        const bValue = b.name;

        return aValue.localeCompare(bValue);
      });
    }

    if (sort.column === "isActive") {
      localRows = rows.sort((a, b) => {
        const aValue = a.is_active;
        const bValue = b.is_active;

        return aValue === bValue ? 0 : aValue ? -1 : 1;
      });
    }

    if (sort.column === "playersCount") {
      localRows = rows.sort((a, b) => {
        const aValue = a.players?.length!;
        const bValue = b.players?.length!;

        return aValue - bValue;
      });
    }

    setPreparedRows(sort.direction === "asc" ? localRows.reverse() : localRows);
  }, [rows, sort, setPreparedRows]);

  useEffect(() => {
    setPreparedRows(loadedChannels);
  }, [loadedChannels]);

  /**
   * Загрузка каналов
   */
  useEffect(() => {
    loadChannels();

    return () => cleareLoadedChannels();
  }, []);

  /**
   * Записываем значение выбранных каналов
   */
  useEffect(() => {
    setCheckedItems(savedChannelsIds);

    const channels = savedChannels.map(ch => ({
      channel_id: Number(ch.channel_id),
      id: Number(ch.id),
    }));

    setChannels(channels);
  }, []);
  
  return (
    <Grid container>
      <Grid item xs={12}>
        <Collapse in={error !== undefined}>
          <Alert severity="warning">
            {t(error || "")}
          </Alert>
        </Collapse>
      </Grid>
      <Grid item xs={12}>
        <ChannelsTable
          sort={sort}
          setSort={setSort}
          limit={limit}
          offset={offset}
          checkedItems={checkedItems}
          onChangeCheckedItems={setCheckedHandler}
          rows={preparedRows}
          isChannelsLoading={isChannelsLoading}
        />
      </Grid>
      <Grid item xs={6}>
        <Pagination
          count={preparedRows.length}
          limit={limit}
          offset={offset}
          setLimit={setLimit}
          setOffset={setOffset}
        />
      </Grid>
      <Grid item xs={6}>
        <ActionButtons checkedItems={checkedItems} isDifferent={isDifferent}/>
      </Grid>
    </Grid>
  );
};

export default memo(Channels);
