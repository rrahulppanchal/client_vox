"use client";

import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Card,
  Chip,
  Divider,
  Dropdown,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Stack,
  Step,
  StepIndicator,
  Stepper,
  Typography,
} from "@mui/joy";
import { Grid, useColorScheme } from "@mui/material";
import More from "@/assets/icons/More";
import Edit from "@/assets/icons/Edit";
import Delete from "@/assets/icons/Delete";
import Comment from "./comment";
import React, { SetStateAction } from "react";
import { useContact } from "@/services/contact.service";
import dayjs from "dayjs";

export default function Page({ params }: { params: { id: string } }) {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const { mode } = useColorScheme();

  const contactData = useContact(params.id);

  console.log(contactData);

  return (
    <Box sx={{ flex: 1 }}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={9}
          sx={{ display: "flex", flexDirection: "column", maxHeight: "100vh" }}
        >
          <Box
            sx={{
              px: { xs: 2, md: 2 },
              background: mode === "dark" ? "#0b0d0e" : "#fbfcfe",
              borderBottom:
                mode === "dark"
                  ? "1px solid var(--mui-palette-grey-900)"
                  : "1px solid var(--mui-palette-grey-300)",
            }}
          >
            <Typography level="h3" component="h3" sx={{ pt: 1, mb: 1 }}>
              {(contactData?.data as any)?.firstName}{" "}
              {(contactData?.data as any)?.lastName} -{" "}
              {(contactData?.data as any)?.addressNote},{" "}
              {(contactData?.data as any)?.city}
            </Typography>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" />}
              spacing={2}
              justifyContent="start"
              marginBottom={2}
            >
              <Typography level="body-sm" sx={{ mb: 2 }}>
                <strong>Created</strong> -{" "}
                {dayjs((contactData?.data as any)?.createdAt).format(
                  "ddd DD MMMM YYYY"
                )}
              </Typography>
              <Typography level="body-sm" sx={{ mb: 2 }}>
                <strong>Last Updated</strong> -{" "}
                {dayjs((contactData?.data as any)?.updatedAt).format(
                  "ddd DD MMMM YYYY"
                )}
              </Typography>
              <Typography level="body-sm" sx={{ mb: 2 }}>
                <strong>Follow up</strong> -{" "}
                {dayjs((contactData?.data as any)?.updatedAt).format(
                  "ddd DD MMMM YYYY"
                )}
              </Typography>
            </Stack>
          </Box>
          <Sheet
            sx={{
              overflow: "auto",
              flexGrow: 1,
            }}
          >
            <Box sx={{ p: 3, paddingLeft: 10, paddingRight: 10 }}>
              <Stepper orientation="vertical">
                {(contactData?.data as any)?.logs?.length > 0 &&
                  (contactData?.data as any)?.logs?.map(
                    (data: any, index: number) => (
                      <Step
                        key={index}
                        indicator={
                          <StepIndicator
                            variant="solid"
                            color={
                              (contactData?.data as any)?.logs?.length - 1 ==
                                index
                                ? "primary"
                                : "neutral"
                            }
                          >
                            {index + 1}
                          </StepIndicator>
                        }
                      >
                        <Stack
                          direction="row"
                          alignItems="end"
                          justifyContent="space-between"
                          spacing={2}
                        >
                          <Typography level="body-md">{data.title}</Typography>
                          <Typography level="body-xs">
                            {dayjs(data.createdAt).format("ddd DD MMMM YYYY")}
                          </Typography>
                        </Stack>

                        <Stack spacing={1}>
                          <Typography level="body-sm">
                            {data.description}
                          </Typography>
                          {(contactData?.data as any)?.logs?.length - 1 ==
                            index && (
                              <Dropdown>
                                <MenuButton
                                  slots={{ root: Chip }}
                                  slotProps={{
                                    root: {
                                      variant: "outlined",
                                      color: "neutral",
                                    },
                                  }}
                                >
                                  More
                                </MenuButton>
                                <Menu
                                  placement="bottom-end"
                                  variant="outlined"
                                  color="neutral"
                                >
                                  <MenuItem
                                    onClick={(e) => {
                                      // setCurentUser(row as IUser);
                                      // setMoreOpen(true);
                                    }}
                                  >
                                    <ListItemDecorator sx={{ color: "inherit" }}>
                                      {/* <Users /> */}
                                    </ListItemDecorator>
                                    About
                                  </MenuItem>
                                  <MenuItem onClick={() => setModalOpen(true)}>
                                    <ListItemDecorator>
                                      <Edit />
                                    </ListItemDecorator>
                                    Edit
                                  </MenuItem>
                                  <ListDivider />
                                  <MenuItem variant="plain" color="danger">
                                    <ListItemDecorator sx={{ color: "inherit" }}>
                                      <Delete />
                                    </ListItemDecorator>
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </Dropdown>
                            )}
                        </Stack>
                      </Step>
                    )
                  )}
              </Stepper>
            </Box>
          </Sheet>
        </Grid>
        <Grid item xs={3}>
          <Card
            sx={{
              borderRadius: 0,
              height: "100vh",
              border: "none",
              borderLeft:
                mode === "dark"
                  ? "1px solid var(--mui-palette-grey-900)"
                  : "1px solid var(--mui-palette-grey-300)",
            }}
          >
            <Grid>
              {" "}
              <Typography level="title-lg">Actions</Typography>
            </Grid>
            <Grid>
              <FormControl id="free-solo-demo">
                <FormLabel>Status</FormLabel>
                <Autocomplete
                  freeSolo
                  variant="soft"
                  placeholder="Status"
                  name="assignee"
                  // value={
                  //   formik.values.assignee &&
                  //   assigneeOptions?.find(
                  //     (i) => i.value === formik.values.assignee
                  //   )
                  // }
                  disabled
                  value={{ label: "active", value: 1 }}
                  options={[]}
                  onChange={(e, value) => {
                    // formik.setFieldValue("assignee", (value as any)?.value);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl id="free-solo-demo">
                <FormLabel>Change assignee</FormLabel>
                <Autocomplete
                  freeSolo
                  variant="soft"
                  disabled
                  placeholder="Search to assign"
                  name="assignee"
                  // value={
                  //   formik.values.assignee &&
                  //   assigneeOptions?.find(
                  //     (i) => i.value === formik.values.assignee
                  //   )
                  // }
                  value={{ label: "john doe", value: 1 }}
                  options={[]}
                  onChange={(e, value) => {
                    // formik.setFieldValue("assignee", (value as any)?.value);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl id=" ">
                <FormLabel>Name</FormLabel>
                <Input value="John Doe" variant="soft" disabled />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl id=" ">
                <FormLabel>Email</FormLabel>
                <Input value="johndoe@email.com" variant="soft" disabled />
              </FormControl>
            </Grid>

            <Grid>
              <FormControl id="free-solo-demo">
                <FormControl id=" ">
                  <FormLabel>Phone</FormLabel>
                  <Input value="+91 9856898956" variant="soft" disabled />
                </FormControl>
              </FormControl>
            </Grid>
            <Grid textAlign="end" marginTop={1}>
              <Button variant="soft" color="neutral">
                Save details
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Comment
        isModalOpen={isModalOpen}
        setModalOpen={function (value: SetStateAction<boolean>): void {
          setModalOpen(value);
        }}
      />
    </Box>
  );
}
