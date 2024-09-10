"use client";
import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { Button, Option, Select, TabPanel, selectClasses } from "@mui/joy";
import ActiveLeadManagement from "./active";
import Add from "@/assets/icons/Add";
import { DownArrow } from "@/assets/icons/Arrow";
import Filter from "@/assets/icons/Filter";
import LeadAction from "./lead-action";
import Inactive from "./in-active";

export default function LeadManagement() {
  return (
    <Box sx={{ flex: 1 }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -50, md: -55, sx: -110 },
          bgcolor: "background.body",
        }}
      >
        <Box sx={{ px: { xs: 2, md: 2 } }}>
          <Typography level="h2" component="h1" sx={{ pt: 1, mb: 2 }}>
            Leads Management
          </Typography>
        </Box>
        <Box
          sx={{
            m: 2,
            p: 2,
            borderRadius: "md",
            display: "flex",
            textAlign: "end",
            justifyContent: "end",
            alignItems: "flex-end",
            background: "#fb923c1a",
            border: "1px solid #fb923c5c",
            gap: 2,
          }}
        >
          {" "}
          <Select
            placeholder="Filter"
            indicator={<Filter />}
            variant="solid"
            color="primary"
            size="md"
            sx={{
              width: 230,
              // [`& .${selectClasses.indicator}`]: {
              //   transition: "0.2s",
              //   [`&.${selectClasses.expanded}`]: {
              //     transform: "rotate(-180deg)",
              //   },
              // },
            }}
          >
            <Option value="dog">All</Option>
            <Option value="cat">New</Option>
            <Option value="fish">Featured</Option>
            <Option value="bird">Archived</Option>
          </Select>
          {/* <Button startDecorator={<Add />}>Add Lead</Button> */}
          <LeadAction />
        </Box>
        <Tabs
          defaultValue={0}
          sx={{
            bgcolor: "transparent",
          }}
        >
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: "left",
              [`&& .${tabClasses.root}`]: {
                fontWeight: "600",
                flex: "initial",
                color: "text.tertiary",
                [`&.${tabClasses.selected}`]: {
                  bgcolor: "transparent",
                  color: "text.primary",
                  "&::after": {
                    height: "2px",
                    bgcolor: "primary.500",
                  },
                },
              },
            }}
          >
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              Active
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={1}>
              Inactive
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={2}>
              Pending
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={3}>
              Billing
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <ActiveLeadManagement />
          </TabPanel>
          <TabPanel value={1}>
            <Inactive />
          </TabPanel>
          <TabPanel value={2}>
            <ActiveLeadManagement />
          </TabPanel>
          <TabPanel value={3}>
            <ActiveLeadManagement />
          </TabPanel>
          <TabPanel value={4}>
            <ActiveLeadManagement />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
}
