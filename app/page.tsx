"use client";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import styles from "./page.module.css";
import { styled, useColorScheme } from "@mui/joy/styles";
import ThemeToggle from "@/component/theme/toggle";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion, { accordionClasses } from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { Stack } from "@mui/joy";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/contact-management");
  return (
    <main className={styles.main}>
      {/* <div className={styles.description}>
        <Button variant="soft">Hello World</Button>
      </div>
      <div>sss</div>
      <ThemeToggle /> */}
      <Grid
        container
        spacing={0}
        sx={{ height: "100vh", width: "100%" }}
        direction="column"
      >
        <Stack
          direction="column"
          height="70px"
          sx={{ height: "70px", borderBottom: "sm" }}
        >
          Header
        </Stack>
        <Stack direction="column">Content</Stack>
      </Grid>
    </main>
  );
}

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));
