import React, { FC } from "react";
import EntityListHoc, {
  WithEntityListHoc,
} from "../../context/EntityListContext";
import { ArrayDifference } from "../../services/helpers/ArrayDifference";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

// Компонент вывода диалогового окна удаления выбранных элементов
const DeleteDialog: FC<WithEntityListHoc<{}>> = (props) => {
  const { itemsToDelete, onDeleteSubmit, onDeleteItems, isLoading } = props;

  // Обработчик закрытия диалогового окна
  const onClose = () => {
    onDeleteItems([]);
  };

  const { t } = useTranslation();

  const count = itemsToDelete.length;
  return (
    <Dialog
      open={itemsToDelete.length > 0}
      onClose={onClose}
      aria-labelledby="entity-list-delete-dialog-title"
      data-testid="deleteDialogWrapper"
    >
      <DialogTitle
        id="entity-list-delete-dialog-title"
        data-testid="deleteDialogTitle"
      >
        {t(`entity-list.components.delete-dialog.title`)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText data-testid="deleteDialogText">
          <Trans
            i18nKey="entity-list.components.delete-dialog.description"
            count={count}
          >
            Вы точно хотите удалить элементы ({{ count }} шт.)? Это действие
            нельзя отменить!
          </Trans>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Tooltip
          title={
            t(`entity-list.components.delete-dialog.cancel-tooltip`) as string
          }
        >
          <Button
            onClick={onClose}
            color="primary"
            data-testid="deleteDialogCancelButton"
          >
            {t(`entity-list.components.delete-dialog.cancel`)}
          </Button>
        </Tooltip>
        <Tooltip
          title={
            t(`entity-list.components.delete-dialog.submit-tooltip`) as string
          }
        >
          <span>
            <Button
              onClick={onDeleteSubmit}
              disabled={isLoading}
              color="secondary"
              data-testid="deleteDialogDeleteButton"
            >
              <Trans
                i18nKey="entity-list.components.delete-dialog.submit"
                count={count}
              >
                Удалить ({{ count }})
              </Trans>
            </Button>
          </span>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

// Экспортируем компонент
export default EntityListHoc()(
  React.memo(DeleteDialog, (prevProps, nextProps) => {
    return (
      ArrayDifference(prevProps.itemsToDelete, nextProps.itemsToDelete)
        .length === 0 && prevProps.isLoading === nextProps.isLoading
    );
  })
);
