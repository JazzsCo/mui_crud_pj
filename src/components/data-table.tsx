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
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { onOpen, setDefaultId } from "@/slices/createModalSlice";
import { onDeleteOpen, setDeleteDefaultId } from "@/slices/deleteModalSlice";
import DeleteModalProvider from "@/provider/delete-modal-provider";
import ModalProvider from "@/provider/modal-provider";

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

  const openCreateModal = (id: string) => {
    dispatch(onOpen());
    dispatch(setDefaultId(id));
  };

  const openDeleteModal = (id: string) => {
    dispatch(onDeleteOpen());
    dispatch(setDeleteDefaultId(id));
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <Box>
      <ModalProvider />
      <DeleteModalProvider />

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
                <Checkbox color="primary" />
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

              <TableCell variant="head" padding="checkbox"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
                sx={{
                  cursor: "pointer",
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell
                  component="th"
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
                <TableCell align="left" variant="head" padding="normal">
                  <PopupState variant="popover">
                    {(popupState) => (
                      <Box>
                        <IconButton {...bindTrigger(popupState)}>
                          <Image
                            alt="Action-Image"
                            src="/resources/more.png"
                            priority
                            width={20}
                            height={20}
                          />
                        </IconButton>

                        <Menu {...bindMenu(popupState)}>
                          <MenuItem
                            sx={{
                              width: 140,
                            }}
                            onClick={() => {
                              openCreateModal(row.id);
                              popupState.close();
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-start"
                              spacing={2}
                            >
                              <Image
                                alt="Edit-Image"
                                src="/resources/edit.png"
                                priority
                                width={20}
                                height={20}
                              />

                              <Typography
                                variant="body1"
                                sx={{
                                  color: "mainTextColor.main",
                                }}
                              >
                                Edit
                              </Typography>
                            </Stack>
                          </MenuItem>

                          <Divider />

                          <MenuItem
                            sx={{
                              width: 140,
                            }}
                            onClick={() => {
                              openDeleteModal(row.id);
                              popupState.close();
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-start"
                              spacing={2}
                            >
                              <Box>
                                <Image
                                  alt="Edit-Image"
                                  src="/resources/delete.png"
                                  priority
                                  width={20}
                                  height={20}
                                />
                              </Box>

                              <Typography
                                variant="body1"
                                sx={{
                                  color: "mainTextColor.main",
                                }}
                              >
                                Delete
                              </Typography>
                            </Stack>
                          </MenuItem>
                        </Menu>
                      </Box>
                    )}
                  </PopupState>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
