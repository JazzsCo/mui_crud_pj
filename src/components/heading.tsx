"use client";

import { useAppDispatch } from "@/hooks";
import { onOpen } from "@/slices/createModalSlice";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

const Heading = () => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(onOpen());
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "mainColor.main",
          fontSynthesisWeight: "inherit",
          fontWeight: "bold",
        }}
      >
        Patient List
      </Typography>

      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Grid container spacing={2} flexDirection="row" sx={{ width: "290px" }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search table"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple>
                      <Image
                        alt="Search-Image"
                        src="/resources/search.png"
                        priority
                        width={20}
                        height={20}
                        style={{
                          objectFit: "none",
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                ".MuiInputBase-root": {
                  borderRadius: 2.5,
                  height: 28,
                },
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                ".MuiInputBase-root": { borderRadius: 2.5, height: 28 },
              }}
            >
              <Select value={10} onChange={() => {}}>
                <MenuItem value={10}>Status All</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                ".MuiInputBase-root": { borderRadius: 2.5, height: 28 },
              }}
            >
              <Select value={10} onChange={() => {}}>
                <MenuItem value={10}>Breed All</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} flexDirection="row" sx={{ width: "200px" }}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              disableRipple
              sx={{
                borderRadius: 2.5,
                height: 28,
                bgcolor: "mainColor.main",
                border: "none",
                ":hover": {
                  bgcolor: "mainColor.main",
                  border: "none",
                },
              }}
              onClick={openModal}
            >
              <Stack direction="row" alignItems="center">
                <IconButton disableRipple>
                  <Image
                    alt="Search-Image"
                    src="/resources/add.png"
                    priority
                    width={20}
                    height={20}
                    style={{
                      objectFit: "none",
                    }}
                  />
                </IconButton>

                <Typography
                  variant="body1"
                  textTransform="none"
                  sx={{
                    color: "secTextColor.main",
                  }}
                >
                  Add new patient
                </Typography>
              </Stack>
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="body1"
                textTransform="none"
                sx={{
                  color: "mainTextColor.main",
                  letterSpacing: 0.5,
                }}
              >
                Rows per pages :
              </Typography>

              <FormControl
                variant="outlined"
                sx={{
                  ".MuiInputBase-root": { borderRadius: 2.5, height: 28 },
                }}
              >
                <Select value={10} onChange={() => {}}>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Heading;
