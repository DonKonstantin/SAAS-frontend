import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Paper, Tab } from "@mui/material";
import { styled } from "@mui/system";
import { useCampaignPlaylistEditContext } from "context/CampaignPlaylistEditContext/useCampaignPlaylistEditContext";
import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import Clips from "./Clips";
import Schedule from "./Schedule";
import Tracks from "./Tracks";

interface Props {}

const StyledWrapper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "#FBFDFC",
  padding: "30px 36px",
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

enum Tabs {
  "tracks" = "tracks",
  "schedule" = "schedule",
  "clips" = "clips",
}

const EditPlaylist: FC<Props> = ({}) => {
  const { t } = useTranslation();

  const { isTabsAvailable } = useCampaignPlaylistEditContext();

  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.tracks);

  const changeCurrentTab = (_: any, newValue: Tabs) => {
    setCurrentTab(newValue);
  };

  return (
    <StyledWrapper>
      <TabContext value={currentTab}>
        <StyledTabsWrapper>
          <TabList onChange={changeCurrentTab} aria-label={"campaign-create"}>
            {Object.keys(Tabs).map((permission) => (
              <Tab
                sx={{ minHeight: "51px", minWidth: "168px" }}
                label={t(`pages.campaign.edit-playlist.tabs.${permission}`)}
                value={permission}
                key={permission}
                disabled={!isTabsAvailable && permission !== "tracks"}
              />
            ))}
          </TabList>
        </StyledTabsWrapper>
        <StyledTabPanel value={Tabs.tracks} key={Tabs.tracks} sx={{ p: 0 }}>
          <StyledPaper>
            <Tracks />
          </StyledPaper>
        </StyledTabPanel>
        <StyledTabPanel value={Tabs.schedule} key={Tabs.schedule} sx={{ p: 0 }}>
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
