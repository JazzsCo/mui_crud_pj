"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TablePagination,
  TableFooter,
  Skeleton,
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [checkedRows, setCheckedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

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

  const handleHeaderCheckboxClick = () => {
    const newCheckedAll = !isCheckedAll;
    setIsCheckedAll(newCheckedAll);
    const newCheckedRows: { [key: string]: boolean } = {};
    filterData.forEach((row) => {
      newCheckedRows[row.id] = newCheckedAll;
    });
    setCheckedRows(newCheckedRows);
  };

  const handleRowCheckboxClick = (id: string) => {
    const newCheckedRows = { ...checkedRows, [id]: !checkedRows[id] };
    setCheckedRows(newCheckedRows);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    const allChecked =
      filterData.length > 0 && filterData.every((row) => checkedRows[row.id]);
    setIsCheckedAll(allChecked);
  }, [checkedRows, filterData]);

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
                <Checkbox
                  color="primary"
                  checked={isCheckedAll}
                  onChange={handleHeaderCheckboxClick}
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

              <TableCell variant="head" padding="checkbox"></TableCell>
            </TableRow>
          </TableHead>

          {isLoading ? (
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow
                  key={i}
                  role="checkbox"
                  tabIndex={-1}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell colSpan={10}>
                    <Skeleton height={50} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {filterData.length ? (
                filterData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
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
                        <Checkbox
                          color="primary"
                          checked={checkedRows[row.id] || false}
                          onChange={() => handleRowCheckboxClick(row.id)}
                        />
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
          )}

          <TableFooter>
            <TableRow>
              <TableCell colSpan={11}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filterData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    ".MuiSelect-select.MuiTablePagination-select": {
                      borderRadius: 2.5,
                      border: 1,
                    },
                  }}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Box>
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
