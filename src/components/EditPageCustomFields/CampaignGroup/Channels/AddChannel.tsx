import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { getCurrentState } from "context/AuthorizationContext";
import { useCampaignEditContext } from "context/CampaignEditContext/useCampaignEditContext";
import React, {FC, memo, useEffect, useLayoutEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import { debounceTime, distinctUntilKeyChanged, filter, fromEvent, map, switchMap } from "rxjs";
import { ProjectChannel } from "services/playerCodeService/interfaces";
import { projectChannelsService } from "services/projectChannelsService";

const StyledWrapper = styled(Box)({
  display: "grid",
  gridTemplateColumns: "auto 200px",
});

/**
 * Компонент добавления канала
 */

const AddChannel: FC = () => {
  const { t } = useTranslation();

  const { campaign, setCampaign } = useCampaignEditContext(distinctUntilKeyChanged('campaign'));

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

  // Load channel on mounted component
  useEffect(() => {
    const { project } = getCurrentState();

    projectChannelsService().getChannelsByName(project, "").then(options => {
      setOptions(options);
    }).catch(() => {
      setOptions([]);
    })
  }, [])

  const onAddChannelHandler = async () => {
    if (!campaign || !newChannel) {
      return
    }

    setCampaign({
      ...campaign,
      channels: [
        //@ts-ignore
        ...campaign?.channels,
        //@ts-ignore
        newChannel
      ]
    });
    setInputValue('')
    setNewChannel(undefined);
  };

  useLayoutEffect(() => {
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
            return await projectChannelsService().getChannelsByName(project, name);
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
          freeSolo
          clearIcon={false}
          filterOptions={(option) => option.filter(({ id }) => !campaign?.channels.some(channel => (channel.channel_id ?? channel.id) === id))}
          noOptionsText={t("pages.campaign.edit.fields.content.playlist.noOptions")}
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
