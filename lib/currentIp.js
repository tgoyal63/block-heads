import axios from 'axios';

export const getIp = async () => {
  const res = await axios.get('https://geolocation-db.com/json/');
  return res.data.IPv4;
};