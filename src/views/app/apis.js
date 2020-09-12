import axios from "axios";

export const getUser = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
  return response.data.data;
};

export const getAllRules = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/rule`);
  return response.data.data;
};
