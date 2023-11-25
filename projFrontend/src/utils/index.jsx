import axios from 'axios';
import { API_BASE_URL } from '../constants';

const fetchData = async (endpoint) => {
  try {
    const res = await axios.get(`${API_BASE_URL}${endpoint}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (endpoint, data) => {
  try {
    const res = await axios.post(`${API_BASE_URL}${endpoint}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const getUrlParams = () => {
  return new URLSearchParams(window.location.search);
};

const maskCreditCard = (creditCard) => {
  const maskedCreditCard = creditCard.replace(/\d(?=\d{4})/g, '*');
  return maskedCreditCard;
};

export { fetchData, getUrlParams, postData, maskCreditCard };