import React, { FC, memo } from "react";
import { Typography, Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFDateField } from "components/hook-form";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import { uniq } from "lodash";

type BusyDayType = {
  from: number;
  to: number;
};

interface Props {
  campaignId: string;
  campaignName: string;
  busyDays: BusyDayType[];
}

/**
 * Компонент указания периода для одной кампании
 * @param props
 * @returns
 */
const PeriodItem: FC<Props> = (props) => {
  const { campaignId, campaignName, busyDays } = props;

  const { t } = useTranslation();

  const { watch, getValues } = useFormContext();

  const fromDate = watch(`${campaignId} from`);

  const checkDate = (day: Date) => {
    const dayValue = new Date(
      dayjs(day).format("YYYY-MM-DD") + "T00:00:00.000Z"
    ).valueOf();

    const formValues = getValues();

    const campaignIds = uniq(
      Object.keys(formValues)
        .map((key) => key.split(" ")[0])
        .filter((id) => !!formValues[`${id} from`] && !!formValues[`${id} to`])
    );

    const selectedPeriod = campaignIds.map((id) => ({
      from: formValues[`${id} from`],
      to: formValues[`${id} to`],
    }));

    return (
      busyDays.some(
        (busyDay) => busyDay.from < dayValue && busyDay.to >= dayValue
      ) ||
      selectedPeriod.some(
        (busyDay) => busyDay.from < dayValue && busyDay.to >= dayValue
      )
    );
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1">{`${t(
        "pages.campaign.copy-prefix"
      )} ${campaignName}`}</Typography>
      <Stack
        sx={{ flexDirection: "row", columnGap: 1.5, alignItems: "flex-end" }}
      >
        <Typography>
          {t("pages.campaign.copy-campaign.period-form.from")}
        </Typography>
        <RHFDateField
          name={`${campaignId} from`}
          inputFormat="дд/мм/гггг"
          shouldDisableDate={checkDate}
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

            return checkDate(day) || startDate > dayValue;
          }}
        />
      </Stack>
    </Box>
  );
};

export default memo(PeriodItem);
