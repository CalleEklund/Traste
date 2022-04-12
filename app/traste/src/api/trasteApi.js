import axios from 'axios';

const baseURL = 'http://localhost:5001/traste-71a71/europe-west3/app';

/**
 * Upploads an image to the backend at the endpoint /uploadimage.
 * Cointains neccesary header for an image.
 */
export const uploadImageAPI = axios.create({
  baseURL: baseURL + '/uploadimage',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Uploads the report to the backend at the endpoint /createreport.
 */
export const createReportAPI = axios.create({
  baseURL: baseURL + '/createreport',
});

export default {
  uploadImageAPI, createReportAPI,
};
