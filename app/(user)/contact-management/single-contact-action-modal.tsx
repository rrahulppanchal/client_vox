"use client";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from "formik";
import React from "react";
import * as Yup from "yup";

import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  ModalOverflow,
  Typography,
} from "@mui/joy";

import CommonCheckBox from "@/component/common/ui/Checkbox";
import CommonInput from "@/component/common/ui/Input";
import Add from "@/assets/icons/Add";
import Delete from "@/assets/icons/Delete";
import CommonSelect from "@/component/common/ui/Select";
interface Props {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IEpandedUser {
  name: string;
  email: string;
  phone: string;
}

const assigneeOptions = [
  { label: "Assign to me", value: "me@email.com" },
  { label: "John doe", value: "john@email.com" },
];

const SingleContactActionModal: React.FC<Props> = ({
  isModalOpen,
  setModalOpen,
}) => {
  const contactSchema = Yup.object().shape({
    users: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        phone: Yup.string().required("Phone is required"),
      })
    ),
    assignee: Yup.string().required("Select assignee"),
    status: Yup.number().required("Select status"),
  });
  const initialValues: FormikValues = {
    users: [{ name: "", email: "", phone: "" }],
    assignee: "",
    status: null,
  };

  const handleFormSubmit = function (values: FormikValues) {
    console.log(values);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => {}}
        sx={{
          bgcolor: "transparent",
          filter: "saturate(1)",
        }}
      >
        <ModalOverflow>
          <ModalDialog
            aria-labelledby="modal-dialog-overflow"
            layout="center"
            size="lg"
            sx={{
              width: "800px",
            }}
          >
            <Typography id="modal-dialog-overflow" level="h2">
              Add Contact
            </Typography>
            <Divider />
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={contactSchema}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {(formik) => (
                <Form>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} md={6}>
                      <FormControl
                        error={
                          formik.touched.users &&
                          formik.errors.users &&
                          (formik.touched.users as FormikTouched<any>[])[0]
                            ?.name &&
                          (formik.errors?.users as FormikErrors<any>[])[0]?.name
                            ? true
                            : false
                        }
                      >
                        <Typography margin={1} level="title-md">
                          Name
                        </Typography>
                        <Input
                          sx={{
                            "&::before": {
                              display: "none",
                            },
                            "&:focus-within": {
                              outline:
                                "2px solid var(--Input-focusedHighlight)",
                              outlineOffset: "2px",
                            },
                          }}
                          name={`users.${0}.name`}
                          type="text"
                          placeholder="Enter name"
                          onChange={(e) => {
                            formik.setFieldValue(
                              `users.${0}.name`,
                              e.target.value
                            );
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={6}>
                      <FormControl
                        error={
                          formik.touched.users &&
                          formik.errors.users &&
                          (formik.touched.users as FormikTouched<any>[])[0]
                            ?.email &&
                          (formik.errors?.users as FormikErrors<any>[])[0]
                            ?.email
                            ? true
                            : false
                        }
                      >
                        <Typography margin={1} level="title-md">
                          Email
                        </Typography>
                        <Input
                          sx={{
                            "&::before": {
                              display: "none",
                            },
                            "&:focus-within": {
                              outline:
                                "2px solid var(--Input-focusedHighlight)",
                              outlineOffset: "2px",
                            },
                          }}
                          name={`users.${0}.email`}
                          type="text"
                          placeholder="Enter email"
                          onChange={(e) => {
                            formik.setFieldValue(
                              `users.${0}.email`,
                              e.target.value
                            );
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} md={6}>
                      <FormControl
                        error={
                          formik.touched.users &&
                          formik.errors.users &&
                          (formik.touched.users as FormikTouched<any>[])[0]
                            ?.phone &&
                          (formik.errors?.users as FormikErrors<any>[])[0]
                            ?.phone
                            ? true
                            : false
                        }
                        sx={{ width: "80%" }}
                      >
                        <Typography margin={1} level="title-md">
                          Phone
                        </Typography>
                        <Input
                          sx={{
                            "&::before": {
                              display: "none",
                            },
                            "&:focus-within": {
                              outline:
                                "2px solid var(--Input-focusedHighlight)",
                              outlineOffset: "2px",
                            },
                          }}
                          name={`users.${0}.phone`}
                          type="text"
                          placeholder="Enter phone"
                          onChange={(e) => {
                            formik.setFieldValue(
                              `users.${0}.phone`,
                              e.target.value
                            );
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Typography margin={1} level="title-md">
                    Assign contact for verification...
                  </Typography>
                  <Grid container spacing={1} display="flex" alignItems="end">
                    <Grid xs={7} sm={4} md={4}>
                      <FormControl
                        id="free-solo-demo"
                        sx={{ display: "flex", gap: "8px" }}
                        error={
                          formik.touched.assignee && formik.errors.assignee
                            ? true
                            : false
                        }
                      >
                        <Autocomplete
                          freeSolo
                          placeholder="Search to assign"
                          name="assignee"
                          value={
                            formik.values.assignee &&
                            assigneeOptions?.find(
                              (i) => i.value === formik.values.assignee
                            )
                          }
                          options={assigneeOptions}
                          onChange={(e, value) => {
                            formik.setFieldValue(
                              "assignee",
                              (value as any)?.value
                            );
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={5} sm={4} md={4}>
                      <Button
                        variant="soft"
                        color="neutral"
                        onClick={() => {
                          formik.setFieldValue("assignee", "me@email.com");
                        }}
                      >
                        Assign to me
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography margin={1} level="title-md">
                    Status
                  </Typography>
                  <Grid container spacing={1} display="flex" alignItems="end">
                    <Grid xs={7} sm={4} md={4}>
                      <FormControl
                        id="free-solo-demo"
                        sx={{ display: "flex", gap: "8px" }}
                        error={
                          formik.touched.status && formik.errors.status
                            ? true
                            : false
                        }
                      >
                        <Autocomplete
                          freeSolo
                          placeholder="Status"
                          name="status"
                          options={[
                            { label: "Active", value: 1 },
                            { label: "Inactive", value: 2 },
                            { label: "Follow-up", value: 3 },
                            { label: "No-action", value: 4 },
                          ]}
                          onChange={(e, value) => {
                            formik.setFieldValue(
                              "status",
                              (value as any)?.value
                            );
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} md={6} marginTop={2}>
                      <Button
                        sx={{ width: "100%", borderRadius: "50vw" }}
                        name="Cancel"
                        color="neutral"
                        type="button"
                        variant="outlined"
                        onClick={() => {
                          setModalOpen(false);
                          // setCurrentUserData(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid xs={12} sm={6} md={6} marginTop={2}>
                      <Button
                        sx={{ width: "100%", borderRadius: "50vw" }}
                        color="primary"
                        type="submit"
                        variant="solid"
                      >
                        Save Contact
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </>
  );
};

export default SingleContactActionModal;
