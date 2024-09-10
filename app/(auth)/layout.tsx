"use client";
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
  useLayoutEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData") as string);
    if (loginData?.token) {
      redirect("/");
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
