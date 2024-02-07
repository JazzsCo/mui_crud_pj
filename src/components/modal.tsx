import { z } from "zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useModal } from "@/hooks/use-modal";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

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
      return { message: "You have to select a gender" };
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
              width: "550px",
              p: 4,
            }}
          >
            <Grid container spacing={2} flexDirection="row">
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
                    <>
                      <InputLabel error={!!errors.gender}>Gender</InputLabel>
                      <TextField
                        fullWidth
                        type="text"
                        variant="outlined"
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
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
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default StoreModal;
