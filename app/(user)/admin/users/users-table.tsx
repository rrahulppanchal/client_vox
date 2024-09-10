import * as React from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import {
  Avatar,
  Box,
  Chip,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Dropdown,
  Grid,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  ModalClose,
  Stack,
  Typography,
} from "@mui/joy";
import More from "@/assets/icons/More";
import Edit from "@/assets/icons/Edit";
import Delete from "@/assets/icons/Delete";
import Users from "@/assets/icons/Users";
import Password from "@/assets/icons/Password";
import dayjs from "dayjs";
import { Pagination } from "@mui/material";

function createData(
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  phone: string,
  jDate: string,
  lDate: string,
  isActive: boolean,
  userDescription: string
) {
  return {
    userName,
    firstName,
    lastName,
    email,
    role,
    phone,
    jDate,
    lDate,
    isActive,
    userDescription,
  };
}

const rows = [
  createData(
    "johndoe",
    "John",
    "Doe",
    "johndoe@email.com",
    "Admin",
    "+91 9999999999",
    "2022-02-03",
    "2024-02-03",
    true,
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo unde aspernatur illo labore consequatur magni est, expedita, exercitationem laudantium iure alias, porro facilis doloremque. Explicabo facilis id molestiae ipsum est?"
  ),
  createData(
    "johndoe",
    "John 1",
    "Doe",
    "johndoe@email.com",
    "Admin",
    "+91 9999999999",
    "2022-06-02",
    "2024-06-02",
    false,
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo unde aspernatur illo labore consequatur magni est, expedita, exercitationem laudantium iure alias, porro facilis doloremque. Explicabo facilis id molestiae ipsum est?"
  ),
];

interface IUser {
  idstring: number;
  user_name: string;
  user_email: string;
  password?: string;
  first_name: string;
  last_name: string;
  description: string;
  phone: string;
  j_date: Date | string;
  l_date?: Date | string | null;
  user_role: string;
  is_deleted?: false;
  is_active?: false;
  created_at?: Date;
  updated_at?: Date;
}

interface Props {
  editAction: any;
  deleteAction: any;
  changePasswordAction: any;
  getUsersDate: any;
}

const UsersTable: React.FC<Props> = ({
  editAction,
  deleteAction,
  changePasswordAction,
  getUsersDate,
}) => {
  const [open, setOpen] = React.useState(false);
  const [getCurentUser, setCurentUser] = React.useState<IUser>();

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(inOpen);
    };
  return (
    <>
      <Sheet
        variant="outlined"
        sx={{ borderRadius: "md", width: "100%", overflowY: "auto" }}
      >
        <Table
          variant="plain"
          borderAxis="bothBetween"
          color="neutral"
          size="lg"
        >
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Activity</th>
              <th style={{ width: "90px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getUsersDate?.length > 0 ? (
              getUsersDate?.map((row: IUser, index: number) => (
                <tr key={index}>
                  {/* <th scope="row">{row.userName}</th> */}
                  <td>
                    <span
                      className="pointer"
                      onClick={() => {
                        setCurentUser(row as IUser);
                        setOpen(true);
                      }}
                    >
                      {row.first_name} {row.last_name}{" "}
                      <Chip
                        disabled={false}
                        // onClick={function () {}}
                        size="sm"
                        variant="soft"
                        color={row.user_role === "Admin" ? "danger" : "warning"}
                      >
                        {row.user_role}
                      </Chip>
                    </span>
                  </td>
                  <td>{row.user_email}</td>
                  <td>
                    <Chip
                      color={row.is_active ? "success" : "danger"}
                      disabled={false}
                      // onClick={function () {}}
                      size="md"
                      variant="soft"
                    >
                      {row.is_active ? "Active" : "Inactive"}
                    </Chip>
                  </td>
                  <td>
                    {" "}
                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{
                          root: { variant: "plain", color: "neutral" },
                        }}
                      >
                        <More />
                      </MenuButton>
                      <Menu placement="bottom-end">
                        <MenuItem
                          onClick={(e) => {
                            setCurentUser(row as IUser);
                            setOpen(true);
                          }}
                        >
                          <ListItemDecorator sx={{ color: "inherit" }}>
                            <Users />
                          </ListItemDecorator>
                          About
                        </MenuItem>
                        <MenuItem onClick={() => editAction(row)}>
                          <ListItemDecorator>
                            <Edit />
                          </ListItemDecorator>
                          Edit
                        </MenuItem>
                        {/* <ListDivider /> */}
                        <MenuItem
                          variant="plain"
                          color="warning"
                          onClick={() => changePasswordAction(row)}
                        >
                          <ListItemDecorator sx={{ color: "inherit" }}>
                            <Password />
                          </ListItemDecorator>
                          Change password
                        </MenuItem>
                        <MenuItem
                          variant="plain"
                          color="danger"
                          onClick={() => deleteAction(row)}
                        >
                          <ListItemDecorator sx={{ color: "inherit" }}>
                            <Delete />
                          </ListItemDecorator>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <Sheet
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "30px",
                    }}
                  >
                    <Typography fontSize="22px">No User Available</Typography>
                  </Sheet>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={4}>
                <Stack
                  spacing={2}
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Pagination count={10} shape="rounded" />
                </Stack>
              </th>
            </tr>
          </tfoot>
        </Table>
      </Sheet>
      {/* <Box sx={{ display: "flex", background: "transparent" }}> */}
      <Drawer
        open={open}
        anchor="right"
        onClose={() => setOpen(!open)}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "10px 0 0 10px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <DialogTitle>
            {" "}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar src="/static/images/avatar/1.jpg" size="lg" />
            </Box>
            <Grid flexDirection="column">
              <Typography level="title-md">
                {getCurentUser?.first_name} {getCurentUser?.last_name}
                <Chip
                  sx={{ marginLeft: "7px" }}
                  color={getCurentUser?.is_active ? "success" : "danger"}
                  disabled={false}
                  // onClick={function () {}}
                  size="sm"
                  variant="soft"
                >
                  {getCurentUser?.is_active ? "Active" : "Inactive"}
                </Chip>
              </Typography>
              <Typography level="body-xs">
                {getCurentUser?.user_role}
              </Typography>
            </Grid>
          </DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: "auto" }} />
          <DialogContent sx={{ gap: 2 }}>
            <Grid container>
              <Grid xs={12} sm={6} md={6}>
                <Typography level="body-sm">First Name</Typography>
                <Typography level="body-md">
                  {getCurentUser?.first_name}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <Typography level="body-sm">Last Name</Typography>
                <Typography level="body-md">
                  {getCurentUser?.last_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={12} sm={6} md={6}>
                <Typography level="body-sm">Email</Typography>
                <Typography level="body-md">
                  {getCurentUser?.user_email}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6} md={6}>
                <Typography level="body-sm">Username</Typography>
                <Typography level="body-md">
                  {getCurentUser?.user_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={12} sm={6} md={6}>
                <Typography level="body-sm">Joining Date</Typography>
                <Typography level="body-md">
                  {dayjs(getCurentUser?.j_date).format("DD/MM/YYYY")}
                </Typography>
              </Grid>
              {getCurentUser?.l_date && (
                <Grid xs={12} sm={6} md={6}>
                  <Typography level="body-sm">Leaving Date</Typography>
                  <Typography level="body-md">
                    {dayjs(getCurentUser?.l_date).format("DD/MM/YYYY")}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid container>
              <Grid xs={12} sm={12} md={12}>
                <Typography level="body-sm">User Description</Typography>
                <Typography level="body-md">
                  {getCurentUser?.description}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Sheet>
      </Drawer>
      {/* </Box> */}
    </>
  );
};

export default UsersTable;
