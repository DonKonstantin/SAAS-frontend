import React, { FC, memo } from "react";
import { Typography, Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFDateField } from "components/hook-form";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

interface Props {
  campaignId: string;
  campaignName: string;
}

/**
 * Компонент указания периода для одной кампании
 * @param props
 * @returns
 */
const PeriodItem: FC<Props> = (props) => {
  const { campaignId, campaignName } = props;

  const { t } = useTranslation();

  const { watch } = useFormContext();

  const fromDate = watch(`${campaignId} from`);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" data-testid="copingCampaignTitle">
        {`${t("pages.campaign.copy-prefix")} ${campaignName}`}
      </Typography>
      <Stack
        sx={{ flexDirection: "row", columnGap: 1.5, alignItems: "flex-end" }}
      >
        <Typography>
          {t("pages.campaign.copy-campaign.period-form.from")}
        </Typography>
        <RHFDateField
          name={`${campaignId} from`}
          inputFormat="дд/мм/гггг"
        />
        <Typography>
          {t("pages.campaign.copy-campaign.period-form.to")}
        </Typography>
        <RHFDateField
          name={`${campaignId} to`}
          inputFormat="дд/мм/гггг"
          shouldDisableDate={(day) => {
            const dayValue = new Date(
              dayjs(day).format("YYYY-MM-DD") + "T00:00:00.000Z"
            ).valueOf();

            const startDate = new Date(
              !fromDate ? "1900-01-01" : fromDate
            ).valueOf();

            return startDate > dayValue;
          }}
        />
      </Stack>
    </Box>
  );
};

export default memo(PeriodItem);
