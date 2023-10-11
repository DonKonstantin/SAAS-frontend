import React, { FC } from "react";
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

interface Props {
  isOpen: boolean;
  selectedItemsCount: number;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
}

/**
 * Компонент вывода диалогового окна удаления выбранных клипов
 * @param props
 * @returns
 */
const DeleteDialog: FC<Props> = (props) => {
  const { 
    isOpen,
    selectedItemsCount,
    onClose,
    onSubmit,
  } = props;

  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
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
            count={selectedItemsCount}
          >
            Вы точно хотите удалить элементы ({{ count: selectedItemsCount }} шт.)? Это действие
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
              onClick={onSubmit}
              color="secondary"
              data-testid="deleteDialogDeleteButton"
            >
              <Trans
                i18nKey="entity-list.components.delete-dialog.submit"
                count={selectedItemsCount}
              >
                Удалить ({{ count: selectedItemsCount }})
              </Trans>
            </Button>
          </span>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
