import {
  Paper,
  Grid,
  Tooltip,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/system";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { campaignListService } from "services/campaignListService";
import { ListFieldRow } from "services/listDataLoader/listLoader/types";
import { notificationsDispatcher } from "services/notifications";
import { Schemas } from "settings/schema";
import { prepareCampaignDataForStore } from "./helpers";
import CloseIcon from "@mui/icons-material/Close";
import PeriodItem from "./PeriodItem";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from "components/hook-form";

interface Props {
  selectedCampaigns: ListFieldRow<keyof Schemas>[];
  onClose: VoidFunction;
  reloadedListingData: VoidFunction;
}

type CopyCampaignPeriodFormType = { [x: string]: Date | null };

const StyledPaper = styled(Paper)({
  padding: 40,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
});

/**
 * Модалка для указания периода копируемым кампаниям
 * @param props
 * @returns
 */
const CopyCampaignPeriodModal: FC<Props> = (props) => {
  const { selectedCampaigns, onClose, reloadedListingData } =
    props;

  const { t } = useTranslation();

  const notifications = notificationsDispatcher();

  const RegisterScheme = Yup.object().shape(
    selectedCampaigns.reduce(
      (acc, item) => ({
        ...acc,
        [`${item.primaryKeyValue} from`]: Yup.date()
          .required(t("pages.campaign.edit.errors.required"))
          .nullable(),
        [`${item.primaryKeyValue} to`]: Yup.date()
          .required(t("pages.campaign.edit.errors.required"))
          .nullable(),
      }),
      {}
    )
  );

  let defaultValues: CopyCampaignPeriodFormType = selectedCampaigns.reduce(
    (acc, item) => ({
      ...acc,
      [`${item.primaryKeyValue} from`]: null,
      [`${item.primaryKeyValue} to`]: null,
    }),
    {}
  );

  const methods = useForm<CopyCampaignPeriodFormType>({
    resolver: yupResolver(RegisterScheme),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CopyCampaignPeriodFormType) => {
    try {
      const campaigns = await campaignListService().getCampaignsArrayByIds(
        selectedCampaigns.map((row) => row.primaryKeyValue)
      );

      await Promise.all(
        campaigns.map((campaign) => {
          const preparedCampaign = prepareCampaignDataForStore(campaign);

          const campaignPlaylistsPeriodStart = data[`${campaign.id} from`];
          const campaignPlaylistsPeriodStop = data[`${campaign.id} to`];

          return campaignListService().storeCampaign({
            ...preparedCampaign,
            campaign_period_start: campaignPlaylistsPeriodStart,
            campaign_period_stop: campaignPlaylistsPeriodStop,
            campaign_type: "mute",
            channels: [],
            name: `${t("pages.campaign.copy-prefix")} ${campaign.name}`,
          });
        })
      )
        .then(() => {
          notifications.dispatch({
            message: t(
              `pages.campaign.notifications.campaign-copy.succeess.${
                campaigns.length === 1 ? "single" : "multiple"
              }`
            ),
            type: "success",
          });

          reloadedListingData();
        })
        .catch(() => {
          notifications.dispatch({
            message: t(
              `pages.campaign.notifications.campaign-copy.reject.${
                campaigns.length === 1 ? "single" : "multiple"
              }`
            ),
            type: "error",
          });
        });
    } catch (error) {
      notifications.dispatch({
        message: t(`pages.campaign.notifications.campaign-copy.error`),
        type: "error",
      });
    }
  };

  return (
    <StyledPaper>
      <Grid container spacing={2}>
        <Grid item sx={{ display: "flex", justifyContent: "flex-end" }} xs={12}>
          <Tooltip title={t("pages.campaign.tooltip.button.close-copy-modal")}>
            <IconButton size={"small"} onClick={onClose}>
              <CloseIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="primary">
            {t("pages.campaign.copy-campaign.period-form.header")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {selectedCampaigns.map((campaign) => (
              <PeriodItem
                campaignId={campaign.primaryKeyValue}
                campaignName={campaign.columnValues.name.value}
              />
            ))}
            <Box
              sx={{ display: "flex", justifyContent: "space-evenly", pt: 3 }}
            >
              <LoadingButton
                loading={isSubmitting}
                variant="outlined"
                type="submit"
              >
                {t("pages.campaign.button.copy")}
              </LoadingButton>
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={isSubmitting}
                color="error"
              >
                {t("pages.campaign.button.close")}
              </Button>
            </Box>
          </FormProvider>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default memo(CopyCampaignPeriodModal);
