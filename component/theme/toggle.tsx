"use client";
import Sun from "@/assets/icons/Sun";
import Moon from "@/assets/icons/Moon";
import IconButton from "@mui/joy/IconButton";
import { useEffect, useState } from "react";
import { useColorScheme as useJoyColorScheme } from "@mui/joy/styles";
import { useColorScheme as useMaterialColorScheme } from "@mui/material/styles";

export default function ThemeToggle() {
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
  const { setMode: setJoyMode } = useJoyColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      onClick={() => {
        setMaterialMode(mode === "dark" ? "light" : "dark");
        setJoyMode(mode === "dark" ? "light" : "dark");
      }}
      variant="soft"
      color="neutral"
      size="sm"
    >
      {mode === "light" ? <Moon /> : <Sun />}
    </IconButton>
  );
}
