import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { fetchCarDetails } from "../../api/fetchCarDetails";
import { Car } from "../Car/Car";
import { locations } from "../../data";

const theme = createTheme();

export const Cars = () => {
  const [cars, setCars] = useState(null);
  const [filter, setFilter] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    fetchCarDetails().then((res) => {
      res.carDetails.forEach((element) => {
        element.createdAt = new Date(element.createdAt).toLocaleDateString();
      });
      setCars(res.carDetails);
      setFilter(res.carDetails);
    });
  }, []);

  const handleFilter = () => {
    let filtered = filter.filter((e) => {
      if (location && !date) {
        return e.location === location;
      } else if (date && !location) {
        return e.createdAt === date;
      } else if (location && date) {
        return e.location === location && e.createdAt === date;
      } else {
        return e;
      }
    });
    setCars(filtered);
    setLocation(null);
    setDate(null);
  };

  return (
    <div>
      <div>
        <ThemeProvider theme={theme}>
          <Container
            component="main"
            maxWidth="xs"
            className="!flex !bg-white "
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                position: "fixed",
                gap: 1,
                background:"white",
                borderRadius:".2rem"
              }}
            >
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                className="!mb-[.0rem]"
              >
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="profession"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations?.map((location) => (
                    <MenuItem key={location._id.$oid} value={location.name}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    className="!w-[120px] !mt-[.5rem]"
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={date}
                    onChange={(e) => setDate(new Date(e).toLocaleDateString())}
                    renderInput={(params) => <TextField size="small" className="!mb-[.0rem]" {...params} />}
                  />
                </Stack>
              </LocalizationProvider>

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleFilter}
              >
                Filter
              </Button>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
      <div className="gap-1 grid pt-[9.5rem] justify-center">
        {cars?.map((car) => (
          <Car car={car} key={car._id} />
        ))}
      </div>
    </div>
  );
};
