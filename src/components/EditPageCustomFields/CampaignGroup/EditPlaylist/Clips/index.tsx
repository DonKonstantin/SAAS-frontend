import {
  Button,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import React, { FC, memo, useState } from "react";
import DropDownBlock from "./DropDownBlock";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import TrackTable from "./TrackTable";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import { distinctUntilKeyChanged } from "rxjs";
import { styled } from "@mui/system";
import { notificationsDispatcher } from "services/notifications";

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

  const {
    loadedClips,
    removeClips,
    addLoadedToPlaylist,
  } = useCampaignPlaylistEditContext(
    distinctUntilKeyChanged("loadedClips"),
  );
  
  const [selected, setSelected] = useState<string[]>([]);

  const messanger = notificationsDispatcher();

  const onDeleteTrackHandler = () => {
    removeClips(selected);

    setSelected([]);
  };

  const onAddClick = () => {
    addLoadedToPlaylist(selected);

    messanger.dispatch({
      message: t("edit-campaign-playlist.success.clip-added-to-campaign-playlist"),
      type: "success",
    });

    setSelected([]);
  };

  const isRemoveButtonDisabled: boolean = loadedClips
    .filter(clip => selected.some(sClip => clip.file_id === sClip))
    .some(filteredClip => !filteredClip.isFreeProjectFile);
  

  const removeTooltipText: string = !isRemoveButtonDisabled
    ? ""
    : t("edit-campaign-playlist.table.tooltip.remove.selected.disable");

  return (
    <>
      <DropDownBlock />

      <StyledHeaderWrapper>
        <Typography color="primary">
          {t("edit-campaign-playlist.table.header.clips-header")}
        </Typography>

        <Tooltip title={removeTooltipText}>
          <div>
            <IconButton onClick={onDeleteTrackHandler} disabled={!selected.length || isRemoveButtonDisabled}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Tooltip>
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
