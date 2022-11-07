import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Paper, Tab, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useCampaignEditContext } from "context/CampaignEditContext/useCampaignEditContext";
import { Tabs } from "context/CampaignPlaylistEditContext/interface";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { distinctUntilChanged, distinctUntilKeyChanged } from "rxjs";
import Clips from "./Clips";
import Schedule from "./Schedule";
import Tracks from "./Tracks";

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
const EditPlaylist: FC = () => {
  const { t } = useTranslation();

  const { availableTabs } = useCampaignPlaylistEditContext(
    distinctUntilKeyChanged("availableTabs")
  );

  const { storeCampaignPlaylist } = useCampaignEditContext(
    distinctUntilChanged(() => true)
  );

  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.tracks);

  const changeCurrentTab = (_: any, newValue: Tabs) => {
    setCurrentTab(newValue);
  };

  return (
    <StyledWrapper>
      <TabContext value={currentTab}>
        <StyledTabsWrapper>
          <TabList onChange={changeCurrentTab}>
            {Object.keys(Tabs).map((tabName) => (
              <StyledTab
                label={
                  <Box sx={{ textTransform: "capitalize" }}>
                    {t(`edit-campaign-playlist.tabs.${tabName}`)}
                  </Box>
                }
                value={tabName}
                key={tabName}
                disabled={availableTabs.every((tab) => tab !== tabName)}
              />
            ))}
          </TabList>
        </StyledTabsWrapper>
        <StyledTabPanel value={Tabs.tracks} key={Tabs.tracks}>
          <StyledPaper>
            <Tracks storePlaylist={storeCampaignPlaylist} setTab={setCurrentTab} />
          </StyledPaper>
        </StyledTabPanel>
        <StyledTabPanel value={Tabs.schedule} key={Tabs.schedule}>
          <StyledPaper>
            <Schedule storePlaylist={storeCampaignPlaylist} />
          </StyledPaper>
        </StyledTabPanel>
        <StyledTabPanel value={Tabs.clips} key={Tabs.clips}>
          <StyledPaper>
            <Clips />
          </StyledPaper>
        </StyledTabPanel>
      </TabContext>
    </StyledWrapper>
  );
};

export default memo(EditPlaylist);
