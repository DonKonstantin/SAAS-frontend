import * as React from 'react';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from "@mui/material/TableHead";
import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "../../../../hook-form";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton, styled } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCampaignEditContext } from "../../../../../context/CampaignEditContext/useCampaignEditContext";
import { distinctUntilChanged } from "rxjs";
import { isEqual } from "lodash";

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
    deleteCampaignPlaylist
  } =
    useCampaignEditContext(
      distinctUntilChanged(
        (prev, curr) =>
          isEqual(prev.campaign, curr.campaign)
      )
    );

  const { t } = useTranslation()

  if (!campaign) {
    return <></>
  }

  console.log(campaign.playlists)

  return (
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
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      //@ts-ignore
                      key={row.name}
                    >
                      <TableCell
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        <StyledIconButton onClick={() => {
                        }}>
                          <ArrowUpwardIcon sx={{ width: 16 }}/>
                        </StyledIconButton>
                        <StyledIconButton onClick={() => {
                        }}>
                          <ArrowDownwardIcon sx={{ width: 16 }}/>
                        </StyledIconButton>
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.files.length}</TableCell>
                      <TableCell align="left">{row.duration}</TableCell>
                      <TableCell align="left">
                        <RHFCheckbox name={`playlists[${index}].shuffle`} label=''/>
                      </TableCell>
                      <TableCell align="left">{row.playCounter}</TableCell>
                      <TableCell align="right">
                        <StyledIconButton
                          size="small"
                          onClick={() => {
                        }}>
                          <EditIcon fontSize="medium" sx={{ mr: "12px" }}/>
                        </StyledIconButton>
                        <StyledIconButton
                          size="small"
                          onClick={() => deleteCampaignPlaylist(row.id)}
                        >
                          <DeleteIcon fontSize="medium"/>
                        </StyledIconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default memo(CampaignContentTable)