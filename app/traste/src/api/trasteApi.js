import axios from 'axios';

const baseURL = 'http://localhost:5001/traste-71a71/europe-west3/app';

/**
 * Makes a call with data as login password to authenticate user.
 */
export const loginAPI = axios.create({
  baseURL: baseURL + '/login',
});

/**
 * Upploads an image to the backend at the endpoint /uploadimage.
 * Cointains neccesary header for an image.
 */
export const uploadImageAPI = axios.create({
  baseURL: baseURL + '/uploadimage',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': 'Token ' + localStorage.getItem('token'),
  },
});

/**
 * Uploads the report to the backend at the endpoint /createreport.
 */
export const createReportAPI = axios.create({
  baseURL: baseURL + '/createreport',
  headers: {
    'Authorization': 'Token ' + localStorage.getItem('token'),
  },
});

export default {
  uploadImageAPI, createReportAPI, loginAPI,
};
