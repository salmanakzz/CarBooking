import { fetchCarDetailsUrl } from "../urls/urls";
import axios from "../axios/axios";

export const fetchCarDetails = async () => {
  try {
    const { data } = await axios.get(fetchCarDetailsUrl);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};