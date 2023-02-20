// add car details page
import React from "react";
import { CarRegister, Navbar } from "../components";

export const AddCarPage = () => {
  return <>
  <Navbar admin={true}/>
  <CarRegister />;
  </>
};
