import React, { FC, memo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCampaignEditContext } from "../../../../../context/CampaignEditContext/useCampaignEditContext";

type Props = {
  open: boolean
  onClose(): void
  currentPlaylistForDelete: { playlistId: string, name: string }
}

const DeleteDialogPlaylist: FC<Props> = (props) => {

  const { open, onClose, currentPlaylistForDelete } = props

  const { deleteCampaignPlaylist } = useCampaignEditContext();

  const { t } = useTranslation()

  const deletePlaylist = () => {
    deleteCampaignPlaylist(currentPlaylistForDelete.playlistId)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}
            aria-labelledby="entity-list-delete-dialog-title">
      <DialogTitle
        id="delete-campaign-playlist">{t("pages.campaign.edit.fields.content.playlist.table.deleteDialog.header", { name: currentPlaylistForDelete.name })}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("pages.campaign.edit.fields.content.playlist.table.deleteDialog.title", { name: currentPlaylistForDelete.name })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Tooltip
          title={t("pages.campaign.edit.fields.content.playlist.table.deleteDialog.buttons.tooltip-cancel") as string}>
          <Button onClick={onClose} color="primary">
            {t("pages.campaign.edit.fields.content.playlist.table.deleteDialog.buttons.cancel")}
          </Button>
        </Tooltip>
        <Tooltip
          title={t("pages.campaign.edit.fields.content.playlist.table.deleteDialog.buttons.tooltip-delete") as string}>
          <Button
            onClick={deletePlaylist}
            color="secondary"
          >
            {t("pages.campaign.edit.fields.content.playlist.table.deleteDialog.buttons.delete")}
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  )
}

export default memo(DeleteDialogPlaylist)