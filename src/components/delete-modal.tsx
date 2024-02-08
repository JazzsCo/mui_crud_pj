"use client";

import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  deleteDeleteDefaultId,
  onDeleteClose,
} from "@/slices/deleteModalSlice";
import axios from "axios";
import { getData } from "@/slices/petSlice";

const DeleteModal = () => {
  const dispatch = useAppDispatch();

  const {
    deleteModal: { isOpen, defaultId },
  } = useAppSelector((state) => state);

  const closeAndReset = () => {
    dispatch(onDeleteClose());
    dispatch(deleteDeleteDefaultId());
  };

  const onDelete = async () => {
    try {
      const res = await axios.delete("/api/data", {
        data: {
          id: defaultId,
        },
      });
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      dispatch(getData());
      closeAndReset();
    }
  };

  return (
    <Modal open={isOpen} onClose={closeAndReset}>
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
          width: "480px",
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

        <Typography
          variant="subtitle1"
          sx={{
            mb: 3,
            color: "blue",
          }}
        >
          Confirmation
        </Typography>

        <Typography variant="subtitle2">
          Are you sure you want to delete this patient?
        </Typography>

        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          mt={5}
          gap={1.5}
        >
          <Button
            size="small"
            type="submit"
            sx={{
              width: "120px",
              color: "white",
              bgcolor: "deleteBtnColor.main",
              textTransform: "none",
              ":hover": {
                bgcolor: "deleteBtnColor.main",
              },
            }}
            onClick={onDelete}
          >
            Delete
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
    </Modal>
  );
};

export default DeleteModal;
