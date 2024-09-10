"use client";
import * as React from "react";
import Add from "@/assets/icons/Add";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  ChipDelete,
  Divider,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  Menu,
  MenuItem,
  Sheet,
  Snackbar,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tooltip,
  Typography,
  tabClasses,
  useColorScheme,
} from "@mui/joy";
import Inactive from "./in-active";
import Filter from "@/assets/icons/Filter";
import { DownArrow } from "@/assets/icons/Arrow";
import Close from "@/assets/icons/Close";
import ContactTable from "./contact-table";
import ContactActionModal from "./contact-action-modal";
import SingleContactActionModal from "./single-contact-action-modal";
import SearchUser from "@/assets/icons/SearchUser";
import Check from "@/assets/icons/Check";
import { useContacts } from "@/services/contact.service";
import { FilterState } from "@/types";
import { useLoader } from "@/store/loader-context";

const options = ["Add Contact", "Add multiple contacts", "Import contacts"];

const filterInitialState: FilterState = {
  page: 0,
  size: 20,
  search: "",
  contact: false,
  date: {
    lastYear: false,
    lastMonth: false,
    lastWeek: false,
    lastDay: false,
    lastHour: false,
  },
  status: {
    active: false,
    inActive: false,
    followUp: false,
    noAction: false,
    verified: false,
    unVerified: false,
  },
  sortBy: {
    recentlyUpdated: false,
    fresh: false,
    actionRequired: false,
    inQueue: false,
  },
};

export default function ContactManagement() {
  const { mode } = useColorScheme();
  const { setLoading } = useLoader();

  const actionRef = React.useRef<() => void | null>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isModalSingleOpen, setModalSingleOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);
  const [filterField, setFilterField] = React.useState<string[]>([]);
  const [filterState, setFilterState] =
    React.useState<FilterState>(filterInitialState);

  const contactsData = useContacts(filterState);
  console.log(contactsData);
  setLoading(contactsData?.isFetching);

  const handleClick = () => {
    if (options[selectedIndex] === "Add multiple contacts") {
      setModalOpen(true);
    }
    if (options[selectedIndex] === "Add Contact") {
      setModalSingleOpen(true);
    }
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const paginationHandleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    await setFilterState((prevState) => ({
      ...prevState,
      page: value,
    }));
    await contactsData.refetch();
  };

  const handleFilterChange = async (data = value) => {
    setFilterField(data);
    setOpenFilter(false);
    const newDateState = {
      lastHour: data.includes("Last Hour"),
      lastWeek: data.includes("Last Week"),
      lastMonth: data.includes("Last Month"),
      lastDay: data.includes("Last Day"),
      lastYear: data.includes("Last Year"),
    };

    const newStatusState = {
      active: data.includes("Active"),
      inActive: data.includes("In Active"),
      followUp: data.includes("Follow-up"),
      noAction: data.includes("No-action"),
      verified: data.includes("Verified"),
      unVerified: data.includes("Unverified"),
    };

    const newSortByState = {
      recentlyUpdated: data.includes("Recently visited"),
      fresh: data.includes("Fresh"),
      actionRequired: data.includes("Action needed"),
      inQueue: data.includes("In Queue"),
    };

    await setFilterState((prevState) => ({
      ...prevState,
      date: {
        ...prevState.date,
        ...newDateState,
      },
      status: {
        ...prevState.status,
        ...newStatusState,
      },
      sortBy: {
        ...prevState.sortBy,
        ...newSortByState,
      },
    }));
    await contactsData.refetch();
  };

  return (
    <>
      <Sheet>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ px: { xs: 2, md: 2 } }}>
            <Typography level="h2" component="h1" sx={{ pt: 1, mb: 2 }}>
              Contact Management
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              m: 2,
              p: 0,
              borderRadius: "md",
              display: "flex",
              textAlign: "end",
              justifyContent: "end",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Input
              color="neutral"
              variant="outlined"
              placeholder="Search..."
              startDecorator={<SearchUser />}
              value={filterState.search}
              onChange={(e) => {
                setFilterState((prevState) => ({
                  ...prevState,
                  search: e.target.value,
                }));
              }}
              endDecorator={
                <Stack direction="row" gap={2}>
                  {filterState.search?.length > 0 && (
                    <IconButton
                      color="neutral"
                      variant="plain"
                      onClick={async () => {
                        await setFilterState((prevState) => ({
                          ...prevState,
                          search: "",
                        }));
                        await contactsData.refetch();
                      }}
                    >
                      <Close />
                    </IconButton>
                  )}
                  <Button
                    color="neutral"
                    onClick={() => {
                      contactsData.refetch();
                    }}
                  >
                    Search
                  </Button>
                </Stack>
              }
            />
            <IconButton
              color="neutral"
              variant="outlined"
              onClick={() => setOpenFilter(true)}
            >
              <Filter />
            </IconButton>
            <Stack direction="row" spacing={1}>
              <ButtonGroup
                ref={anchorRef}
                variant="solid"
                color="primary"
                aria-label="split button"
              >
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <IconButton
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onMouseDown={() => {
                    // @ts-ignore
                    actionRef.current = () => setOpen(!open);
                  }}
                  onKeyDown={() => {
                    // @ts-ignore
                    actionRef.current = () => setOpen(!open);
                  }}
                  onClick={() => {
                    actionRef.current?.();
                  }}
                >
                  <DownArrow />
                </IconButton>
              </ButtonGroup>
              <Menu
                invertedColors
                color="neutral"
                variant="plain"
                placement="bottom-end"
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef.current}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    disabled={index === 2}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Stack>
          </Box>
          <Box padding={2} paddingTop={0}>
            {filterField.length ? (
              <Stack
                marginBottom={1}
                padding={1}
                borderRadius="8px"
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap={1}
                border={
                  mode === "dark"
                    ? "1px solid var(--mui-palette-grey-800)"
                    : "1px solid var(--mui-palette-grey-300)"
                }
              >
                <Tooltip
                  arrow
                  title="Filtering by..."
                  color="primary"
                  placement="top-start"
                  size="md"
                  variant="outlined"
                >
                  <IconButton color="neutral" variant="plain" size="sm">
                    <Filter />
                  </IconButton>
                </Tooltip>
                {filterField.map((item, index) => (
                  <Chip
                    key={index}
                    variant="outlined"
                    color="neutral"
                    size="lg"
                    endDecorator={
                      <ChipDelete
                        onDelete={async () => {
                          const filteredArray = await filterField.filter(
                            (value) => !item.includes(value)
                          );
                          await setFilterField(filteredArray);
                          await setValue(filteredArray);
                          await handleFilterChange(filteredArray);
                        }}
                      />
                    }
                    // onClick={() => {
                    //   const filteredArray = filterField.filter(
                    //     (value) => !item.includes(value)
                    //   );
                    //   setFilterField(filteredArray);
                    // }}
                  >
                    {item}
                  </Chip>
                ))}
              </Stack>
            ) : null}

            <ContactTable
              data={contactsData.data}
              paginationHandleChange={paginationHandleChange}
            />
          </Box>
          {/* <Box marginTop={2}>
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
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={0}
              >
                Active
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={1}
              >
                Inactive
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={2}
              >
                Pending
              </Tab>
              <Tab
                sx={{ borderRadius: "6px 6px 0 0" }}
                indicatorInset
                value={3}
              >
                Billing
              </Tab>
            </TabList>
            <TabPanel value={0}>
              <Inactive />
            </TabPanel>
            <TabPanel value={1}>
              <Inactive />
            </TabPanel>
            <TabPanel value={2}>
              <Inactive />
            </TabPanel>
            <TabPanel value={3}>
              <Inactive />
            </TabPanel>
            <TabPanel value={4}>
              <Inactive />
            </TabPanel>
          </Tabs>
        </Box> */}
        </Box>
        <Snackbar
          // autoHideDuration={50000}
          variant="outlined"
          color="neutral"
          size="lg"
          invertedColors
          open={openFilter}
          onClose={() => {
            setValue(filterField);
            setOpenFilter(false);
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={(theme) => ({
            background: `linear-gradient(45deg, ${theme.palette.primary[600]} 30%, ${theme.palette.primary[500]} 90%})`,
            maxWidth: 460,
          })}
        >
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} md={12}>
              <Sheet
                variant="plain"
                sx={{ width: "100%", p: 0, borderRadius: "sm" }}
              >
                <Typography
                  id="rank"
                  level="body-md"
                  fontWeight="lg"
                  sx={{ mb: 1.5 }}
                >
                  DATE
                </Typography>
                <div role="group" aria-labelledby="rank">
                  <List
                    orientation="horizontal"
                    wrap
                    sx={{
                      "--List-gap": "8px",
                      "--ListItem-radius": "20px",
                      "--ListItem-minHeight": "32px",
                      "--ListItem-gap": "4px",
                    }}
                  >
                    {[
                      "Last Hour",
                      "Last Day",
                      "Last Week",
                      "Last Month",
                      "Last Year",
                    ].map((item, index) => (
                      <ListItem key={item}>
                        {/* {value.includes(item) && <Check />} */}
                        <Checkbox
                          size="sm"
                          // disabled={index === 0}
                          disableIcon
                          overlay
                          label={item}
                          checked={value.includes(item)}
                          variant={value.includes(item) ? "soft" : "outlined"}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (event.target.checked) {
                              setValue((val) => [...val, item]);
                            } else {
                              setValue((val) =>
                                val.filter((text) => text !== item)
                              );
                            }
                          }}
                          slotProps={{
                            action: ({ checked }) => ({
                              sx: checked
                                ? {
                                    border: "1px solid",
                                    borderColor: "primary.500",
                                  }
                                : {},
                            }),
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Sheet>
            </Grid>
            <Grid xs={12} sm={12} md={12} marginTop={1}>
              <Sheet
                variant="plain"
                sx={{ width: "100%", p: 0, borderRadius: "sm" }}
              >
                <Typography
                  id="rank"
                  level="body-md"
                  fontWeight="lg"
                  sx={{ mb: 1.5 }}
                >
                  STATUS
                </Typography>
                <div role="group" aria-labelledby="rank">
                  <List
                    orientation="horizontal"
                    wrap
                    sx={{
                      "--List-gap": "8px",
                      "--ListItem-radius": "20px",
                      "--ListItem-minHeight": "32px",
                      "--ListItem-gap": "4px",
                    }}
                  >
                    {[
                      "Active",
                      "In Active",
                      "Follow-up",
                      "No-action",
                      "Verified",
                      "Unverified",
                    ].map((item, index) => (
                      <ListItem key={item}>
                        {/* {value.includes(item) && <Check />} */}
                        <Checkbox
                          size="sm"
                          // disabled={index === 0}
                          disableIcon
                          overlay
                          label={item}
                          checked={value.includes(item)}
                          variant={value.includes(item) ? "soft" : "outlined"}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (event.target.checked) {
                              setValue((val) => [...val, item]);
                            } else {
                              setValue((val) =>
                                val.filter((text) => text !== item)
                              );
                            }
                          }}
                          slotProps={{
                            action: ({ checked }) => ({
                              sx: checked
                                ? {
                                    border: "1px solid",
                                    borderColor: "primary.500",
                                  }
                                : {},
                            }),
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Sheet>
            </Grid>
            <Grid xs={12} sm={12} md={12} marginTop={1}>
              <Sheet
                variant="plain"
                sx={{ width: "100%", p: 0, borderRadius: "sm" }}
              >
                <Typography
                  id="rank"
                  level="body-md"
                  fontWeight="lg"
                  sx={{ mb: 1.5 }}
                >
                  SORT BY
                </Typography>
                <div role="group" aria-labelledby="rank">
                  <List
                    orientation="horizontal"
                    wrap
                    sx={{
                      "--List-gap": "8px",
                      "--ListItem-radius": "20px",
                      "--ListItem-minHeight": "32px",
                      "--ListItem-gap": "4px",
                    }}
                  >
                    {[
                      "Action needed",
                      "Recently visited",
                      "Fresh",
                      "In Queue",
                    ].map((item, index) => (
                      <ListItem key={item}>
                        {/* {value.includes(item) && <Check />} */}
                        <Checkbox
                          size="sm"
                          // disabled={index === 0}
                          disableIcon
                          overlay
                          label={item}
                          checked={value.includes(item)}
                          variant={value.includes(item) ? "soft" : "outlined"}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (event.target.checked) {
                              setValue((val) => [...val, item]);
                            } else {
                              setValue((val) =>
                                val.filter((text) => text !== item)
                              );
                            }
                          }}
                          slotProps={{
                            action: ({ checked }) => ({
                              sx: checked
                                ? {
                                    border: "1px solid",
                                    borderColor: "primary.500",
                                  }
                                : {},
                            }),
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Sheet>
            </Grid>
            <Stack direction="row" spacing={1} width="100%" marginTop={2}>
              <Button
                sx={{ width: "100%", borderRadius: "50vw" }}
                variant="outlined"
                color="neutral"
                onClick={() => {
                  setValue(filterField);
                  setOpenFilter(false);
                }}
                startDecorator={<Close />}
              >
                Cancel
              </Button>
              <Button
                sx={{ width: "100%", borderRadius: "50vw" }}
                variant="solid"
                color="neutral"
                onClick={() => handleFilterChange(value)}
                startDecorator={<Filter />}
              >
                Filter
              </Button>
            </Stack>
          </Grid>
        </Snackbar>
        <ContactActionModal
          isModalOpen={isModalOpen}
          setModalOpen={function (value: React.SetStateAction<boolean>): void {
            setModalOpen(!isModalOpen);
          }}
        />
        <SingleContactActionModal
          isModalOpen={isModalSingleOpen}
          setModalOpen={function (value: React.SetStateAction<boolean>): void {
            setModalSingleOpen(!isModalSingleOpen);
          }}
        />
      </Sheet>{" "}
    </>
  );
}
