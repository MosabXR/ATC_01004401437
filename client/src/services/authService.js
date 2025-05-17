import axios from "axios";
import api from "./api";
const signUp = async (data) => {
  try {
    const response = await axios.post(`${api}/users/signup`, data);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const signIn = async (data) => {
  try {
    const response = await axios.post(`${api}/users/signin`, data);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export { signUp, signIn };
