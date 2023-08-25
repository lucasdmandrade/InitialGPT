import axios from 'axios';

const gptApi = axios.create({
  baseURL: process.env.GPT_API,
  timeout: 10000,
});

export default gptApi;
