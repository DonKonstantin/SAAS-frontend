import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import React, { FC, memo, useCallback } from "react";
import { Button, Stack, Tooltip } from "@mui/material";
import ListPageCreationButton from "components/ListPageParts/ListPageCreationButton";
import { useTranslation } from "react-i18next";
import { useEntityList } from "context/EntityListContext";
import { distinctUntilKeyChanged } from "rxjs";

/**
 * Компонент кнопок действий листинга кодов плеера
 * @param param0
 * @returns
 */
const PlayerCodeActions: FC<ListHeaderProps> = ({ checkedItems }) => {
  const { t } = useTranslation();

  const { data } = useEntityList(distinctUntilKeyChanged("data"));

  const deactivateHandler = useCallback(() => {
    console.log(data, "data");
  }, [checkedItems]);

  return (
    <Stack direction="row" columnGap={1.5}>
      <ListPageCreationButton
        buttonTitle={t("player-codes.button.create-code")}
      />
      <Tooltip title={t(`player-codes.tooltip.deactivate-button`) as string}>
        <Button variant="outlined" onClick={deactivateHandler}>
          {t("player-codes.button.deactivate")}
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default memo(PlayerCodeActions);
