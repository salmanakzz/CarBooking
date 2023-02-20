import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { carBook } from "../../api/carBook";
import { useSnackbar } from "notistack";
import { handleClickVariant } from "../Notification/Notification";
import { deleteCarDetails } from "../../api/deleteCarDetails";
import { EditModal } from "../Modal/Modal";

export const Car = ({ car, admin, setCars, setEdit }) => {
  const { _id, name, brand, segment, location, booked, createdAt } = car;
  const [checkBooked, setCheckBooked] = useState(booked);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleBook = (id) => {
    setCheckBooked([true]);
    carBook(id).then((res) => {
      console.log(res);
      const { status, booked } = res;
      if (status === "ok" && booked) {
        handleClickVariant(
          "Car booked successfully!",
          "success",
          enqueueSnackbar
        );
        return;
      }
      handleClickVariant("Something went wrong!", "error", enqueueSnackbar);
    });
  };

  const handleDelete = (id) => {
    deleteCarDetails(id).then((res) => {
      const { status, deleted } = res;
      if (status === "ok" && deleted) {
        setCars((cars) => cars.filter((c) => c._id !== id));
        handleClickVariant(
          "Car details removed successfully!",
          "success",
          enqueueSnackbar
        );
        return;
      }
      handleClickVariant("Something went wrong!", "error", enqueueSnackbar);
    });
  };
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {name} {segment} {brand}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell>Segment</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              {admin && (
                <TableCell className="!flex justify-center">Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={_id}>
              <TableCell>{name}</TableCell>
              <TableCell>{brand}</TableCell>
              <TableCell>{segment}</TableCell>
              <TableCell>{location}</TableCell>
              <TableCell>{createdAt}</TableCell>
              {admin ? (
                <TableCell>
                  {checkBooked?.length > 0 ? "Booked" : "Available"}
                </TableCell>
              ) : (
                <TableCell>
                  <Button
                    onClick={() => handleBook(_id)}
                    size="small"
                    variant="contained"
                    disabled={checkBooked?.length > 0 ? true : false}
                  >
                    {checkBooked?.length > 0 ? "Booked" : "Available"}
                  </Button>
                </TableCell>
              )}
              {admin && (
                <TableCell>
                  <Button
                    onClick={handleOpen}
                    size="small"
                    variant="contained"
                    className="!mx-1"
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDelete(_id)}
                    size="small"
                    variant="contained"
                    className="!mx-1"
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <EditModal open={open} handleClose={handleClose} car={car} setEdit={setEdit}/>
    </Grid>
  );
};
