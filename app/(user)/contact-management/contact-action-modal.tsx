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
import React, { useRef } from "react";
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
  Tooltip,
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

const ContactActionModal: React.FC<Props> = ({ isModalOpen, setModalOpen }) => {
  const formRef = useRef<any>(null);
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

  const add = () => {
    if (formRef.current) {
      formRef.current.push({
        name: "",
        email: "",
        phone: "",
      });
    }
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
            <Grid
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography id="modal-dialog-overflow" level="h2">
                Add Multiple Contacts
              </Typography>
              <Tooltip
                arrow
                color="neutral"
                title="Add new user to the row"
                placement="bottom-end"
                variant="outlined"
              >
                <IconButton onClick={add} variant="outlined">
                  <Add />
                </IconButton>
              </Tooltip>
            </Grid>
            <Divider />
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={contactSchema}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {(formik) => (
                <Form>
                  <FieldArray name="users">
                    {(arrayHelpers) => {
                      formRef.current = arrayHelpers;
                      return (
                        <div>
                          {formik.values.users.map(
                            (user: IEpandedUser, index: number) => (
                              <div key={index}>
                                <Typography
                                  level="title-md"
                                  margin={1}
                                  marginTop={index === 0 ? 0 : 1}
                                >
                                  User {index + 1}.
                                </Typography>
                                <Grid container spacing={1}>
                                  <Grid
                                    xs={12}
                                    sm={4}
                                    md={4}
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                  >
                                    <FormControl
                                      error={
                                        formik.touched.users &&
                                        formik.errors.users &&
                                        (
                                          formik.touched
                                            .users as FormikTouched<any>[]
                                        )[index]?.name &&
                                        (
                                          formik.errors
                                            ?.users as FormikErrors<any>[]
                                        )[index]?.name
                                          ? true
                                          : false
                                      }
                                      sx={{ width: "100%" }}
                                    >
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
                                        name={`users.${index}.name`}
                                        type="text"
                                        placeholder="Enter name"
                                        onChange={(e) => {
                                          formik.setFieldValue(
                                            `users.${index}.name`,
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </FormControl>
                                  </Grid>
                                  <Grid xs={12} sm={4} md={4}>
                                    <FormControl
                                      error={
                                        formik.touched.users &&
                                        formik.errors.users &&
                                        (
                                          formik.touched
                                            .users as FormikTouched<any>[]
                                        )[index]?.email &&
                                        (
                                          formik.errors
                                            ?.users as FormikErrors<any>[]
                                        )[index]?.email
                                          ? true
                                          : false
                                      }
                                      sx={{ width: "100%" }}
                                    >
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
                                        name={`users.${index}.email`}
                                        type="text"
                                        placeholder="Enter email"
                                        onChange={(e) => {
                                          formik.setFieldValue(
                                            `users.${index}.email`,
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </FormControl>
                                  </Grid>
                                  <Grid
                                    xs={12}
                                    sm={4}
                                    md={4}
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                  >
                                    <FormControl
                                      error={
                                        formik.touched.users &&
                                        formik.errors.users &&
                                        (
                                          formik.touched
                                            .users as FormikTouched<any>[]
                                        )[index]?.phone &&
                                        (
                                          formik.errors
                                            ?.users as FormikErrors<any>[]
                                        )[index]?.phone
                                          ? true
                                          : false
                                      }
                                      sx={{ width: "80%" }}
                                    >
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
                                        name={`users.${index}.phone`}
                                        type="text"
                                        placeholder="Enter phone"
                                        onChange={(e) => {
                                          formik.setFieldValue(
                                            `users.${index}.phone`,
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </FormControl>
                                    <IconButton
                                      variant="soft"
                                      color="danger"
                                      disabled={index === 0}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <Delete />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </div>
                            )
                          )}
                        </div>
                      );
                    }}
                  </FieldArray>
                  <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                  <Typography margin={1} level="title-md">
                    Assign contacts for verification...
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
                    Set the Status
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
                        Save Contacts
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

export default ContactActionModal;
