import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Container from "@mui/material/Container";
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { brands, locations } from "../../data";
import { editDetails } from "../../api/editDetails";
import { useSnackbar } from "notistack";
import { handleClickVariant } from "../Notification/Notification";

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

export const EditModal = ({ open, handleClose, car , setEdit }) => {
  const { _id, name, brand, segment, location } = car;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name, brand, segment, location } });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    if (data) {
      editDetails(_id, data).then((res) => {
        const { status, edited } = res;
        if (status === "ok" && edited) {
          handleClickVariant(
            "Details edited successfully!",
            "success",
            enqueueSnackbar
          );
          setEdit((edit) => !edit)
          return;
        }
        handleClickVariant("Something went wrong!", "error", enqueueSnackbar);
      });
    }
    handleClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#1b79d7" }}>
                <DirectionsCarIcon />
              </Avatar>
              <Typography
                className="!font-semibold"
                component="h1"
                variant="h5"
              >
                Edit Details
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  type="text"
                  {...register("name", {
                    required: true,
                  })}
                />
                {errors?.name?.type === "required" && (
                  <p className="validate-error mb-3">This field is required</p>
                )}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="profession"
                    {...register("brand", { required: true })}
                  >
                    {brands?.map((brand) => (
                      <MenuItem key={brand._id.$oid} value={brand.name}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors?.brand?.type === "required" && (
                  <p className="validate-error">This field is required</p>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="segment"
                  label="Segment"
                  name="segment"
                  autoComplete="segment"
                  type="text"
                  {...register("segment", {
                    required: true,
                  })}
                />
                {errors?.segment?.type === "required" && (
                  <p className="validate-error mb-3">This field is required</p>
                )}

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Location
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="profession"
                    {...register("location", { required: true })}
                  >
                    {locations?.map((location) => (
                      <MenuItem key={location._id.$oid} value={location.name}>
                        {location.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors?.location?.type === "required" && (
                  <p className="validate-error">This field is required</p>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};
