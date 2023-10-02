import React, { FC, useState } from "react";
import { Button, FormControlLabel, Switch, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCheckMediaFilesContext } from "./CheckMediaFilesContext";
import { styled } from "@mui/system";

const StyledWrapper = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  columnGap: 16,
});

const CheckMediaFilesControls: FC = () => {
  const { t } = useTranslation();

  const {
    runCheck,
    downloadPlaylist,
    isChecked,
    resetCheck,
    isError,
  } = useCheckMediaFilesContext();
  
  const [allowedDoubles, setAllowedDoubles] = useState(false)

  if (isChecked) {
    return (
      <StyledWrapper>
        <Tooltip title={t("medialibrary.check.tooltip.with-doubles-swith")}>
          <FormControlLabel
            label={t("medialibrary.check.label.with-doubles-swith")}
            control={
              <Switch
                checked={allowedDoubles}
                onChange={event => setAllowedDoubles(event.target.checked)}
              />

            }
          />
        </Tooltip>

        <Tooltip title={t("medialibrary.check.tooltip.upload-button")}>
          <Button
            variant="outlined"
            onClick={() => downloadPlaylist(allowedDoubles)}
            disabled={isError}
          >
            {t("medialibrary.check.button.upload")}
          </Button>
        </Tooltip>

        <Tooltip title={t("medialibrary.check.tooltip.dump-button")} placement="bottom-end">
          <Button
            variant="outlined"
            color="warning"
            onClick={resetCheck}
          >
            {t("medialibrary.check.button.dump")}
          </Button>
        </Tooltip>
      </StyledWrapper>
    );
  };

  return (
    <StyledWrapper>
      <Button
        variant="outlined"
        onClick={runCheck}
      >
        {t("medialibrary.check.button.check")}
      </Button>
    </StyledWrapper>
  );
};

export default CheckMediaFilesControls;
