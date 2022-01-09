import axios from 'axios';

import dotenv from 'dotenv';

const envFound = dotenv.config(); //Loads .env file content into | process.env

export const axiosMDR = axios.create({
    baseURL: process.env.REACT_APP_MDR_URL
});

export const axiosMDV = axios.create({
    baseURL: process.env.REACT_APP_MDV_URL
});