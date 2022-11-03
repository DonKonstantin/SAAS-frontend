import {
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import React, { FC, memo, useState } from "react";
import DropDownBlock from "./DropDownBlock";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import TrackTable from "./TrackTable";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import { distinctUntilKeyChanged } from "rxjs";
import { styled } from "@mui/system";

const StyledHeaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 14px",
});

const StyledButtonWrapper = styled('div')({
  width: "100%", 
  padding: "18px 22px", 
  textAlign: "right",
});

/**
 * Компонент вкладки загрузки клипов и добавления их к плэйлисту
 * @returns 
 */
const Clips: FC = () => {
  const { t } = useTranslation();

  const { loadedClips, removeLoadedFile, addLoadedToPlaylist } = useCampaignPlaylistEditContext(distinctUntilKeyChanged("loadedClips"));

  const [selected, setSelected] = useState<string[]>([]);

  const onDeleteTrackHandler = () => {
    removeLoadedFile(selected);

    setSelected([]);
  };

  const onAddClick = () => {
    addLoadedToPlaylist(selected);

    setSelected([]);
  };

  return (
    <>
      <DropDownBlock />
      <StyledHeaderWrapper>
        <Typography color="primary">
          {t("edit-campaign-playlist.table.header.clips-header")}
        </Typography>
        <IconButton onClick={onDeleteTrackHandler} disabled={!selected.length}>
          <DeleteIcon />
        </IconButton>
      </StyledHeaderWrapper>
      <TrackTable rows={loadedClips} selected={selected} setSelected={setSelected} />
      <StyledButtonWrapper>
        <Button
          variant="outlined"
          onClick={onAddClick}
          disabled={!selected.length}
        >
          {t("edit-campaign-playlist.button.add-to-playlist")}
        </Button>
      </StyledButtonWrapper>
    </>
  );
};

export default memo(Clips);
