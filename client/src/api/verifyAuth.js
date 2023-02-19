import { verifyAuthUrl } from "../urls/urls";
import axios from "../axios/axios";

export const verifyAuth = async (Token) => {
  try {
    const { data } = await axios.get(verifyAuthUrl, {
      headers: {
        "x-accesss-token": Token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
