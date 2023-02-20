import React from "react";
import { Cars, Navbar } from "../components";

export const CarListPage = () => {
  return (
    <>
      <Navbar page={"list"} admin={true}/>
      <Cars admin={true}/>
    </>
  );
};
