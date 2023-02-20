import { deleteCarUrl } from "../urls/urls";
import axios from "../axios/axios";

export const deleteCarDetails = async (id) => {
  try {
    const { data } = await axios.delete(deleteCarUrl + `?id=${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
