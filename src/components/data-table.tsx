"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getData } from "@/slices/petSlice";

interface Heading {
  id: string;
  label: string;
}

const Headings: Heading[] = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "petName",
    label: "Pet Name",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "pawrent",
    label: "Pawrent",
  },
  {
    id: "breed",
    label: "Breed",
  },
  {
    id: "gender",
    label: "Gender",
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
  },
  {
    id: "phone",
    label: "Contact Phone No.",
  },
  {
    id: "address",
    label: "Address",
  },
];

const DataTable = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.pet);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <TableHead
          sx={{
            borderTop: 1,
            borderColor: "#AAA0A0",
          }}
        >
          <TableRow>
            <TableCell variant="head" padding="checkbox">
              <Checkbox
                color="primary"
                // indeterminate={numSelected > 0 && numSelected < rowCount}
                // checked={rowCount > 0 && numSelected === rowCount}
                // onChange={onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>

            {Headings.map(({ id, label }) => (
              <TableCell
                key={id}
                align="left"
                variant="head"
                padding="normal"
                sx={{
                  color: "mainColor.main",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => {
            // const isItemSelected = isSelected(row.id);
            // const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                // onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                // aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                // selected={isItemSelected}
                sx={{
                  cursor: "pointer",
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    // checked={isItemSelected}
                    inputProps={
                      {
                        //   "aria-labelledby": labelId,
                      }
                    }
                  />
                </TableCell>
                <TableCell
                  component="th"
                  //   id={labelId}
                  scope="row"
                  align="left"
                  variant="head"
                  padding="normal"
                >
                  GEC - 220
                </TableCell>
                <TableCell align="left" variant="head" padding="normal">
                  {row.name}
                </TableCell>
                <TableCell align="left" variant="head" padding="normal">
                  {row.status}
                </TableCell>
                <TableCell align="left" variant="head" padding="normal">
                  {row.pawrent}
                </TableCell>
                <TableCell align="left" variant="head" padding="normal">
                  {row.breed}
                </TableCell>
                <TableCell align="left" variant="head" padding="normal">
                  {row.gender}
                </TableCell>
                <TableCell align="left" variant="head" padding="normal">
                  {row.birthday}
                </TableCell>
                <TableCell align="left" variant="head" padding="normal">
                  {row.phone}
                </TableCell>
                <TableCell align="left" variant="head" padding="normal">
                  {row.address}
                </TableCell>
              </TableRow>
            );
          })}
          {/* {emptyRows > 0 && (
            <TableRow
              style={{
                height: (dense ? 33 : 53) * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
