import {
  Box,
  Button,
  LinearProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MainModal = ({ open, handleClose, getUsers, currentData }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...currentData,
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    let url = currentData
      ? `https://64b221a638e74e386d54b3f0.mockapi.io/users/${currentData.id}`
      : "https://64b221a638e74e386d54b3f0.mockapi.io/users";

    const response = await fetch(url, {
      method: currentData ? "PUT" : "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      handleClose();
      getUsers();
    }
    setLoading(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            id="modal-modal-title"
            align="center"
            variant="h4"
            component="h2"
            gutterBottom
          >
            {currentData ? "Update User" : " Add User"}
          </Typography>
          <TextField
            className="w-100 mb-3"
            placeholder="Enter Your Name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required",
              },
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Invalid Name",
              },
            })}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <TextField
            className="w-100 mb-3"
            placeholder="Enter Your Email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Email",
              },
            })}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <TextField
            className="w-100 mb-3"
            placeholder="Enter Your Contact"
            {...register("contact", {
              required: {
                value: true,
                message: "Contact is Required",
              },
            })}
            error={!!errors.contact}
            helperText={errors?.contact?.message}
          />
          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="contained"
              color="error"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              {currentData ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
export default MainModal;
