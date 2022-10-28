import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { getCurrentState } from "context/AuthorizationContext";
import { useEntityEdit } from "context/EntityEditContext";
import React, { FC, memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap } from "rxjs";
import { campaignListService } from "services/campaignListService";
import { ProjectChannel } from "services/playerCodeService/interfaces";

const StyledWrapper = styled(Box)({
  display: "grid",
  gridTemplateColumns: "auto 200px",
});

/**
 * Компонент добавления канала
 */
const AddChannel: FC = () => {
  const { t } = useTranslation();

  const { onChangeFieldValue } = useEntityEdit(distinctUntilChanged(() => true));

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [options, setOptions] = useState<any>([]);

  const [inputValue, setInputValue] = useState<string>("");

  const [newChannel, setNewChannel] = useState<ProjectChannel | undefined>();

  const onSelectHandler = (_: any, value: ProjectChannel) => {
    setNewChannel(value);
  };

  const onInputValueHandler = (_: any, value: string) => {
    setNewChannel(undefined);

    setInputValue(value);
  };

  const onAddChannelHandler = () => {
    onChangeFieldValue('channels',
      //@ts-ignore
      (values) => [...values, newChannel]
    );
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    fromEvent<InputEvent>(inputRef.current, "input")
      .pipe(
        debounceTime(500),
        map(({ target }) => {
          const { project } = getCurrentState();

          return {
            name: (target as HTMLInputElement).value,
            project,
          };
        }),
        filter((searchParam) => searchParam.name.length >= 3),
        switchMap(async ({ name, project }) => {
          try {
            await campaignListService().getAvailableChannels(project, name);
          } catch (error) {
            return undefined;
          }
        }),
        filter((response) => !!response)
      )
      .subscribe((response) => {
        setOptions(response);
      });
  }, []);

  return (
    <StyledWrapper>
      <Box>
        <Autocomplete
          inputValue={inputValue}
          onInputChange={onInputValueHandler}
          onChange={onSelectHandler}
          disablePortal
          options={options}
          fullWidth
          getOptionLabel={(option: ProjectChannel) => option.name}
          renderInput={(params) => (
            <TextField ref={inputRef} {...params} variant="standard" />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.name}
            </Box>
          )}
        />
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="outlined"
          onClick={onAddChannelHandler}
          disabled={newChannel === undefined}
        >
          {t("pages.campaign.add.buttons.add-channel")}
        </Button>
      </Box>
    </StyledWrapper>
  );
};

export default memo(AddChannel);
