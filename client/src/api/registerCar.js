import { registerCarUrl } from "../urls/urls";
import axios from "../axios/axios";

export const registerCar = async (carData) => {
  try {
    const { data } = await axios.post(registerCarUrl, carData);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
