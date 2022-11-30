import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, tap } from "rxjs";
import projectPlaylistService from "../../../../services/projectPlaylistService";
import { PlaylistsResponseType } from "../../../../services/projectPlaylistService/interfaces";
import { CampaignDaysType } from "../../../../services/campaignListService/types";
import { useCampaignEditContext } from "../../../../context/CampaignEditContext/useCampaignEditContext";
import { isEqual } from "lodash";
import { getCurrentState } from "../../../../context/AuthorizationContext";
import { notificationsDispatcher } from "../../../../services/notifications";
import {
  useCampaignPlaylistEditContext
} from "../../../../context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";

const CampaignPlayListContent = () => {

  const { campaign, storeCampaignPlaylist } = useCampaignEditContext(
    distinctUntilChanged(
      (prev, curr) =>
        isEqual(prev.campaign, curr.campaign)
    )
  );

  const { setNewPlaylist } = useCampaignPlaylistEditContext();

  const { t } = useTranslation()

  const { project } = getCurrentState();

  const messanger = notificationsDispatcher();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [playlistName, setPlaylistName] = useState<string>('');
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState<boolean>(false);
  const [options, setOptions] = useState<PlaylistsResponseType[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistsResponseType | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>("");

  const addPlaylistHandle = () => {
    if (!currentPlaylist || !campaign) {
      return
    }

    const findCurrentlyAddPlaylist = campaign.playlists.find(playlist => playlist.id === currentPlaylist.id)
    if (findCurrentlyAddPlaylist) {
      return;
    }

    const playlistForCompany = {
      name: currentPlaylist.name,
      duration: currentPlaylist.duration,
      isCampaignTimetable: false,
      allDaysStartMinutes: 0,
      allDaysStopMinutes: 0,
      sortOrder: campaign.playlists.length + 1,
      periodStop: new Date(),
      shuffle: false,
      periodStart: new Date(),
      daysType: 'daily' as CampaignDaysType,
      playCounter: 1, //TODO имзенить когда добавят в запрос
      days: [],
      files: currentPlaylist.files,
      projectPlaylistId: currentPlaylist.id,
      projectPlaylist: currentPlaylist
    }

    //@ts-ignore
    storeCampaignPlaylist(playlistForCompany)
    setOptions([])
    setInputValue('')
    setPlaylistName(currentPlaylist.name)
    setCurrentPlaylist(undefined)

    messanger.dispatch({
      message: t("pages.campaign.edit.fields.content.playlist.table.snackbar.addPlaylist", { name: playlistName }),
      type: "success",
    });

  }

  const onSelectHandler = (_: any, value: PlaylistsResponseType) => {
    setCurrentPlaylist(value);
  };

  const onInputValueHandler = (_: any, value: string,) => {
    setCurrentPlaylist(undefined);
    setInputValue(value);
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    fromEvent<InputEvent>(inputRef.current, "input")
      .pipe(
        debounceTime(500),
        tap(() => setIsLoadingAutocomplete(true)),
        map(({ target }) => {
          return {
            name: (target as HTMLInputElement).value
          };
        }),
        filter((searchParam) => searchParam.name.length >= 3),
        switchMap(async ({ name }) => {
          try {
            return await projectPlaylistService().getPlaylistsByName(name, Number(project));
          } catch (error) {
            return undefined;
          }
        }),
        filter((response) => !!response),
        tap(() => setIsLoadingAutocomplete(false))
      ).subscribe((response) => {
      if (!response) {
        setOptions([]);
        return
      }

      setOptions(response);
    })
  }, [project]);

  if (!campaign) {
    return <></>
  }

  return (
    <Grid container alignItems="center">
      <Grid item xs={3.5}>
        <Autocomplete
          id="controllable-campaign-playlist"
          key="controllable-campaign-playlist-key"
          inputValue={inputValue}
          onInputChange={onInputValueHandler}
          onChange={onSelectHandler}
          options={options}
          fullWidth
          freeSolo
          loading={isLoadingAutocomplete}
          filterOptions={(option) => option.filter(({ id }) => !campaign?.playlists.some(playlist => playlist.id === id))}
          clearIcon={false}
          noOptionsText={t("pages.campaign.edit.fields.content.playlist.noOptions")}
          getOptionLabel={(option: { name: string, id: string }) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              ref={inputRef}
              variant='standard'
              placeholder={t("pages.campaign.edit.fields.content.playlist.title")}
            />)}
        />
      </Grid>
      <Grid item xs={3.5} sx={{ ml: "60px" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ maxWidth: "371px" }}>
          <Button
            sx={{ minWidth: "155px" }}
            variant="outlined"
            onClick={addPlaylistHandle}
            disabled={!(!!currentPlaylist)}
          >
            {t("pages.campaign.edit.fields.content.playlist.buttons.add")}
          </Button>
          <Button
            sx={{ minWidth: "200px" }}
            variant="outlined"
            onClick={() => setNewPlaylist(campaign.id, campaign.playlists.length + 1)}
          >
            {t("pages.campaign.edit.fields.content.playlist.buttons.create")}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default CampaignPlayListContent