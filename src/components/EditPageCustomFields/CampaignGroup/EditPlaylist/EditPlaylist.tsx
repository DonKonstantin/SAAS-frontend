import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Paper, Tab } from "@mui/material";
import { styled } from "@mui/system";
import { Tabs } from "context/CampaignPlaylistEditContext/interface";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import React, { FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CampaignPlaylistConnect } from "services/campaignListService/types";
import Clips from "./Clips";
import Schedule from "./Schedule";
import Tracks, { playlistType } from "./Tracks";

interface Props {
  storePlaylist: (id: string, type: playlistType) => void;
  // playlist: CampaignPlaylistConnect;
}

const StyledWrapper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "#FBFDFC",
  padding: "30px 36px",
  zIndex: 1100
});

const StyledTabsWrapper = styled("div")({
  backgroundColor: "#F5F5F5",
  marginBottom: "13px",
});

const StyledPaper = styled(Paper)({
  padding: "30px 40px",
  border: '1px solid #E5E5E5'
});

StyledPaper.defaultProps = {
  elevation: 0
};

const StyledTabPanel = styled(TabPanel)({
  padding: 0,
});

const EditPlaylist: FC<Props> = ({  storePlaylist }) => {
  const { t } = useTranslation();

  const { playlist, availableTabs, setPlaylist, setAvailableTabs } = useCampaignPlaylistEditContext();

  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.tracks);

  const changeCurrentTab = (_: any, newValue: Tabs) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    // setPlaylist(playlist);

    if (
      !!playlist?.projectPlaylist?.files.length ||
      !!playlist?.campaignPlaylist?.files.length
    ) {
      return
    }

    setAvailableTabs([Tabs.tracks, Tabs.clips]);

    setCurrentTab(Tabs.clips);
  }, []);

  return (
    <StyledWrapper>
      <TabContext value={currentTab}>
        <StyledTabsWrapper>
          <TabList onChange={changeCurrentTab} aria-label={"campaign-create"}>
            {Object.keys(Tabs).map((tabName) => (
              <Tab
                sx={{ minHeight: "51px", minWidth: "168px" }}
                label={t(`edit-campaign-playlist.tabs.${tabName}`)}
                value={tabName}
                key={tabName}
                // disabled={availableTabs.every(tab => tab !== tabName)}
              />
            ))}
          </TabList>
        </StyledTabsWrapper>
        <StyledTabPanel value={Tabs.schedule} key={Tabs.tracks} sx={{ p: 0 }}>
          <StyledPaper>
            <Tracks storePlaylist={() => {}} setTab={setCurrentTab}/>
          </StyledPaper>
        </StyledTabPanel>
        <StyledTabPanel value={Tabs.tracks} key={Tabs.schedule} sx={{ p: 0 }}>
          <StyledPaper>
            <Schedule />
          </StyledPaper>
        </StyledTabPanel>
        <StyledTabPanel value={Tabs.clips} key={Tabs.clips} sx={{ p: 0 }}>
          <StyledPaper>
            <Clips />
          </StyledPaper>
        </StyledTabPanel>
      </TabContext>
    </StyledWrapper>
  );
};

export default memo(EditPlaylist);
