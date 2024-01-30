import axios from "axios";

export const getMomOne = async (param) => {
  const res = await axios.get(`url`)
  return res.data
}