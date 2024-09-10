"use client";
import Add from "@/assets/icons/Add";
import Filter from "@/assets/icons/Filter";
import SearchUser from "@/assets/icons/SearchUser";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/joy";
import UsersTable from "./users-table";
import OperationsActionsModal from "./operations-actions-modal";
import { useEffect, useRef, useState } from "react";
import { DownArrow } from "@/assets/icons/Arrow";
import ConfirmationModal from "../../../../component/common/ui/confirmation-modal";
import ChangePassword from "./change-password";
import { deleteRequest, get } from "@/helper/web.requests";
import { toast } from "react-toastify";
import { useLoader } from "@/store/loader-context";

const options = ["Add New User", "Import Users"];

export default function Users() {
  const { setLoading } = useLoader();

  const actionRef = useRef<() => void | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [isOperationModalOpen, setOperationModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [getCurrentUserData, setCurrentUserData] = useState<any>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isChangePassModalOpen, setIsChangePassModalOpen] =
    useState<boolean>(false);

  const [getUsersDate, setUsersDate] = useState();

  const handleClick = () => {
    if (options[selectedIndex] === "Add New User") {
      setOperationModal(true);
    }
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const editAction = (data: any): void | undefined => {
    setOperationModal(true);
    setCurrentUserData(data);
  };

  const deleteAction = (data: any): void | undefined => {
    setIsDeleteModalOpen(true);
    setCurrentUserData(data);
  };

  const changePasswordAction = (data: any): void | undefined => {
    setIsChangePassModalOpen(true);
    console.log(data);
  };

  const deleteUser = async (deletionId: number) => {
    const id = toast.loading("Deleting user...");
    try {
      const res = await deleteRequest("/delete-user/" + deletionId);
      if (res) {
        toast.update(id, {
          render: "User deleted successfully.",
          type: "success",
          isLoading: false,
          autoClose: 4000,
        });
        getUsersData();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.update(id, {
        render: "Something went wrong.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  const getUsersData = async () => {
    setLoading(true);
    try {
      const res = await get("/get-users");
      setUsersDate(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ px: { xs: 2, md: 2 } }}>
          <Typography level="h2" component="h1" sx={{ pt: 1, mb: 2 }}>
            Admin - Users
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
            flexWrap: "wrap",
            justifyContent: "end",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          <Input
            color="primary"
            variant="outlined"
            placeholder="Search..."
            startDecorator={<SearchUser />}
            endDecorator={<Button>Search</Button>}
          />
          <Button endDecorator={<Filter />}>Filter Users</Button>

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
        {/* <Divider /> */}
        <Box
          sx={{
            m: 2,
          }}
        >
          <UsersTable
            getUsersDate={getUsersDate}
            editAction={editAction}
            deleteAction={deleteAction}
            changePasswordAction={changePasswordAction}
          />
        </Box>
      </Box>
      <OperationsActionsModal
        getUsersList={getUsersData}
        currentStateData={getCurrentUserData}
        isModalOpen={isOperationModalOpen}
        setModalOpen={setOperationModal}
        setCurrentUserData={setCurrentUserData}
      />
      <ConfirmationModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        OnYesClick={() => {
          deleteUser(getCurrentUserData.id);
        }}
      />
      <ChangePassword
        open={isChangePassModalOpen}
        setOpen={setIsChangePassModalOpen}
      />
    </>
  );
}
