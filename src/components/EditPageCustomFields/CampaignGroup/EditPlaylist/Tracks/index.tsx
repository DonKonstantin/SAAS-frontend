import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Typography } from "@mui/material";
import { FormProvider, RHFTextField } from "components/hook-form";
import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import { styled } from "@mui/system";
import { distinctUntilChanged } from "rxjs";
import { isEqual } from "lodash";
import TracksTable from "./TracksTable";
import Pagination from "./Pagination";
import { Tabs } from "context/CampaignPlaylistEditContext/interface";
import {
  CampaignPlaylistConnect,
  CampaignPlaylistConnectDayInput,
  CampaignPlaylistConnectInput,
} from "services/campaignListService/types";
import { notificationsDispatcher } from "services/notifications";
import OveralValue from "./OveralValue";
import { CampaignPlayListInput } from "services/campaignPlaylistService/interfaces";
import campaignPlaylistService from "services/campaignPlaylistService";

export type playlistType = "projectPlaylist" | "campaignPlaylist";

interface Props {
  storePlaylist: (playlist: CampaignPlaylistConnectInput) => void;
  setTab: (tab: Tabs) => void;
}

interface CampaignPlaylistEditFormFieldsType {
  playlistName: string;
  isOverallVolume: boolean;
  overallVolume: number;
}

const StyledButton = styled(Button)({
  whiteSpace: "nowrap",
});

const StyledActionsGrid = styled(Grid)({
  display: "flex",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  rowGap: 18,
  columnGap: 18,
  padding: 18,
});

const StyledPaginationGrid = styled(Grid)({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});

/**
 * Вкладка трэков для плэйлиста кампании
 * @param param0 
 * @returns 
 */
const Tracks: FC<Props> = ({ storePlaylist, setTab }) => {
  const { t } = useTranslation();

  const {
    playlist,
    isEdit,
    projectId,
    setIsEditable,
    setPlaylist,
    setAvailableTabs,
  } = useCampaignPlaylistEditContext(
    distinctUntilChanged(
      (prev, curr) =>
        isEqual(prev.playlist, curr.playlist) &&
        prev.isEdit === curr.isEdit &&
        prev.projectId === curr.projectId
    )
  );

  const [limit, setLimit] = useState<number>(10);

  const [offset, setOffset] = useState<number>(0);

  const messanger = notificationsDispatcher();

  const RegisterScheme = Yup.object().shape({
    playlistName: Yup.string().required(
      t("edit-campaign-playlist.error.required")
    ),
  });

  const currentPlaylist =
    playlist?.projectPlaylist || playlist?.campaignPlaylist;

  let defaultValues = {
    playlistName: currentPlaylist?.name || "",
    isOverallVolume: true,
    overallVolume: 100,
  };

  const methods = useForm<CampaignPlaylistEditFormFieldsType>({
    resolver: yupResolver(RegisterScheme),
    defaultValues,
  });

  const {
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSave = async (
    playlist: CampaignPlaylistConnect,
    formData: CampaignPlaylistEditFormFieldsType
  ) => {
    const playlistType = !!playlist.campaignPlaylist
      ? "campaignPlaylist"
      : "projectPlaylist";

    const preparedPlaylist: CampaignPlaylistConnectInput = {
      ...playlist,
      days: playlist.days as CampaignPlaylistConnectDayInput[],
      id: Number(playlist.id),
      isCampaignTimetable: true,
    };

    if (playlistType === "projectPlaylist") {
      storePlaylist(preparedPlaylist);

      return true;
    }

    try {
      const preparedToStorePlaylist: CampaignPlayListInput = {
        id: Number(playlist[playlistType]?.id),
        files:
          playlist[playlistType]?.files.map((file) => ({
            id: Number(file.id),
            fileId: Number(file.file_id),
            volume: file.volume,
            sort: file.sort,
          })) || [],
        projectId: Number(projectId),
        name: formData.playlistName,
        isOverallVolume: formData.isOverallVolume,
        overallVolume: formData.overallVolume,
        campaignId: Number(playlist[playlistType]?.campaign_id!),
      };

      const response = await campaignPlaylistService().storeCampaignPlaylist(
        preparedToStorePlaylist
      );

      storePlaylist({ ...preparedPlaylist, id: Number(response.id) });

      return true;
    } catch (error) {
      messanger.dispatch({
        message: t("edit-campaign-playlist.error.store-campaign-playlist"),
        type: "error",
      });

      return false;
    }
  };

  const onSubmit = async (data: CampaignPlaylistEditFormFieldsType) => {
    if (Object.keys(errors).length) {
      return;
    }

    if (!playlist) {
      return;
    }

    const saveResult = await onSave(playlist, data);

    if (!saveResult) {
      return;
    }

    setPlaylist(undefined);
  };

  const onSaveAndRouteToSchedule = async () => {
    const values = getValues();

    if (!playlist) {
      return;
    }

    const saveResult = await onSave(playlist, values);

    if (!saveResult) {
      return;
    }

    setAvailableTabs([...Object.values(Tabs)]);

    setTab(Tabs.schedule);
  };

  if (!!playlist?.projectPlaylist) {
    setIsEditable();
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={3}>
          <Typography>
            {t("edit-campaign-playlist.field.playlist-name")}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <RHFTextField name="playlistName" />
        </Grid>
        <Grid item xs={12}>
          <OveralValue />
        </Grid>
        <Grid item xs={12}>
          <TracksTable
            isEditable={isEdit}
            limit={limit}
            offset={offset}
            rows={currentPlaylist?.files!}
          />
        </Grid>
        <StyledPaginationGrid item xs={6}>
          <Pagination
            count={currentPlaylist?.files.length || 0}
            limit={limit}
            offset={offset}
            setLimit={setLimit}
            setOffset={setOffset}
          />
        </StyledPaginationGrid>
        <StyledActionsGrid item xs={6}>
          <StyledButton variant="outlined" type="submit">
            {t("edit-campaign-playlist.button.save-with-common-rule")}
          </StyledButton>
          <StyledButton variant="outlined" onClick={onSaveAndRouteToSchedule}>
            {t("edit-campaign-playlist.button.save-and-route-to-schedule")}
          </StyledButton>
        </StyledActionsGrid>
      </Grid>
    </FormProvider>
  );
};

export default memo(Tracks);
