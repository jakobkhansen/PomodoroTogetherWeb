import { Box, Button, Drawer, Tab, Tabs } from "@mui/material";
import React, { ReactNode, useContext, useState } from "react";
import { MenuIcon } from "@heroicons/react/solid";
import { TabPanel, TabPanelProps } from "./TabPanel";
import { ThemeContext } from "utils/ThemeContext";
import { useTheme } from "@emotion/react";
import { Theme } from "@mui/system";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type SidebarProps = {
  children: React.ReactElement<TabPanelProps>[];
};

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const theme = useTheme()
  console.log(theme)

  return (
    <>
      <button onClick={() => setVisible(true)}>
        <MenuIcon
          className="absolute w-16 h-16 right-5 top-5 fill-slate-400"
          onClick={() => setVisible(true)}
        />
      </button>
      <Drawer
        open={visible}
        anchor="right"
        hideBackdrop={false}
        BackdropProps={{
          invisible: true,
        }}
        onClose={() => setVisible(false)}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            sx={{
              bgcolor: 'background.default',
              color: 'text-primary'
            }}
            value={activeTab}
            onChange={(event, value) => setActiveTab(value)}
          >
            <Tab label="User list" {...a11yProps(0)} />
            <Tab label="Session" {...a11yProps(1)} />
            <Tab label="Settings" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {children.filter((child) => child.props.index === activeTab)}
      </Drawer>
    </>
  );
};
