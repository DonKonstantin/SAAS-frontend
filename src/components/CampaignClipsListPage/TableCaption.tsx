import React, { FC } from "react";
import {
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { auditTime } from "rxjs";
import { useAuthorization } from "../../context/AuthorizationContext";
import { ClipListItemType } from "./context/types";

export type ListHeaderProps = {
  checkedItems: ClipListItemType[];
  isLoading: boolean;
  header: string;
  onRemoveGroupe: VoidFunction;
};

/**
 * Компонент вывода заголовочной части таблицы клипов проекта
 * @param props
 * @returns
 */
const TableCaption: FC<ListHeaderProps> = (props) => {
  const {
    checkedItems,
    isLoading,
    header,
    onRemoveGroupe,
  } = props;

  const { t } = useTranslation();

  const { userInfo } = useAuthorization(auditTime(1000));

  if (!userInfo) {
    return null;
  }

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item sx={{ flex: "1 1 0" }}>
        <Typography
          variant="h6"
          color="primary"
          sx={{ pl: 2 }}
          data-testid="listHeader"
        >
          {t(header)}
        </Typography>
      </Grid>

      <Grid item>
        <Tooltip
          title={
            t(`campaign-clips-list.list.tooltip.delete-tooltip.group-remove`) as string
          }
        >
          <span>
            <IconButton
              size="small"
              sx={{ mr: 2 }}
              disabled={checkedItems.length === 0 || isLoading}
              onClick={onRemoveGroupe}
              data-testid="commonDeleteButton"
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </span>
        </Tooltip>
      </Grid>

      <Grid item xs={12} sx={{ position: "relative" }}>
        <Divider />

        {isLoading && (
          <LinearProgress
            color="primary"
            sx={{ width: "calc(100% - 8px)", position: "absolute", bottom: -1 }}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default TableCaption;
