import { adminLoginUrl } from "../urls/urls";
import axios from "../axios/axios";

export const adminLogin = async (loginData) => {
  try {
    const { data } = await axios.post(adminLoginUrl, loginData);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
