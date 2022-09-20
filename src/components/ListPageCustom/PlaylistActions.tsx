import { ListHeaderProps } from "components/ListPageParts/TableCaption";
import React, { FC, memo, useCallback } from "react";
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEntityList } from "context/EntityListContext";
import { distinctUntilKeyChanged } from "rxjs";

/**
 * Компонент кнопок действий листинга кодов плеера
 * @param param0
 * @returns
 */
const PlaylistActions: FC<ListHeaderProps> = ({ checkedItems }) => {
  const { t } = useTranslation();

  const { data } = useEntityList(distinctUntilKeyChanged("data"));

  const refreshHandler = useCallback(() => {
    console.log(data, "data");
  }, [checkedItems]);

  const copyHandler = useCallback(() => {
    console.log(checkedItems, "checkedItems");
  }, [checkedItems]);

  return (
    <Stack direction="row" columnGap={1.5}>
      <Button variant="outlined" onClick={refreshHandler}>
        {t("project-playlists.button.refresh-linked-companies")}
      </Button>
      <Button variant="outlined" onClick={copyHandler}>
        {t("project-playlists.button.copy-playlist")}
      </Button>
    </Stack>
  );
};

export default memo(PlaylistActions);
