import React, { useEffect, useState } from "react";

import { fetchCarDetails } from "../../api/fetchCarDetails";
import { Car } from "../Car/Car";
import { Filter } from "../Filter/Filter";
import { saveAs } from "file-saver";
import Papa from "papaparse";

export const Cars = ({ admin }) => {
  const [cars, setCars] = useState(null);
  const [filter, setFilter] = useState(null);
  const [edit, setEdit] = useState(false);

  const csvData = Papa.unparse( cars ? cars : []);

  const handleDownload = () => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "data.csv");
  };

  useEffect(() => {
    fetchCarDetails().then((res) => {
      res.carDetails.forEach((element) => {
        element.createdAt = new Date(element.createdAt).toLocaleDateString();
      });
      setCars(res.carDetails);
      setFilter(res.carDetails);
    });
  }, [edit]);

  return (
    <div>
      <div>
        <Filter filter={filter} setCars={setCars} admin={admin} handleDownload={handleDownload}/>
      </div>
      <div className="gap-1 grid pt-[9.5rem] justify-center">
        {cars?.map((car) => (
          <Car
            setCars={setCars}
            admin={admin}
            car={car}
            key={car._id}
            setEdit={setEdit}
          />
        ))}
      </div>
    </div>
  );
};
