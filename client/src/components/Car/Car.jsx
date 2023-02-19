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

export const Car = ({ car }) => {
  const { _id, name, brand, segment, location, booked, createdAt } = car;
  const [checkBooked,setCheckBooked] = useState(booked)

  const handleBook = (id) => {
    setCheckBooked([true])
    carBook(id).then((res)=>{
      console.log(res);
    })
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
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={_id}>
              <TableCell>{name}</TableCell>
              <TableCell>{brand}</TableCell>
              <TableCell>{segment}</TableCell>
              <TableCell>{location}</TableCell>
              <TableCell>{createdAt}</TableCell>
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
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};
