"use client";
import { RightArrow } from "@/assets/icons/Arrow";
import Edit from "@/assets/icons/Edit";
import More from "@/assets/icons/More";
import Time from "@/assets/icons/Time";
import {
  Avatar,
  Box,
  Chip,
  Dropdown,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Stack,
  Switch,
  Tooltip,
  Typography,
  sheetClasses,
  switchClasses,
} from "@mui/joy";
import { redirect } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ILoginData } from "@/types";
import Help from "@/assets/icons/Help";
import Warning from "@/assets/icons/Warning";

function UserDetails() {
  const router = useRouter();
  const [loginData, setLogingData] = useState<ILoginData>();

  useLayoutEffect(() => {
    const localStoage = localStorage.getItem("loginData");
    const userData: ILoginData = JSON.parse(localStoage as string);
    setLogingData(userData);
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="solid"
          color="primary"
          size="sm"
          //   src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F1988458%2Fdummy_human_mannequin_user_account_blank_face_profile_icon&psig=AOvVaw0CFJyPt85XHQBq86zUFKoW&ust=1717955858314000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCu6rzKzIYDFQAAAAAdAAAAABAJ"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{`${loginData?.firstName} ${loginData?.lastName}`}</Typography>
          <Typography level="body-xs">{loginData?.email}</Typography>
        </Box>
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <More />
          </MenuButton>
          <Menu placement="top-start" sx={{ p: 0 }}>
            <Sheet variant="soft" sx={{ width: 320, p: 2, borderRadius: "sm" }}>
              <Typography
                level="h3"
                fontSize="xl2"
                fontWeight="xl"
                id="ios-example-demo"
                mb={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Profile
                <Tooltip
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: 320,
                        justifyContent: "center",
                        p: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItem: "center",
                          gap: "15px",
                          width: "100%",
                        }}
                      >
                        <Warning />
                        <div>
                          <Typography fontWeight="lg" fontSize="sm">
                            You need to contact your administrator activate this
                            account.
                          </Typography>
                        </div>
                      </Box>
                    </Box>
                  }
                  arrow
                  color="danger"
                  variant="soft"
                >
                  <Chip
                    color="danger"
                    variant="soft"
                    onClick={function () {}}
                    size="md"
                  >
                    Inactive
                  </Chip>
                </Tooltip>
              </Typography>
              <List
                aria-labelledby="ios-example-demo"
                sx={(theme) => ({
                  "& ul": {
                    "--List-gap": "0px",
                    bgcolor: "background.surface",
                    '& > li:first-child > [role="button"]': {
                      borderTopRightRadius: "var(--List-radius)",
                      borderTopLeftRadius: "var(--List-radius)",
                    },
                    '& > li:last-child > [role="button"]': {
                      borderBottomRightRadius: "var(--List-radius)",
                      borderBottomLeftRadius: "var(--List-radius)",
                    },
                  },
                  "--List-radius": "8px",
                  "--List-gap": "1rem",
                  "--ListDivider-gap": "0px",
                  "--ListItem-paddingY": "0.5rem",
                  // override global variant tokens
                  "--joy-palette-neutral-plainHoverBg": "rgba(0 0 0 / 0.08)",
                  "--joy-palette-neutral-plainActiveBg": "rgba(0 0 0 / 0.12)",
                  [theme.getColorSchemeSelector("light")]: {
                    "--joy-palette-divider": "rgba(0 0 0 / 0.08)",
                  },
                  [theme.getColorSchemeSelector("dark")]: {
                    "--joy-palette-neutral-plainHoverBg":
                      "rgba(255 255 255 / 0.1)",
                    "--joy-palette-neutral-plainActiveBg":
                      "rgba(255 255 255 / 0.16)",
                  },
                })}
              >
                <ListItem nested>
                  <List
                    aria-label="Personal info"
                    sx={{ "--ListItemDecorator-size": "72px" }}
                  >
                    <ListItem>
                      <ListItemDecorator>
                        <Avatar size="lg" sx={{ "--Avatar-size": "60px" }}>
                          JD
                        </Avatar>
                      </ListItemDecorator>
                      <div>
                        <Typography fontSize="xl">{`${loginData?.firstName} ${loginData?.lastName}`}</Typography>
                        <Typography fontSize="xs">
                          {loginData?.email}
                        </Typography>
                      </div>
                    </ListItem>
                    <ListDivider inset="startContent" />
                    <ListItem>
                      <ListItemButton onClick={() => router.push("/profile")}>
                        <ListItemContent>View your profile</ListItemContent>
                        <RightArrow />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem nested>
                  <ListItem
                    sx={{
                      bgcolor: "background.surface",
                      mb: 1,
                      borderRadius: "var(--List-radius)",
                    }}
                  >
                    <ListItemButton
                      aria-describedby="apple-tv-description"
                      sx={{
                        borderRadius: "var(--List-radius)",
                        pointerEvents: "none",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <IconButton size="sm" variant="soft" color="success">
                          <Time />
                        </IconButton>
                        Time Tracked
                      </Typography>

                      <Typography
                        sx={{
                          color: "green",
                          fontSize: "18px",
                          fontWeight: 600,
                        }}
                      >
                        02:03:25
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <Typography
                    id="apple-tv-description"
                    level="body-xs"
                    aria-hidden
                  >
                    Your total working hours will be tracked here...
                  </Typography>
                </ListItem>
                <ListItem nested>
                  <List
                    aria-label="Network"
                    sx={{
                      [`& .${sheetClasses.root}`]: {
                        p: 0.5,
                        lineHeight: 0,
                        borderRadius: "sm",
                      },
                    }}
                  >
                    <ListItem>
                      <ListItemDecorator>
                        <Sheet variant="solid" color="success"></Sheet>
                      </ListItemDecorator>
                      <ListItemContent component="label">
                        Status
                      </ListItemContent>
                      <Switch
                        id="airplane-mode"
                        size="md"
                        checked
                        color="success"
                        // endDecorator={
                        //   <Chip
                        //     color="success"
                        //     onClick={function () {}}
                        //     size="sm"
                        //   >
                        //     Working
                        //   </Chip>
                        // }
                        sx={(theme) => ({
                          display: "inherit",
                          "--Switch-thumbShadow": `0 0 0 1px ${theme.vars.palette.background.level3}, 0 1px 4px 0 rgb(0 0 0 / 0.3), 0 1px 2px 0px rgb(0 0 0 / 0.3)`,
                          "--Switch-thumbSize": "18px",
                          "--Switch-trackWidth": "36px",
                          "--Switch-trackHeight": "14px",
                          "--Switch-trackBackground": "#E9E9EA",
                          "&:hover": {
                            "--Switch-trackBackground": "#E9E9EA",
                          },
                          [theme.getColorSchemeSelector("dark")]: {
                            "--Switch-trackBackground":
                              "rgba(255 255 255 / 0.4)",
                          },
                          [`&.${switchClasses.checked}`]: {
                            "--Switch-trackBackground": "#65C466",
                            "&:hover": {
                              "--Switch-trackBackground": "#65C466",
                            },
                          },
                        })}
                      />
                    </ListItem>
                    <ListDivider inset="startContent" />
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          localStorage.removeItem("loginData");
                          router.push("/auth/login");
                        }}
                      >
                        <ListItemDecorator>
                          <Sheet variant="solid" color="warning"></Sheet>
                        </ListItemDecorator>
                        <ListItemContent>Logout</ListItemContent>
                        <RightArrow />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </ListItem>
              </List>
            </Sheet>
          </Menu>
        </Dropdown>
      </Box>
    </>
  );
}

export default UserDetails;
