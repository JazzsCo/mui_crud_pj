import * as React from "react";
import { Box, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function Input() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
  );
}
