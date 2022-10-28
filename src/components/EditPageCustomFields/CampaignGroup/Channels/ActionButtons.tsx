import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useEntityEdit } from "context/EntityEditContext";
import { isEqual } from "lodash";
import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { distinctUntilKeyChanged } from "rxjs";

interface Props {
  checkedItems: string[];
}

const StyledWrapper = styled(Box)({
  display: "flex", 
  justifyContent: "flex-end", 
  columnGap: 20, 
  alignItems: 'center', 
  height: '100%'
});

/**
 * Компонент кнопок действий вкладки каналов на странице редактирования кампании
 * @param param0 
 * @returns 
 */
const ActionButtons: FC<Props> = ({ checkedItems }) => {
  const { t } = useTranslation();

  const { entityData } = useEntityEdit(distinctUntilKeyChanged("entityData"));

  if (!entityData) {
    return null;
  }

  const disableSaveButton = isEqual(
    entityData.originalValues.channels,
    entityData.values.channels
  );

  const onPublishHandler = () => {};

  const onSaveHandler = () => {};

  return (
    <StyledWrapper>
      <Button
        variant="outlined"
        onClick={onPublishHandler}
        disabled={!checkedItems.length}
      >
        {t("pages.campaign.add.buttons.publish")}
      </Button>
      <Button
        variant="outlined"
        onClick={onSaveHandler}
        disabled={disableSaveButton}
      >
        {t("pages.campaign.add.buttons.save")}
      </Button>
    </StyledWrapper>
  );
};

export default memo(ActionButtons);
