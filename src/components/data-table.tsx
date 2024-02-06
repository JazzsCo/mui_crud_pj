import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";

interface Data {
  id: string;
  petName: string;
  status: any;
  pawrent: string;
  breed: string;
  gender: string;
  dateOfBirth: number;
  phone: number;
  address: string;
}

const createData = ({
  id,
  petName,
  status,
  pawrent,
  breed,
  gender,
  dateOfBirth,
  phone,
  address,
}: Data) => {
  return {
    id,
    petName,
    status,
    pawrent,
    breed,
    gender,
    dateOfBirth,
    phone,
    address,
  };
};

const rows = [
  createData({
    id: "B-0025",
    petName: "Milo",
    status: "",
    pawrent: "The Nu San",
    breed: "Beagle",
    gender: "Male",
    dateOfBirth: new Date().getDate(),
    phone: 959969417233,
    address: "တိုက်(၅)၊ အခန်း(၀၀၁)၊ လှိုင်သီရီအိမ်ရာ, Hlaing, Yangon",
  }),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: string;
  label: string;
}

const headCells: readonly HeadCell[] = [
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

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
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
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            variant="head"
            padding="normal"
            sx={{
              color: "mainColor.main",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const DataTable = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      //   setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <TableBody>
          {visibleRows.map((row, index) => {
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
                  {row.id}
                </TableCell>
                <TableCell align="left" variant="head" padding="normal">
                  {row.petName}
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
                  {row.dateOfBirth}
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
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: (dense ? 33 : 53) * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
