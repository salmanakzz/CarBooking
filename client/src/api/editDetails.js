import { editDetailsUrl } from "../urls/urls";
import axios from "../axios/axios";

export const editDetails = async (id, editData) => {
  try {
    const { data } = await axios.put(editDetailsUrl + `?id=${id}`, editData);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
