"use client";
import Email from "@/assets/icons/Email";
import OffEye from "@/assets/icons/OffEye";
import OnEye from "@/assets/icons/OnEye";
import Org from "@/assets/icons/Org";
import Password from "@/assets/icons/Password";
import Users from "@/assets/icons/Users";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { useState } from "react";

import { useFormik, FormikErrors } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { post } from "@/helper/web.requests";
import { useRouter } from "next/navigation";
interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Enter email"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters")
    .required("Enter password"),
});

export default function Login() {
  const router = useRouter();
  const [getPasswordView, setPasswordView] = useState({
    isPassword: false,
  });

  const handleLogin = async (values: FormValues) => {
    const id = toast.loading("User logging in...");
    try {
      const data = await post("/v0/auth/login", values);
      console.log(data);
      localStorage.setItem("loginData", JSON.stringify(data));
      toast.update(id, {
        render: "User logged in successfully.",
        type: "success",
        isLoading: false,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: "Something went wrong.",
        type: "error",
        isLoading: false,
      });
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleLogin(values);
    },
    validate: (values) => {
      const errors: FormikErrors<FormValues> = {};
      if (values.email === "test@email.com") {
        errors.email = "Nice try!";
      }
      return errors;
    },
  });

  return (
    <>
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="success" size="lg">
                <Org />
              </IconButton>
              <Typography level="title-lg">VoxQ Co.</Typography>
            </Box>
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 0 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Log in
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={4} sx={{ mt: 0 }}>
              <form>
                <FormControl>
                  <FormLabel sx={{ marginLeft: "20px" }}>Email</FormLabel>
                  <Input
                    startDecorator={<Users />}
                    size="lg"
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    sx={{ borderRadius: "50vw" }}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText sx={{ color: "red", marginLeft: "20px" }}>
                      {formik.errors.email}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl>
                  <FormLabel sx={{ marginLeft: "20px" }}>Password</FormLabel>
                  <Input
                    startDecorator={<Password />}
                    placeholder="******"
                    size="lg"
                    type={getPasswordView.isPassword ? "text" : "password"}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    sx={{ borderRadius: "50vw" }}
                    endDecorator={
                      <IconButton
                        variant="soft"
                        sx={{ borderRadius: "50vw" }}
                        onClick={() => {
                          setPasswordView((prev) => ({
                            ...prev,
                            isPassword: !prev.isPassword,
                          }));
                        }}
                      >
                        {getPasswordView.isPassword ? <OnEye /> : <OffEye />}
                      </IconButton>
                    }
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormHelperText sx={{ color: "red", marginLeft: "20px" }}>
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox size="sm" label="Remember me" name="persistent" />
                    <Link level="title-sm" href="/auth/change-password">
                      Change Password
                    </Link>
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    sx={{ borderRadius: "50vw" }}
                    onClick={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                  >
                    Log in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © VoxQ Co. {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822_960_720.jpg)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2015/09/28/14/59/still-life-962213_640.jpg)",
          },
        })}
      />
    </>
  );
}
