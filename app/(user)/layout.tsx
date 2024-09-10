"use client";
import UpProgress from "@/component/common/ui/UpProgress";
import Header from "@/component/layout/header";
import Sidebar from "@/component/layout/sidebar";
import { useLoader } from "@/store/loader-context";
import { Box, Grid, Stack } from "@mui/joy";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useLoader();

  useLayoutEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData") as string);
    if (!loginData?.token) {
      redirect("/auth/login");
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <UpProgress loader={isLoading} />
        <ToastContainer />
        <Grid container spacing={0} sx={{ height: "100vh", width: "100%" }}>
          <Stack direction="row" flexGrow={1}>
            <Sidebar />
            <Header />
            <Grid sx={{ marginTop: "var(--Header-height)", width: "100%" }}>
              {children}
            </Grid>
          </Stack>
        </Grid>
      </body>
    </html>
  );
}
