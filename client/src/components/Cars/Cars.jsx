import React, { useEffect, useState } from "react";

import { fetchCarDetails } from "../../api/fetchCarDetails";
import { Car } from "../Car/Car";
import { Filter } from "../Filter/Filter";

export const Cars = ({ admin }) => {
  const [cars, setCars] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    fetchCarDetails().then((res) => {
      res.carDetails.forEach((element) => {
        element.createdAt = new Date(element.createdAt).toLocaleDateString();
      });
      setCars(res.carDetails);
      setFilter(res.carDetails);
    });
  }, []);

  return (
    <div>
      <div>
        <Filter filter={filter} setCars={setCars} />
      </div>
      <div className="gap-1 grid pt-[9.5rem] justify-center">
        {cars?.map((car) => (
          <Car setCars={setCars} admin={admin} car={car} key={car._id} />
        ))}
      </div>
    </div>
  );
};
