import axios from 'axios';

export const uploadImageAPI = axios.create({
  baseURL: 'http://localhost:5001/traste-71a71/europe-west3/app',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const createReportAPI = axios.create({
  baseURL: 'http://localhost:5001/traste-71a71/europe-west3/app',
});

export default {
  uploadImageAPI, createReportAPI,
};
