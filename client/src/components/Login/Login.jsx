import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link2 from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminLogin } from "../../api/adminLogin";

const theme = createTheme();

export const Login = () => {
  const navigate = useNavigate();

  const [invalid, setInvalid] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      adminLogin(data).then((res) => {
        const {status , admin} = res
        if (status === 'ok' && admin) {
          navigate('/register-car')
          return
        }
        setInvalid(true)
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography className="!font-semibold" component="h1" variant="h5">
            Admin Login
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: true,
                max: -1,
                pattern: /^\S+@\S+$/i,
              })}
              onChange={() => setInvalid(false)}
            />
            {errors?.email?.type === "required" && (
              <p className="validate-error">This field is required</p>
            )}
            {errors?.email?.type === "max" && (
              <p className="validate-error">Invalid email format</p>
            )}
            {errors?.email?.type === "pattern" && (
              <p className="validate-error">Invalid email format</p>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: true,
              })}
              onChange={() => setInvalid(false)}
            />
            {errors?.password?.type === "required" && (
              <p className="validate-error">This field is required</p>
            )}
            {invalid && (
              <p className="validate-error">Invalid email or password!</p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link2 variant="body2">Forgot password?</Link2>
              </Grid>
              <Grid item>
                <Link to="/signup">
                  <Link2 variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link2>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
