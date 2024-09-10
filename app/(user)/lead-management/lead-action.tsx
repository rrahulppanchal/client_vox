import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Switch from "@mui/joy/Switch";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import ModalOverflow from "@mui/joy/ModalOverflow";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Add from "@/assets/icons/Add";
import CommonInput from "@/component/common/ui/Input";

import { Formik, Form, Field } from "formik";
import CommonButton from "@/component/common/ui/Button";
import CommonSelect from "@/component/common/ui/Select";
import CommonCheckBox from "@/component/common/ui/Checkbox";

interface FormValues {
  email: string;
  movies: string;
}

export default function LeadAction() {
  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined);
  const [scroll, setScroll] = React.useState<boolean>(true);

  const initialValues: FormValues = { email: "", movies: "" };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.movies) {
      errors.movies = "Required";
    }
    return errors;
  };
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="solid"
          color="primary"
          onClick={() => {
            setLayout("center");
          }}
          startDecorator={<Add />}
        >
          Add Lead
        </Button>
        {/* <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout("fullscreen");
          }}
        >
          Full screen
        </Button> */}
      </Stack>
      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
        sx={{
          bgcolor: "transparent",
          filter: "saturate(1)",
        }}
      >
        <ModalOverflow>
          <ModalDialog aria-labelledby="modal-dialog-overflow" layout={layout}>
            <ModalClose />
            <Typography id="modal-dialog-overflow" level="h2">
              Add Lead
            </Typography>
            {/* <FormControl
              orientation="horizontal"
              sx={{ bgcolor: "background.level2", p: 1, borderRadius: "sm" }}
            >
              <FormLabel>Long content</FormLabel>
              <Switch
                checked={scroll}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setScroll(event.target.checked)
                }
                sx={{ ml: "auto" }}
              />
            </FormControl> */}
            {/* {scroll && (
              <List>
                {[...Array(30)].map((item, index) => (
                  <ListItem key={index}>
                    <Stack direction="row" spacing={1}>
                      <CommonInput
                        fieldName={""}
                        // placeholder={"First Name " + index}
                        // variant="outlined"
                      />
                      <CommonInput
                        fieldName={""}
                        // placeholder={"Last Name " + index}
                        // variant="outlined"
                      />
                    </Stack>
                  </ListItem>
                ))}
              </List>
            )} */}

            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={(values) => console.log(values)}
            >
              {(formik) => (
                <Form>
                  <Stack direction="row" spacing={1}>
                    <CommonInput
                      name="email"
                      label="Email"
                      formik={formik}
                      placeholder="Enter your email"
                    />
                    <CommonInput
                      name="email"
                      label="Email"
                      formik={formik}
                      placeholder="Enter your email"
                    />
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <CommonSelect
                      name="movies"
                      options={[
                        { label: "The Shawshank Redemption", value: 1994 },
                        { label: "The Godfather", value: 1972 },
                        { label: "The Godfather: Part II", value: 1974 },
                      ]}
                      label="Movies"
                      formik={formik}
                      placeholder="Select"
                    />
                    <CommonSelect
                      name="movies"
                      options={[
                        { label: "The Shawshank Redemption", value: 1994 },
                        { label: "The Godfather", value: 1972 },
                        { label: "The Godfather: Part II", value: 1974 },
                      ]}
                      label="Movies"
                      formik={formik}
                      placeholder="Select"
                    />
                  </Stack>
                  <Stack direction="row" spacing={1} marginTop={2}>
                    <CommonCheckBox />
                    <CommonCheckBox />
                  </Stack>
                  <Stack direction="row" spacing={1} marginTop={2}>
                    <CommonButton
                      name="Cancel"
                      // color="primary"
                      type="submit"
                      rounded
                      // variant="outlined"
                      // onClick={() => setLayout(undefined)}
                    />
                    <CommonButton
                      name="Save Lead"
                      // color="primary"
                      type="submit"
                      rounded
                      // variant="solid"
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    marginTop={2}
                    textAlign="end"
                    fontSize="11px"
                  >
                    * Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
