import { Box, Button, Drawer, Tab, Tabs } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { MenuIcon } from "@heroicons/react/solid";

function a11yProps(index : number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function Sidebar({ users }: { users: string[] }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <MenuIcon
        className="absolute w-16 h-16 right-5 top-5"
        onClick={() => setVisible(true)}
      />
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
          <Tabs aria-label="basic tabs example">
            <Tab label="Item One" {...a11yProps(0)}/>
            <Tab label="Item Two" {...a11yProps(1)}/>
            <Tab label="Item Three" {...a11yProps(2)}/>
          </Tabs>
        </Box>
        <TabPanel index={0}>Item One</TabPanel>
        <TabPanel index={1}>Item Two</TabPanel>
        <TabPanel index={2}>Item Three</TabPanel>
      </Drawer>
    </>
  );
}

type TabPanelProps = {
  index: number;
};

const TabPanel: React.FC<TabPanelProps> = ({ children, index }) => {
  return <>{children}</>;
};
