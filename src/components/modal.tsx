"use client";

import { z } from "zod";
import axios from "axios";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

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

import CloseIcon from "@mui/icons-material/Close";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { getData } from "@/slices/petSlice";
import { deleteDefaultId, onClose } from "@/slices/createModalSlice";
import { onOpenCreate, onOpenUpdate } from "@/slices/alertSlice";

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
  address: z
    .string()
    .min(5, { message: "Address has to be at least 5 characters" }),
  city: z.string().nonempty({ message: "You need to select city." }),
  township: z.string().nonempty({ message: "You need to select township." }),
  phone: z
    .string()
    .min(11, { message: "Phone number has to be at least 11 numbers." })
    .max(11, { message: "Phone number has to be at most 11 numbers." }),
  birthday: z
    .string()
    .nonempty({ message: "Yon need to select a valid date." }),
  gender: z.string().nonempty({ message: "You need to select a gender" }),
});

const StoreModal = () => {
  const dispatch = useAppDispatch();

  const {
    pet: { data },
    createModal: { isOpen, defaultId },
  } = useAppSelector((state) => state);

  const defaultData = data.find((item) => item.id === defaultId);

  const closeAndReset = () => {
    reset();
    dispatch(onClose());
    dispatch(deleteDefaultId());
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({
    name,
    pawrent,
    status,
    breed,
    address,
    city,
    township,
    phone,
    birthday,
    gender,
  }) => {
    try {
      if (defaultData) {
        const res = await axios.patch("/api/data", {
          id: defaultData.id,
          name,
          pawrent,
          status,
          breed,
          address,
          city,
          township,
          phone,
          birthday,
          gender,
        });
      } else {
        const res = await axios.post("/api/data", {
          name,
          pawrent,
          status,
          breed,
          address,
          city,
          township,
          phone,
          birthday,
          gender,
        });
      }
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      dispatch(getData());
      closeAndReset();
      defaultData ? dispatch(onOpenUpdate()) : dispatch(onOpenCreate());
    }
  };

  useEffect(() => {
    reset({
      name: defaultData?.name,
      pawrent: defaultData?.pawrent,
      status: defaultData?.status,
      breed: defaultData?.breed,
      address: defaultData?.address,
      city: defaultData?.city,
      township: defaultData?.township,
      phone: defaultData?.phone,
      birthday: defaultData?.birthday,
      gender: defaultData?.gender,
    });
  }, [reset, defaultData]);

  return (
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

          <Grid container rowSpacing={2} columnSpacing={3} flexDirection="row">
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
                      value={field.value || ""}
                      onChange={(evt) => field.onChange(evt.target.value)}
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
                      <Select
                        value={field.value || null}
                        onChange={(evt) => field.onChange(evt.target.value)}
                        placeholder="please choose status"
                      >
                        {STATUS.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.status?.message}</FormHelperText>
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
                      value={field.value}
                      onChange={(evt) => field.onChange(evt.target.value)}
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
                      <Select
                        value={field.value || null}
                        onChange={(evt) => field.onChange(evt.target.value)}
                        placeholder="please choose breed"
                      >
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
                    error={!!errors.gender}
                  >
                    <FormLabel error={!!errors.gender}>Gender</FormLabel>
                    <RadioGroup
                      value={field.value}
                      onChange={(evt) => field.onChange(evt.target.value)}
                    >
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
                    <FormHelperText>{errors.gender?.message}</FormHelperText>
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
                      value={field.value}
                      onChange={(evt) => field.onChange(evt.target.value)}
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
                      value={field.value}
                      onChange={(evt) => field.onChange(evt.target.value)}
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
                      value={field.value}
                      onChange={(evt) => field.onChange(evt.target.value)}
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
                      <Select
                        value={field.value || null}
                        onChange={(evt) => field.onChange(evt.target.value)}
                        placeholder="please choose city"
                      >
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
                    <InputLabel error={!!errors.township}>Township</InputLabel>
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
                      <Select
                        value={field.value || null}
                        onChange={(evt) => field.onChange(evt.target.value)}
                        placeholder="please choose township"
                      >
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
            {defaultId ? (
              <Button
                size="small"
                variant="contained"
                type="submit"
                sx={{
                  width: "120px",
                  color: "black",
                  bgcolor: "updateBtnColor.main",
                  textTransform: "none",
                  ":hover": {
                    bgcolor: "updateBtnColor.main",
                  },
                }}
              >
                Update
              </Button>
            ) : (
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
            )}
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
  );
};

export default StoreModal;
