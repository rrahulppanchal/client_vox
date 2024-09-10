"use client";
import Warning from "@/assets/icons/Warning";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  ModalDialog,
} from "@mui/joy";
import * as React from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
  header?: string;
  OnYesClick: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

const ConfirmationModal: React.FC<Props> = ({
  open,
  setOpen,
  OnYesClick,
  header = "Confirmation",
  message = "Are you sure you want to delete this item? After deletion <br />you cannot access this resource!",
}) => {
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog" color="neutral">
          <DialogTitle>
            {/* <Warning isNormal={true} /> */}
            {header}
          </DialogTitle>
          <Divider />
          <DialogContent
            dangerouslySetInnerHTML={{ __html: message }}
          ></DialogContent>
          <DialogActions>
            <Grid container width="100%">
              <Grid xs={6} sm={6} md={6}>
                <Button
                  sx={{ width: "100%", borderRadius: "50vw", marginRight: 1 }}
                  name="Cancel"
                  color="neutral"
                  type="submit"
                  variant="outlined"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid xs={6} sm={6} md={6}>
                <Button
                  sx={{ width: "100%", borderRadius: "50vw", marginLeft: 1 }}
                  color="danger"
                  type="submit"
                  variant="solid"
                  onClick={OnYesClick}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
