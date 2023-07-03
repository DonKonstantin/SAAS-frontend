import { Button } from "@mui/material";
import { styled } from "@mui/system";
import React, { FC, memo, useState } from "react";
import { distinctUntilChanged } from "rxjs";
import { notificationsDispatcher } from "services/notifications";
import { playerListService } from "services/playerList";
import { EditFieldProperties } from "settings/pages/system/edit";
import { useActionButtons } from "../ActionButtons";
import useEntityEditField from "./useEntityEditField";

const StyledWrapper = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

/**
 * Компонент кнопки сохранения редактирования плеера
 * @param param0
 * @returns
 */
const PlayerSaveButtonField: FC<EditFieldProperties> = ({ fieldCode }) => {
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const fieldData = useEntityEditField(fieldCode, distinctUntilChanged());

  const actionsCtx = useActionButtons();

  const notifications = notificationsDispatcher();

  if (!fieldData || !actionsCtx) {
    return null;
  }

  const { handleClose } = actionsCtx;

  const { t, primaryKey, values } = fieldData;

  const onClickHandler = async () => {
    setDisableButton(true);

    const saveResult = await playerListService().savePlayer(
      primaryKey,
      String(values?.project_id),
    );

    if (saveResult) {
      notifications.dispatch({
        message: t("player-list.notifications.success"),
        type: "success",
      });

      handleClose();

      setDisableButton(false);

      return;
    }

    notifications.dispatch({
      message: t("player-list.notifications.reject"),
      type: "error",
    });

    setDisableButton(false);
  };

  return (
    <StyledWrapper>
      <Button
        variant="outlined"
        onClick={onClickHandler}
        disabled={disableButton}
      >
        {t("player-list.button.save")}
      </Button>
    </StyledWrapper>
  );
};

export default memo(PlayerSaveButtonField);
