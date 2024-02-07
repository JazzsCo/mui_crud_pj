import { z } from "zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";

import { useModal } from "@/hooks/use-modal";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Box,
  Button,
  Typography,
  Modal,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name has to be at least 3 characters." }),
  pawrent: z
    .string()
    .min(3, { message: "Pawrent has to be at least 3 characters." }),
  status: z
    .string()
    .min(3, { message: "Status has to be at least 3 characters." }),
  breed: z
    .string()
    .min(3, { message: "Breed has to be at least 3 characters." }),
  address: z
    .string()
    .min(3, { message: "Address has to be at least 3 characters." }),
  city: z.string().min(3, { message: "City has to be at least 3 characters." }),
  township: z
    .string()
    .min(3, { message: "Township has to be at least 3 characters." }),
  phone: z
    .number()
    .min(11, { message: "Phone has to be at least 11 numbers." }),
  birthday: z.string().transform((value) => new Date(value)),
  gender: z.string({
    errorMap: () => {
      return { message: "You need to select a gender" };
    },
  }),
});

const StoreModal = () => {
  const { isOpen, onClose } = useModal();

  const {
    handleSubmit,
    control,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pawrent: "",
      status: "",
      breed: "",
      address: "",
      city: "",
      township: "",
      phone: undefined,
      birthday: undefined,
      gender: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("VALUES", values);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "1px",
              borderRadius: 1,
              boxShadow: 24,
              width: "580px",
              p: 4,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 15,
              }}
            >
              <IconButton onClick={onClose}>
                <CloseIcon color="warning" />
              </IconButton>
            </Box>

            <Stack
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              mb={3}
            >
              <Typography
                variant="subtitle1"
                color="mainColor.main"
                letterSpacing={1}
              >
                Add new patient
              </Typography>
              <Typography variant="subtitle2" color="mainTextColor.main">
                Enter new patient information below
              </Typography>
            </Stack>

            <Grid
              container
              rowSpacing={2}
              columnSpacing={3}
              flexDirection="row"
            >
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <>
                      <InputLabel error={!!errors.name}>Pet Name</InputLabel>
                      <TextField
                        fullWidth
                        type="text"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        {...field}
                        sx={{
                          ".MuiInputBase-input": {
                            paddingY: "4px",
                          },
                          ".MuiFormHelperText-root": {
                            fontSize: "11px",
                            ml: "7px",
                          },
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "mainColor.main",
                          },
                        }}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <>
                      <InputLabel error={!!errors.status}>Status</InputLabel>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        error={!!errors.status}
                        {...field}
                        sx={{
                          ".MuiInputBase-input": {
                            paddingY: "4px",
                          },
                          ".MuiFormHelperText-root": {
                            fontSize: "11px",
                            ml: "7px",
                          },
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "mainColor.main",
                          },
                        }}
                      >
                        <Select
                          placeholder="please choose status"
                          value={""}
                          onChange={() => {}}
                        >
                          <MenuItem value={10}>Status All</MenuItem>
                        </Select>
                        <FormHelperText>
                          {errors.status?.message}
                        </FormHelperText>
                      </FormControl>
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="pawrent"
                  render={({ field }) => (
                    <>
                      <InputLabel error={!!errors.pawrent}>Pawrent</InputLabel>
                      <TextField
                        fullWidth
                        type="text"
                        variant="outlined"
                        error={!!errors.pawrent}
                        helperText={errors.pawrent?.message}
                        {...field}
                        sx={{
                          ".MuiInputBase-input": {
                            paddingY: "4px",
                          },
                          ".MuiFormHelperText-root": {
                            fontSize: "11px",
                            ml: "7px",
                          },
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "#54BAB9",
                          },
                        }}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="breed"
                  render={({ field }) => (
                    <>
                      <InputLabel error={!!errors.breed}>Breed</InputLabel>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        error={!!errors.breed}
                        {...field}
                        sx={{
                          ".MuiInputBase-input": {
                            paddingY: "4px",
                          },
                          ".MuiFormHelperText-root": {
                            fontSize: "11px",
                            ml: "7px",
                          },
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "mainColor.main",
                          },
                        }}
                      >
                        <Select
                          placeholder="please choose breed"
                          value={""}
                          onChange={() => {}}
                        >
                          <MenuItem value={10}>Status All</MenuItem>
                        </Select>
                        <FormHelperText>{errors.breed?.message}</FormHelperText>
                      </FormControl>
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <FormControl
                      sx={{
                        width: "90%",
                      }}
                    >
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup defaultValue="male">
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => (
                    <>
                      <InputLabel error={!!errors.birthday}>
                        Date of Birth
                      </InputLabel>
                      <TextField
                        fullWidth
                        type="date"
                        variant="outlined"
                        error={!!errors.birthday}
                        helperText={errors.birthday?.message}
                        {...field}
                        sx={{
                          ".MuiInputBase-input": {
                            paddingY: "4px",
                            borderColor: "yellow",
                          },
                          ".MuiFormHelperText-root": {
                            fontSize: "11px",
                            ml: "7px",
                          },
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "mainColor.main",
                          },
                        }}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <>
                      <InputLabel error={!!errors.phone}>
                        Contact Phone No.
                      </InputLabel>
                      <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        {...field}
                        sx={{
                          ".MuiInputBase-input": {
                            paddingY: "4px",
                          },
                          ".MuiFormHelperText-root": {
                            fontSize: "11px",
                            ml: "7px",
                          },
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "mainColor.main",
                          },
                        }}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <>
                      <InputLabel error={!!errors.address}>Address</InputLabel>
                      <TextField
                        fullWidth
                        multiline
                        type="text"
                        variant="outlined"
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        {...field}
                        sx={{
                          ".MuiFormHelperText-root": {
                            fontSize: "11px",
                            ml: "7px",
                          },
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "mainColor.main",
                          },
                        }}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <>
                      <InputLabel error={!!errors.city}>City</InputLabel>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        error={!!errors.city}
                        {...field}
                        sx={{
                          ".MuiInputBase-input": {
                            paddingY: "4px",
                          },
                          ".MuiFormHelperText-root": {
                            fontSize: "11px",
                            ml: "7px",
                          },
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "mainColor.main",
                          },
                        }}
                      >
                        <Select
                          placeholder="please choose city"
                          value={""}
                          onChange={() => {}}
                        >
                          <MenuItem value={10}>Status All</MenuItem>
                        </Select>
                        <FormHelperText>{errors.city?.message}</FormHelperText>
                      </FormControl>
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="township"
                  render={({ field }) => (
                    <>
                      <InputLabel error={!!errors.township}>
                        Township
                      </InputLabel>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        error={!!errors.township}
                        {...field}
                        sx={{
                          ".MuiInputBase-input": {
                            paddingY: "4px",
                          },
                          ".MuiFormHelperText-root": {
                            fontSize: "11px",
                            ml: "7px",
                          },
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "mainColor.main",
                          },
                        }}
                      >
                        <Select
                          placeholder="please choose township"
                          value={""}
                          onChange={() => {}}
                        >
                          <MenuItem value={10}>Status All</MenuItem>
                        </Select>
                        <FormHelperText>
                          {errors.township?.message}
                        </FormHelperText>
                      </FormControl>
                    </>
                  )}
                />
              </Grid>
            </Grid>

            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              mt={3}
              gap={1.5}
            >
              <Button
                size="small"
                variant="contained"
                type="submit"
                sx={{
                  width: "120px",
                  color: "white",
                  textTransform: "none",
                  ":hover": {
                    bgcolor: "mainColor.main",
                  },
                }}
              >
                Save
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="warning"
                onClick={onClose}
                sx={{
                  width: "120px",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default StoreModal;
