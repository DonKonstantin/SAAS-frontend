import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import React, { FC, memo, useCallback, useState } from "react";
import { Button, Stack, Tooltip } from "@mui/material";
import ListPageCreationButton from "components/ListPageParts/ListPageCreationButton";
import { useTranslation } from "react-i18next";
import { useEntityList } from "context/EntityListContext";
import { distinctUntilKeyChanged } from "rxjs";
import { playerCodeService } from "services/playerCodeService";
import { notificationsDispatcher } from "services/notifications";

/**
 * Компонент кнопок действий листинга кодов плеера
 * @param param0
 * @returns
 */
const PlayerCodeActions: FC<ListHeaderProps> = ({ checkedItems }) => {
  const { t } = useTranslation();

  const notifications = notificationsDispatcher();

  const [disabled, setDisabled] = useState<boolean>(false);

  const { reloadedListingData, data } = useEntityList(
    distinctUntilKeyChanged("data")
  );

  const deactivateHandler = useCallback(async () => {
    setDisabled(true);

    try {
      const result = await playerCodeService().deactivatePlayerCode(
        checkedItems
      );

      setDisabled(false);

      if (!result) {
        notifications.dispatch({
          message: t(`player-codes.notifications.deactivate.reject`),
          type: "error",
        });

        return;
      }

      notifications.dispatch({
        message: t(`player-codes.notifications.deactivate.success`),
        type: "success",
      });

      reloadedListingData();
    } catch (error) {
      setDisabled(false);

      notifications.dispatch({
        message: t(`player-codes.notifications.deactivate.reject`),
        type: "error",
      });
    }
  }, [
    checkedItems,
    notifications,
    playerCodeService,
    setDisabled,
    t,
    reloadedListingData,
  ]);

  if (!data) {
    return null;
  }

  const hasActive = data.currentData.rows
  .filter(value => checkedItems.some(v => v === value.columnValues.code.value))
  .some((item) => !!item.columnValues.is_active.value);
>>>>>>> src/components/ListPageCustom/PlayerCodeActions.tsx

  return (
    <Stack direction="row" columnGap={1.5}>
      <ListPageCreationButton
        buttonTitle={t("player-codes.button.create-code")}
        disabled={disabled}
      />
<<<<<<< src/components/ListPageCustom/PlayerCodeActions.tsx
      <Tooltip title={t(`player-codes.tooltip.deactivate-button`) as string}>
        <Button variant="outlined" onClick={deactivateHandler}>
          {t("player-codes.button.deactivate")}
        </Button>
=======
      <Tooltip
        title={
          checkedItems.length
            ? (t(
                hasActive
                  ? `player-codes.tooltip.${
                      checkedItems.length > 1 ? "multiple-" : ""
                    }deactivate-button`
                  : `player-codes.tooltip.nothing-to-deactivate`
              ) as string)
            : ""
        }
      >
        <span>
          <Button
            variant="outlined"
            onClick={deactivateHandler}
            disabled={checkedItems.length === 0 || disabled || !hasActive}
          >
            {t("player-codes.button.deactivate")}
          </Button>
        </span>
>>>>>>> src/components/ListPageCustom/PlayerCodeActions.tsx
      </Tooltip>
    </Stack>
  );
};

export default memo(PlayerCodeActions);
