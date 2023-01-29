import axios from "axios";

export const getIp = async () => {
  try {
    const res = await axios.get("https://blockheads.tushargoyal3.repl.co/");
    return res.data.ip;
  } catch (error) {
    console.log(error);
  }
};
