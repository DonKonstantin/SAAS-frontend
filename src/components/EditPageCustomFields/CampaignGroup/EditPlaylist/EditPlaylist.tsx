import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, Paper, Tab} from "@mui/material";
import {styled} from "@mui/system";
import {useCampaignEditContext} from "context/CampaignEditContext/useCampaignEditContext";
import {Tabs} from "context/CampaignPlaylistEditContext/interface";
import {useCampaignPlaylistEditContext} from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import React, {FC, memo, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {distinctUntilChanged} from "rxjs";
import Clips from "./Clips";
import Schedule from "./Schedule";
import Tracks from "./Tracks";
import LoadingBlurEffect from "../CommonComponents/LoadingBlurEffect/LoadingBlurEffect";
import {isEqual} from "lodash";

const StyledWrapper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "#FBFDFC",
  padding: "30px 36px",
  zIndex: 1100,
});

const StyledTabsWrapper = styled("div")({
  backgroundColor: "#F5F5F5",
  marginBottom: "13px",
});

const StyledPaper = styled(Paper)({
  padding: "30px 40px",
  border: "1px solid #E5E5E5",
});

StyledPaper.defaultProps = {
  elevation: 0,
};

const StyledTabPanel = styled(TabPanel)({
  padding: 0,
});

const StyledTab = styled(Tab)({
  minHeight: "51px",
  minWidth: "168px",
});

/**
 * Копонент редактирования\добавления плэйлиста на странице редактирования кампании
 * @returns
 */

type Props = {
  onSubmitCampaign(): void
}

const EditPlaylist: FC<Props> = ({ onSubmitCampaign }) => {
  const { t } = useTranslation();

  const { setPlaylist } = useCampaignPlaylistEditContext();

  const { playlist, isLoading, availableTabs, setAvailableTabs } = useCampaignPlaylistEditContext(
    distinctUntilChanged(
      (prev, curr) =>
        prev.isLoading === curr.isLoading &&
        isEqual(prev.playlist, curr.playlist)
    )
  );

  const { storeCampaignPlaylist } = useCampaignEditContext(
    distinctUntilChanged(() => true)
  );

  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.tracks);

  const changeCurrentTab = (_: any, newValue: Tabs) => {
    setCurrentTab(newValue);
  };


  let availableTabsList = Object.values(Tabs)

  if (playlist?.projectPlaylistId) {
    availableTabsList = availableTabsList.filter(tab => tab !== "clips")
  }

  useEffect(() => {
    if (!playlist) {
      return
    }

    if (playlist.campaignPlaylistId || playlist.projectPlaylistId) {
      setAvailableTabs(Object.values(Tabs))
    }

  }, [playlist])

  //при клике "Назад" возвращает к страницу кампании
  useEffect(() => {
    const onBack = (e) => {
      e.preventDefault()
      setPlaylist(undefined)
      window.history.forward()
    }

    window.addEventListener('popstate', onBack)

    return(()=>{
      window.removeEventListener('popstate', onBack)
    })
  }, [])

  return (
    <StyledWrapper>
      <TabContext value={currentTab}>
        <StyledTabsWrapper>
          <TabList onChange={changeCurrentTab}>
            {availableTabsList.map(tabName => (
              <StyledTab
                label={
                  <Box sx={{ textTransform: "capitalize" }}>
                    {t(`edit-campaign-playlist.tabs.${tabName}`)}
                  </Box>
                }
                value={tabName}
                key={tabName}
                disabled={!availableTabs.includes(tabName)}
              />
            ))}
          </TabList>
        </StyledTabsWrapper>
        <StyledTabPanel value={Tabs.tracks} key={Tabs.tracks}>
          <StyledPaper>
            <Tracks storePlaylist={storeCampaignPlaylist} setTab={setCurrentTab} onSubmitCampaign={onSubmitCampaign}/>
          </StyledPaper>
        </StyledTabPanel>
        <StyledTabPanel value={Tabs.schedule} key={Tabs.schedule}>
          <StyledPaper>
            <Schedule storePlaylist={storeCampaignPlaylist} onSubmitCampaign={onSubmitCampaign}/>
          </StyledPaper>
        </StyledTabPanel>
        <StyledTabPanel value={Tabs.clips} key={Tabs.clips}>
          <StyledPaper>
            <LoadingBlurEffect isLoading={isLoading}>
              <Clips/>
            </LoadingBlurEffect>
          </StyledPaper>
        </StyledTabPanel>
      </TabContext>
    </StyledWrapper>
  );
};

export default memo(EditPlaylist);
