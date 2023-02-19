import { carBookUrl } from "../urls/urls";
import axios from "../axios/axios";

export const carBook = async (id) => {
  try {
    const { data } = await axios.patch(carBookUrl + `?id=${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
