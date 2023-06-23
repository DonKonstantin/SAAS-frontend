import { FC } from "react";
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
import { useEntityList } from "../../context/EntityListContext";
import { auditTime, distinctUntilChanged } from "rxjs";
import { withPageProps } from "../../layouts/PagePropsProvider";
import { useAuthorization } from "../../context/AuthorizationContext";
import CheckPermission from "../../services/helpers/CheckPermission";
import { PageWithEntityList } from "../ListPage/types";

// Свойства компонента
export type ListHeaderProps = PageWithEntityList & {
  checkedItems: any[];
  hideButtonDeleteItems?: boolean;
  onChangeCheckedItems?: (items: any[]) => void;
};

// Компонент вывода заголовочной части таблицы
const TableCaption: FC<ListHeaderProps> = (props) => {
  const {
    header = "",
    checkedItems,
    permissionCheckEditPermission,
    permissionCheckDeletePermission = permissionCheckEditPermission,
    permissionCheckLevel = "project",
    permissionCheckEditLevel = permissionCheckLevel,
    permissionCheckDeleteLevel = permissionCheckEditLevel,
    hideButtonDeleteItems,
  } = props;

  const { t } = useTranslation();
  const { isLoading, onDeleteItems } = useEntityList(
    distinctUntilChanged(
      (previous, current) => previous.isLoading === current.isLoading
    )
  );
  const { userInfo } = useAuthorization(auditTime(1000));
  if (!userInfo) {
    return null;
  }

  // Обработчик удаления выбранных элементов
  const handleDeleteItems = () => {
    onDeleteItems(checkedItems);
  };

  const hasAccess = !(
    permissionCheckDeletePermission &&
    !CheckPermission(
      userInfo,
      permissionCheckDeletePermission,
      permissionCheckDeleteLevel
    )
  );
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
        {hasAccess && !hideButtonDeleteItems && (
          <Tooltip
            title={
              t(`entity-list.components.table-caption.delete-tooltip`) as string
            }
          >
            <span>
              <IconButton
                size="small"
                sx={{ mr: 2 }}
                disabled={checkedItems.length === 0}
                onClick={handleDeleteItems}
                data-testid="commonDeleteButton"
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
            </span>
          </Tooltip>
        )}
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

// Экспортируем компонент
export default withPageProps(TableCaption);
