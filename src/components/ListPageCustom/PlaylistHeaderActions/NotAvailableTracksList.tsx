import React, { FC, memo } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

interface Props {
  playlist: string;
  fileNames: string[];
}

const StyledHeader = styled(Typography)({
  fontSize: 12,
  lineHeight: 1,
  color: "#0000008F",
  marginBottom: 19,
});

const StyledItem = styled(Typography)({
  fontSize: 13,
  lineHeight: 2,
  color: "#000000DE",
});

/**
 * Компонент списка отсутствующих треков в экспортируемых плейлистах
 * @param param0
 * @returns
 */
const NotAvailableTracksList: FC<Props> = ({ playlist, fileNames }) => {
  return (
    <Box sx={{ mb: 2.75 }}>
      <StyledHeader>{playlist}</StyledHeader>
      {fileNames.map((name) => (
        <StyledItem key={name}>{name}</StyledItem>
      ))}
    </Box>
  );
};

export default memo(NotAvailableTracksList);
