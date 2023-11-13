import React, { FC } from "react";
import { SimpleValues } from "../../services/listDataLoader/listLoader/listValues/SimpleValues";
import { TableCell } from "@mui/material";
import { ListFieldProperties } from "../../services/listDataLoader/listLoader/types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useEntityList } from "context/EntityListContext";
import dayjs from "dayjs";

/**
 * Компонент ячейки активности кампании
 * @param props
 * @returns
 */
const CampaignIsActiveCell: FC<ListFieldProperties<SimpleValues>> = ({
  value,
}) => {
  const { t } = useTranslation();

  const { data } = useEntityList();

  if (!data) {
    return null;
  }

  const {
    currentData: { additionData, rows },
  } = data;

  const row = rows.find((r) => r.primaryKeyValue === value.value)?.columnValues;

  const channels = additionData?.find(
    el => el.channels[0]?.campaign_id === value.value
  );

  const startPeriod = new Date(row?.campaign_period_start.value).getTime();
  const endPeriod = new Date(dayjs(row?.campaign_period_stop.value).add(1, "day").format("YYYY-MM-DD")).getTime();
  const now = new Date().getTime();

  const inPeriod = startPeriod <= now && now <= endPeriod;

  const status = !!channels && inPeriod;

  return (
    <TableCell className="list-table-cell" sx={{ textAlign: 'center' }}>
      <span className={clsx("custom-active-cell", { active: !!status })}>
        {t(
          `pages.users.list.fields.active-status.${
            !!status ? "active" : "inactive"
          }`
        )}
      </span>
    </TableCell>
  );
};

export default CampaignIsActiveCell;
