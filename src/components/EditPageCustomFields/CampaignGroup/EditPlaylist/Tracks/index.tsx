import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Grid, Typography} from "@mui/material";
import {FormProvider, RHFTextField} from "components/hook-form";
import React, {FC, memo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {useCampaignPlaylistEditContext} from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import {styled} from "@mui/system";
import {distinctUntilChanged} from "rxjs";
import {isEqual} from "lodash";
import TracksTable from "./TracksTable";
import Pagination from "./Pagination";
import {Tabs} from "context/CampaignPlaylistEditContext/interface";
import {CampaignPlaylistConnect} from "services/campaignListService/types";
import {notificationsDispatcher} from "services/notifications";
import OveralValue from "./OveralValue";
import {useCampaignEditContext} from "../../../../../context/CampaignEditContext/useCampaignEditContext";
import {CampaignPlayListInput} from "services/campaignPlaylistService/interfaces";
import campaignPlaylistService from "services/campaignPlaylistService";

export type playlistType = "projectPlaylist" | "campaignPlaylist";

interface Props {
  storePlaylist: (playlist: CampaignPlaylistConnect) => void;
  setTab: (tab: Tabs) => void;

  onSubmitCampaign(): void
}

interface CampaignPlaylistEditFormFieldsType {
  name: string;
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

const StyledGrid = styled(Grid)({
  paddingTop: 20,
});

/**
 * Вкладка трэков для плэйлиста кампании
 * @param param0
 * @returns
 */
const Tracks: FC<Props> = ({ storePlaylist, setTab, onSubmitCampaign }) => {
  const { t } = useTranslation();

  const {
    playlist,
    isEdit,
    projectId,
    setIsEditable,
    setAvailableTabs,
    setPlaylist,
  } = useCampaignPlaylistEditContext(
    distinctUntilChanged(
      (prev, curr) =>
        isEqual(prev.playlist, curr.playlist) &&
        prev.isEdit === curr.isEdit &&
        prev.projectId === curr.projectId
    )
  );

  const { campaign } = useCampaignEditContext(
    distinctUntilChanged(
      (prev, curr) =>
        isEqual(prev.campaign, curr.campaign)
    )
  );

  const [limit, setLimit] = useState<number>(10);

  const [offset, setOffset] = useState<number>(0);

  if (!playlist || !campaign) {
    return null;
  }

  const messanger = notificationsDispatcher();

  const RegisterScheme = Yup.object().shape({
    name: Yup.string().required(
      t("edit-campaign-playlist.error.required")
    )
  })

  const currentPlaylist = playlist?.projectPlaylist || playlist?.campaignPlaylist;

  let defaultValues = {
    name: currentPlaylist?.name || "",
    isOverallVolume: currentPlaylist?.is_overall_volume || true,
    overallVolume: currentPlaylist?.overall_volume || 100,
  };

  const methods = useForm<CampaignPlaylistEditFormFieldsType>({
    resolver: yupResolver(RegisterScheme),
    defaultValues,
  });

  const {
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const onSavePlaylist = async (dataForPlaylist: CampaignPlaylistConnect, formData: CampaignPlaylistEditFormFieldsType) => {

    const playlistType = !!playlist.campaignPlaylist
      ? "campaignPlaylist"
      : "projectPlaylist";

    if (playlistType === "projectPlaylist") {
      storePlaylist(playlist);

      return true;
    }

    try {
      let preparedToStorePlaylist: CampaignPlayListInput = {
        files:
          playlist[playlistType]?.files.map((file) => ({
            id: Number(file.id),
            fileId: Number(file.file_id),
            volume: file.volume,
            sort: file.sort,
          })) || [],
        projectId: Number(projectId),
        name: formData.name,
        isOverallVolume: formData.isOverallVolume,
        overallVolume: formData.overallVolume,
        campaignId: Number(campaign.id),
      };

      if (playlist[playlistType]?.id) {
        preparedToStorePlaylist = { ...preparedToStorePlaylist, id: Number(playlist[playlistType]?.id) }
      }

      const response = await campaignPlaylistService().storeCampaignPlaylist(preparedToStorePlaylist);
      storePlaylist({
        ...dataForPlaylist,
        campaignPlaylistId: Number(response.id),
        campaignPlaylist: response,
        //@ts-ignore
        files: response.files,
        duration: response.duration,
        id: response.id,
      })
      return true
    } catch (e) {
      messanger.dispatch({
        message: t("edit-campaign-playlist.error.store-campaign-playlist"),
        type: "error",
      });

      return false;
    }
  }

  const onSubmit = async (data: CampaignPlaylistEditFormFieldsType) => {
    if (Object.keys(errors).length) {
      return;
    }

    if (!playlist) {
      return;
    }

    const preparedPlaylist = {
      ...playlist,
      ...data,
      isCampaignTimetable: true,
      days: campaign.days.map(day => {
        delete day['campaign_id']
        return {
          id: day.id,
          dayNum: day.day_num,
          isActive: day.is_active,
          daysStartMinutes: day.days_start_minutes,
          daysStopMinutes: day.days_stop_minutes,
        }
      }),
      periodStart: campaign.campaign_period_start,
      periodStop: campaign.campaign_period_stop
    }

    //@ts-ignore
    const saveResult = await onSavePlaylist(preparedPlaylist, data)
    if (!saveResult) {
      return;
    }

    onSubmitCampaign()
  }


  const onSaveAndRouteToSchedule = async () => {
    const values = getValues();

    if (!playlist) {
      return;
    }

    if (playlist.projectPlaylist) {
      setTab(Tabs.schedule);
      return
    }

    if (values.name.length === 0) {
      setError('name', {
        type: "required",
        message: t("edit-campaign-playlist.error.required"),
      })
      return
    }

    const saveResult = await onSavePlaylist(playlist, values);
    const campaignPlaylist = playlist.campaignPlaylist;

    if (!saveResult || !campaignPlaylist) {
      return;
    }

    setPlaylist({
      ...playlist,
      campaignPlaylist: {
        ...campaignPlaylist,
        name: values.name,
        is_overall_volume: values.isOverallVolume,
        overall_volume: values.overallVolume,
      },
    });

    setAvailableTabs([...Object.values(Tabs)]);

    setTab(Tabs.schedule);
  }

  if (!!playlist?.campaignPlaylist && !isEdit) {
    setIsEditable();
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <StyledGrid item xs={3}>
          <Typography>
            {t("edit-campaign-playlist.field.playlist-name")}
          </Typography>
        </StyledGrid>
        <StyledGrid item xs={5}>
          <RHFTextField name="name" disabled={!!playlist.projectPlaylistId}/>
        </StyledGrid>
        <StyledGrid item xs={12}>
          {!!playlist?.campaignPlaylist && <OveralValue/>}
        </StyledGrid>
        <Grid item xs={12} sx={{ pt: 1.5 }}>
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
          <StyledButton variant="outlined" type="submit"
                        disabled={!currentPlaylist?.files.length}
          >
            {t("edit-campaign-playlist.button.save-with-common-rule")}
          </StyledButton>
          <StyledButton variant="outlined" onClick={onSaveAndRouteToSchedule}
                        disabled={!currentPlaylist?.files.length}
          >
            {
              playlist.campaignPlaylist
                ? t("edit-campaign-playlist.button.save-and-route-to-schedule")
                : t("edit-campaign-playlist.button.route-to-schedule")
            }
          </StyledButton>
        </StyledActionsGrid>
      </Grid>
    </FormProvider>
  );
};

export default memo(Tracks);