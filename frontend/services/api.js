import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const fetchRooms = async () => {
  const response = await instance.get('/availableRooms');
  return response.data;
};

const createBooking = async (data) => {
  const response = await instance.post('/customer/booking', { data });
  return response.data;
};

export { fetchRooms, createBooking };