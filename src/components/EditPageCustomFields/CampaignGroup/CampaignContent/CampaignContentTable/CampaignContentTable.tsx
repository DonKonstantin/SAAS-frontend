import * as React from 'react';
import { memo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from "@mui/material/TableHead";
import { useTranslation } from "react-i18next";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Checkbox, IconButton, styled, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCampaignEditContext } from "../../../../../context/CampaignEditContext/useCampaignEditContext";
import { distinctUntilChanged } from "rxjs";
import { timeConverterNumberForTime } from "../../../../timeConverter";
import DeleteDialogPlaylist from "./DeletePlaylist";
import { CampaignPlaylistConnect } from "../../../../../services/campaignListService/types";
import {
  useCampaignPlaylistEditContext
} from "../../../../../context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";

export type ContentTableHeadType = {
  sort: string
  name: string;
  trackCount: number;
  files: string;
  shuffle: boolean;
  count: number;
  actions: string
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof ContentTableHeadType;
  label: string;
  numeric: boolean;
  minWidth: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'sort',
    numeric: true,
    disablePadding: true,
    label: "",
    minWidth: "48px"
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: "pages.campaign.edit.fields.content.playlist.table.headCells.name",
    minWidth: ""
  },
  {
    id: 'trackCount',
    numeric: true,
    disablePadding: false,
    label: "pages.campaign.edit.fields.content.playlist.table.headCells.trackCount",
    minWidth: ""
  },
  {
    id: 'files',
    numeric: true,
    disablePadding: false,
    label: "pages.campaign.edit.fields.content.playlist.table.headCells.files",
    minWidth: ""
  },
  {
    id: 'shuffle',
    numeric: true,
    disablePadding: false,
    label: "pages.campaign.edit.fields.content.playlist.table.headCells.shuffle",
    minWidth: ""
  },
  {
    id: 'count',
    numeric: true,
    disablePadding: false,
    label: "pages.campaign.edit.fields.content.playlist.table.headCells.count",
    minWidth: ""
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: "",
    minWidth: ""
  },
];

const StyledIconButton = styled(IconButton)({
  padding: 0,
});

const CampaignContentTable = () => {

  const {
    campaign,
    shuffleCampaignPlaylist,
    playCounterCampaignPlaylist,
    movePlaylistCampaign
  } =
    useCampaignEditContext(
      distinctUntilChanged(
        (prev, curr) =>
          prev.campaign === curr.campaign
      )
    );

  const { setPlaylist } = useCampaignPlaylistEditContext();

  const { t } = useTranslation()
  const [openDialogDeletePlaylist, setOpenDialogDeletePlaylist] = useState<boolean>(false);
  const [currentPlaylistForDelete, setCurrentPlaylistForDelete] = useState<{ playlistId: string, name: string } | undefined>(undefined);

  if (!campaign) {
    return <></>
  }

  const onOpenDeleteDialogPlaylist = (id: string, name: string) => {
    setCurrentPlaylistForDelete({ playlistId: id, name })
    setOpenDialogDeletePlaylist(true)
  }

  const closeDialogDeletePlaylist = () => {
    setOpenDialogDeletePlaylist(false)
    setCurrentPlaylistForDelete(undefined)
  }

  return (
    <>
      {
        currentPlaylistForDelete &&
          <DeleteDialogPlaylist
              open={openDialogDeletePlaylist}
              onClose={closeDialogDeletePlaylist}
              currentPlaylistForDelete={currentPlaylistForDelete}
          />
      }
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={'left'}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                      style={{ minWidth: headCell.minWidth }}
                    >
                      {t(headCell.label)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {campaign.playlists
                  .sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder))
                  .map((playlist: CampaignPlaylistConnect & { name: string, files: [], duration: number, shuffle: boolean }, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const playlistTimeDuration = timeConverterNumberForTime(playlist.duration)
                    return (
                      <TableRow
                        role="checkbox"
                        tabIndex={-1}
                        key={playlist.id}
                      >
                        <TableCell
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          <StyledIconButton onClick={() => movePlaylistCampaign(playlist.id!, "up")}>
                            <ArrowUpwardIcon sx={{ width: 16 }}/>
                          </StyledIconButton>
                          <StyledIconButton onClick={() => movePlaylistCampaign(playlist.id!, "down")}>
                            <ArrowDownwardIcon sx={{ width: 16 }}/>
                          </StyledIconButton>
                        </TableCell>
                        <TableCell align="left">
                          {playlist.name}
                        </TableCell>
                        <TableCell align="left">
                          {playlist.files.length}
                        </TableCell>
                        <TableCell align="left">
                          {playlistTimeDuration}
                        </TableCell>
                        <TableCell align="left">
                          <Checkbox
                            checked={playlist.shuffle}
                            onChange={(e) => shuffleCampaignPlaylist(playlist.id!, e.currentTarget.checked)}
                          />
                        </TableCell>
                        <TableCell align="left">
                          <TextField 
                            type='number'
                            variant='standard'
                            size='small'
                            value={playlist.playCounter}
                            onChange={(e)=> playCounterCampaignPlaylist(playlist.id!, Number(e.currentTarget.value))}
                            InputProps={{
                              inputProps: { min: 1 }
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => setPlaylist(playlist)}>
                            <EditIcon fontSize="medium"/>
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => onOpenDeleteDialogPlaylist(playlist.id!, playlist.name)}
                          >
                            <DeleteIcon fontSize="medium"/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default memo(CampaignContentTable)