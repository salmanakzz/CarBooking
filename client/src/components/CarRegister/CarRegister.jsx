import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { brands, locations } from "../../data";
import { registerCar } from "../../api/registerCar";
import { AdminContext } from "../../store/AdminContext";
import { handleClickVariant } from "../Notification/Notification";
import { useSnackbar } from "notistack";

const theme = createTheme();

export const CarRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setAuth, setToken } = React.useContext(AdminContext);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data,e) => {
    if (data) {
      registerCar(data).then((res) => {
        const { status, registered } = res;
        if (status === "ok" && registered) {
          handleClickVariant(
            "Car registered Successfully!",
            "success",
            enqueueSnackbar
          );
          e.target.reset();
          return;
        }
        handleClickVariant("Something went wrong!", "error", enqueueSnackbar);
      });
    }
  };

  const handleLogout = () => {
    function deleteCookie(name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    deleteCookie("token");
    setAuth(false);
    setToken(false);
    navigate("/admin");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex justify-end fixed right-5 top-3">
        <Button
          type="button"
          variant="contained"
          size="small"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1b79d7" }}>
            <DirectionsCarIcon />
          </Avatar>
          <Typography className="!font-semibold" component="h1" variant="h5">
            Register Car
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
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
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
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
