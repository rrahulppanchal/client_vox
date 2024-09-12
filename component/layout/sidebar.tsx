"use client";
import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import { closeSidebar } from "@/utility/layout";
import { sidebar_data } from "./sidebar-data";

import { usePathname } from "next/navigation";
import ColorSchemeToggle from "../theme/toggle";
import Org from "@/assets/icons/Org";
import More from "@/assets/icons/More";
import { useRouter } from "next/navigation";
import Sun from "@/assets/icons/Sun";
import { DownArrow, RightArrow, UpArrow } from "@/assets/icons/Arrow";
import UserDetails from "./user-details";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Badge,
  accordionClasses,
  accordionDetailsClasses,
  accordionSummaryClasses,
} from "@mui/joy";
import Bell from "@/assets/icons/Bell";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sheet
      className="Sidebar"
      sx={{
        zIndex: { xs: 9999, md: 9 },
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        height: "100vh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <IconButton variant="soft" color="success" size="sm">
            <Org />
          </IconButton>
          <Typography level="title-lg">VoxQ Co.</Typography>
        </Box>

        <Badge badgeContent="" color="danger" size="sm">
          <IconButton
            variant="soft"
            color="neutral"
            size="sm"
          >
            <Bell />
          </IconButton>
        </Badge>
        {/* <ColorSchemeToggle /> */}
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem sx={{ padding: " 0.25rem 0 0.25rem 0" }}>
            <AccordionGroup
              variant="outlined"
              transition="0.2s"
              sx={{
                maxWidth: 400,
                height: "100%",
                overflow: "auto",
                borderRadius: "sm",
                [`& .${accordionSummaryClasses.button}:hover`]: {
                  bgcolor: "transparent",
                  borderRadius: "sm",
                },
                [`& .${accordionDetailsClasses.content}`]: {
                  boxShadow: (theme) =>
                    `inset 0 1px ${theme.vars.palette.divider}`,
                  [`&.${accordionDetailsClasses.expanded}`]: {
                    padding: " 0.5rem 0 0.5rem 0",
                  },
                },
              }}
            >
              <Accordion defaultExpanded>
                <AccordionSummary>Quick Links</AccordionSummary>
                <AccordionDetails variant="plain">
                  <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    sx={{
                      display: "flex",
                      alignItem: "center",
                      justifyContent: "space-between",
                      borderRadius: "0",
                    }}
                  >
                    <span>Add Lead</span>
                    <RightArrow />
                  </Button>
                  <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    sx={{
                      display: "flex",
                      alignItem: "center",
                      justifyContent: "space-between",
                      mt: 1,
                      borderRadius: "0",
                    }}
                  >
                    <span>Add Contact</span>
                    <RightArrow />
                  </Button>
                  <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    sx={{
                      display: "flex",
                      alignItem: "center",
                      justifyContent: "space-between",
                      mt: 1,
                      borderRadius: "0",
                    }}
                  >
                    <span>Change Log</span>
                    <RightArrow />
                  </Button>
                </AccordionDetails>
              </Accordion>
            </AccordionGroup>
          </ListItem>
          {sidebar_data.map((data, index) =>
            data?.item.length ? (
              <ListItem key={index} nested>
                <Toggler
                  defaultExpanded={
                    pathname.indexOf(data.redirect) !== -1 ? true : false
                  }
                  renderToggle={({ open, setOpen }) => (
                    <ListItemButton
                      selected={pathname === data.redirect ? true : false}
                      onClick={() => setOpen(!open)}
                    >
                      <data.icon />
                      <ListItemContent
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography level="title-sm">
                          {data.display_name}
                        </Typography>
                        {open ? <UpArrow /> : <DownArrow />}
                      </ListItemContent>
                    </ListItemButton>
                  )}
                >
                  <List sx={{ gap: 0.5 }}>
                    {data.item.map((data, index) => (
                      <ListItem sx={{ mt: 0.5 }} key={index}>
                        <ListItemButton
                          selected={pathname === data.redirect ? true : false}
                        >
                          <data.icon />
                          <ListItemContent
                            onClick={() => router.push(data.redirect)}
                          >
                            <Typography level="title-sm">
                              {data.display_name}
                            </Typography>
                          </ListItemContent>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Toggler>
              </ListItem>
            ) : (
              <>
                <ListItem key={index}>
                  <ListItemButton
                    selected={pathname === data.redirect ? true : false}
                  >
                    {/* <Sun /> */}
                    <data.icon />
                    <ListItemContent>
                      <Typography
                        level="title-sm"
                        onClick={() => router.push(data.redirect)}
                      >
                        {data.display_name}
                      </Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </>
            )
          )}
        </List>

        {/* <Card
          invertedColors
          variant="soft"
          color="warning"
          size="sm"
          sx={{ boxShadow: "none" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography level="title-sm">Used space</Typography>
            <IconButton size="sm">  <CloseRoundedIcon />  </IconButton>
          </Stack>
          <Typography level="body-xs">
            Your team has used 80% of your available space. Need more?
          </Typography>
          <LinearProgress
            variant="outlined"
            value={80}
            determinate
            sx={{ my: 1 }}
          />
          <Button size="sm" variant="solid">
            Upgrade plan
          </Button>
        </Card> */}
      </Box>

      <Divider />
      <UserDetails />
    </Sheet>
  );
}
