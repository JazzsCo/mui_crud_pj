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

const STATUS = [
  {
    name: "Food Allergy",
    imgUrl: "/resources/allergy.png",
  },
  {
    name: "Picky Eater",
    imgUrl: "/resources/picky_eater.png",
  },
];

const BREED = [
  {
    name: "Beagle",
  },
  {
    name: "Spaniel",
  },
  {
    name: "Golden Retriever",
  },
];

const CITY = [
  {
    name: "Yangon",
  },
];

const TOWNSHIP = [
  {
    name: "Hlaing",
  },
  {
    name: "Sanchaung",
  },
  {
    name: "Mayangone",
  },
  {
    name: "Kamayut",
  },
];

const formSchema = z.object({
  name: z.string().min(3, { message: "Name has to be at least 3 characters." }),
  pawrent: z
    .string()
    .min(3, { message: "Pawrent has to be at least 3 characters." }),
  status: z.string().nonempty({ message: "You need to select status." }),
  breed: z.string().nonempty({ message: "You need to select breed." }),
  address: z.string().nonempty({ message: "You need to select address." }),
  city: z.string().nonempty({ message: "You need to select city." }),
  township: z.string().nonempty({ message: "You need to select township." }),
  phone: z
    .string()
    .min(11, { message: "Phone number has to be at least 11 numbers." })
    .max(11, { message: "Phone number has to be at most 11 numbers." }),
  birthday: z
    .string()
    .nonempty({ message: "Yon need to select a valid date." }),
  gender: z.enum(["male", "female"]),
});

const StoreModal = () => {
  const { isOpen, onClose } = useModal();

  const {
    handleSubmit,
    control,
    reset,
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
      phone: "",
      birthday: "",
      gender: "male",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("VALUES", values);
  };

  const closeAndReset = () => {
    reset();
    onClose();
  };

  return (
    <div>
      <Modal open={isOpen} onClose={closeAndReset}>
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
              <IconButton onClick={closeAndReset}>
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
                        <Select {...field} placeholder="please choose status">
                          {STATUS.map((item) => (
                            <MenuItem key={item.name} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
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
                        <Select {...field} placeholder="please choose breed">
                          {BREED.map((item) => (
                            <MenuItem key={item.name} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
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
                      <RadioGroup {...field}>
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
                        <Select {...field} placeholder="please choose city">
                          {CITY.map((item) => (
                            <MenuItem key={item.name} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
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
                        <Select {...field} placeholder="please choose township">
                          {TOWNSHIP.map((item) => (
                            <MenuItem key={item.name} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
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
                onClick={closeAndReset}
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
