import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Delete from "@/assets/icons/Delete";
import {
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import More from "@/assets/icons/More";
import Moon from "@/assets/icons/Moon";
import Edit from "@/assets/icons/Edit";
import ArchiveIn from "@/assets/icons/ArchiveIn";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("1", 159, 6.0, 24, 4.0),
  createData("1", 159, 6.0, 24, 4.0),
  createData("1", 159, 6.0, 24, 4.0),
  createData("1", 159, 6.0, 24, 4.0),
  createData("2", 237, 9.0, 37, 4.3),
  createData("2", 237, 9.0, 37, 4.3),
  createData("2", 237, 9.0, 37, 4.3),
  createData("2", 237, 9.0, 37, 4.3),
  createData("3", 262, 16.0, 24, 6.0),
  createData("4", 305, 3.7, 67, 4.3),
  createData("4", 305, 3.7, 67, 4.3),
  createData("4", 305, 3.7, 67, 4.3),
];

export default function ActiveLeadManagement() {
  return (
    <>
      <Box sx={{ width: "100%", background: "transparent" }}>
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "sm",
            "--TableCell-height": "40px",
            // the number is the amount of the header rows.
            "--TableHeader-height": "calc(1 * var(--TableCell-height))",
            "--Table-firstColumnWidth": "80px",
            "--Table-lastColumnWidth": "144px",
            // background needs to have transparency to show the scrolling shadows
            "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
            "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
            overflow: "auto",
            background: (
              theme
            ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
        linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
        radial-gradient(
          farthest-side at 0 50%,
          rgba(0, 0, 0, 0.12),
          rgba(0, 0, 0, 0)
        ),
        radial-gradient(
            farthest-side at 100% 50%,
            rgba(0, 0, 0, 0.12),
            rgba(0, 0, 0, 0)
          )
          0 100%`,
            backgroundSize:
              "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "local, local, scroll, scroll",
            backgroundPosition:
              "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
            backgroundColor: "background.surface",
          }}
        >
          <Table
            borderAxis="bothBetween"
            stripe="odd"
            hoverRow
            sx={{
              "& tr > *:first-child": {
                position: "sticky",
                left: 0,
                boxShadow: "1px 0 var(--TableCell-borderColor)",
                bgcolor: "background.surface",
              },
              "& tr > *:last-child": {
                position: "sticky",
                right: 0,
                bgcolor: "var(--TableCell-headBackground)",
              },
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "var(--Table-firstColumnWidth)" }}>Row</th>
                <th style={{ width: 200 }}>Calories</th>
                <th style={{ width: 200 }}>Fat&nbsp;(g)</th>
                <th style={{ width: 200 }}>Carbs&nbsp;(g)</th>
                <th style={{ width: 200 }}>Protein&nbsp;(g)</th>
                <th style={{ width: 200 }}>Actions</th>
                {/* <th
                  aria-label="last"
                  style={{ width: "var(--Table-lastColumnWidth)" }}
                /> */}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.calories}</td>
                  <td>{row.fat}</td>
                  <td>{row.carbs}</td>
                  <td>{row.protein}</td>
                  <td>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Dropdown>
                        <MenuButton
                          title="More..."
                          slots={{ root: IconButton }}
                          slotProps={{
                            root: {
                              variant: "plain",
                              color: "neutral",
                              size: "sm",
                            },
                          }}
                        >
                          <More />
                        </MenuButton>
                        <Menu
                          sx={{ width: "170px" }}
                          placement="bottom-end"
                          variant="outlined"
                          size="sm"
                        >
                          <MenuItem>
                            <ListItemDecorator>
                              <Edit />
                            </ListItemDecorator>
                            Edit post
                          </MenuItem>
                          <MenuItem disabled>
                            <ListItemDecorator>
                              <ArchiveIn />
                            </ListItemDecorator>
                            Draft post
                          </MenuItem>
                          <ListDivider />
                          <MenuItem variant="soft" color="danger">
                            <ListItemDecorator sx={{ color: "inherit" }}>
                              <Delete />
                            </ListItemDecorator>
                            Delete
                          </MenuItem>
                        </Menu>
                      </Dropdown>
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>
    </>
  );
}
