import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import CheckMediaFilesControls from "./CheckMediaFilesControls";
import CheckMediaFilesList from "./CheckMediaFilesList";
import { styled } from "@mui/system";

const StyledStickyContainer = styled(Grid)(({ theme }) => ({
  alignItems: 'center',
  position: 'sticky',
  bottom: 0,
  paddingBottom: 16,
  backgroundColor: theme.palette.common.white,
  marginTop: 16,
}));

const StyledPaper = styled(Paper)({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  border: '1px solid #E5E5E5',
  padding: '16px 16px 0px',
});

/**
 * Компонент страницы подраздела "Проверка" страницы "Медиабиблиотека"
 * @returns
 */
const CheckMediaFiles: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledPaper>
      <div>
        <Typography color="primary">
          {t("medialibrary.check.header")}
        </Typography>

        <Divider sx={{ mt: 2 }} />
      </div>

      <CheckMediaFilesList />

      <StyledStickyContainer container>
        <Grid item xs={12}>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <CheckMediaFilesControls />
        </Grid>
      </StyledStickyContainer>
    </StyledPaper>
  );
};

export default CheckMediaFiles;
