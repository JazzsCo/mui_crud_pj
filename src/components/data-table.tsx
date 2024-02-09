"use client";

import Image from "next/image";
import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import {
  Alert,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import ModalProvider from "@/provider/modal-provider";
import DeleteModalProvider from "@/provider/delete-modal-provider";

import { useAppDispatch, useAppSelector } from "@/hooks";

import {
  onCloseCreate,
  onCloseDelete,
  onCloseUpdate,
} from "@/slices/alertSlice";
import { getData } from "@/slices/petSlice";
import { onOpen, setDefaultId } from "@/slices/createModalSlice";
import { onDeleteOpen, setDeleteDefaultId } from "@/slices/deleteModalSlice";

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

  const {
    filter: { searchValue, status, breed },
    pet: { data, isLoading, error },
    alert: { createOpen, updateOpen, deleteOpen },
  } = useAppSelector((state) => state);

  const openCreateModal = (id: string) => {
    dispatch(onOpen());
    dispatch(setDefaultId(id));
  };

  const openDeleteModal = (id: string) => {
    dispatch(onDeleteOpen());
    dispatch(setDeleteDefaultId(id));
  };

  const onCloseCreateAlert = () => {
    dispatch(onCloseCreate());
  };

  const onCloseUpdateAlert = () => {
    dispatch(onCloseUpdate());
  };

  const onCloseDeleteAlert = () => {
    dispatch(onCloseDelete());
  };

  const filterData = data
    .filter((item) =>
      item.name
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(searchValue.toLowerCase().replace(/\s/g, ""))
    )
    .filter((item) => {
      if (status === "default_value" && breed !== "default_value") {
        return item.breed === breed;
      } else if (breed === "default_value" && status !== "default_value") {
        return item.status === status;
      } else if (status !== "default_value" && breed !== "default_value") {
        return item.status === status && item.breed === breed;
      } else {
        return item;
      }
    });

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
            {filterData.length ? (
              filterData.map((row) => (
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
                    width={100}
                  >
                    {row.breed.charAt(0)}
                    {row.birthday.slice(7)}0{row.id.charAt(0)}
                  </TableCell>
                  <TableCell
                    align="left"
                    variant="head"
                    padding="normal"
                    width={130}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="left"
                    variant="head"
                    padding="normal"
                    width={90}
                  >
                    <IconButton disableRipple>
                      <Image
                        alt="Action-Image"
                        src={
                          row.status === "Food Allergy"
                            ? "/resources/allergy.png"
                            : "/resources/picky_eater.png"
                        }
                        priority
                        width={20}
                        height={20}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    align="left"
                    variant="head"
                    padding="normal"
                    width={130}
                  >
                    {row.pawrent}
                  </TableCell>
                  <TableCell
                    align="left"
                    variant="head"
                    padding="normal"
                    width={120}
                  >
                    {row.breed}
                  </TableCell>
                  <TableCell
                    align="left"
                    variant="head"
                    padding="normal"
                    width={120}
                  >
                    {row.gender}
                  </TableCell>
                  <TableCell
                    align="left"
                    variant="head"
                    padding="normal"
                    width={140}
                  >
                    {row.birthday.split("-").reverse().join("-")}
                  </TableCell>
                  <TableCell
                    align="left"
                    variant="head"
                    padding="normal"
                    width={200}
                  >
                    {row.phone}
                  </TableCell>
                  <TableCell align="left" variant="head" padding="normal">
                    {row.address}, {row.township}, {row.city}
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
              ))
            ) : (
              <TableRow
                style={{
                  height: 100,
                }}
              >
                <TableCell colSpan={11}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="subtitle1"
                      letterSpacing={1}
                      fontWeight={600}
                      color="mainColor.main"
                    >
                      Result Not Found!
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          width: "300px",
        }}
      >
        <Snackbar
          open={createOpen}
          autoHideDuration={900}
          onClose={onCloseCreateAlert}
        >
          <Alert
            onClose={onCloseCreateAlert}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Patient is successfully created!
          </Alert>
        </Snackbar>

        <Snackbar
          open={updateOpen}
          autoHideDuration={900}
          onClose={onCloseUpdateAlert}
        >
          <Alert
            onClose={onCloseUpdateAlert}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Patient is successfully updated!
          </Alert>
        </Snackbar>

        <Snackbar
          open={deleteOpen}
          autoHideDuration={900}
          onClose={onCloseDeleteAlert}
        >
          <Alert
            onClose={onCloseDeleteAlert}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Patient is successfully deleted!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default DataTable;
