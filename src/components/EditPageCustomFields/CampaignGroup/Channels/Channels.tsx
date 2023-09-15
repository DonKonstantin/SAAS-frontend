import { Alert, Collapse, Grid } from "@mui/material";
import { useCampaignEditContext } from "context/CampaignEditContext/useCampaignEditContext";
import { difference, xor } from "lodash";
import React, { FC, memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { distinctUntilChanged } from "rxjs";
import ActionButtons from "./ActionButtons";
import ChannelsTable from "./ChannelsTable";

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

  const savedChannelsIds = savedChannels.map((el) => el.channel_id) as string[];

  const isDifferent = !!difference(checkedItems, savedChannelsIds).length;

  const rows = useMemo(() => [...(loadedChannels as any[])], [loadedChannels]);

  const setCheckedHandler = (checked: string[]) => {
    const channels = loadedChannels
      .filter((ch) => checked.some((item) => item === ch.id))
      .map((el) => ({
        channel_id: Number(el.id),
      }));

    setChannels(channels);

    setCheckedItems(checked);
  };

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
          <Alert severity="warning">{t(error || "")}</Alert>
        </Collapse>
      </Grid>
      
      <Grid item xs={12}>
        <ChannelsTable
          checkedItems={checkedItems}
          onChangeCheckedItems={setCheckedHandler}
          rows={rows}
          isChannelsLoading={isChannelsLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <ActionButtons checkedItems={checkedItems} isDifferent={isDifferent} />
      </Grid>
    </Grid>
  );
};

export default memo(Channels);
