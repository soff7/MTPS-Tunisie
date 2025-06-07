import axios from 'axios';

const API_URL = 'http://your-backend-api-url'; // Replace with your actual API URL

const contactService = {
  getContacts: async () => {
    const response = await axios.get(`${API_URL}/contacts`);
    return response;
  },
  createContact: async (data) => {
    const response = await axios.post(`${API_URL}/contacts`, data);
    return response;
  },
  updateContact: async (id, data) => {
    const response = await axios.put(`${API_URL}/contacts/${id}`, data);
    return response;
  },
  deleteContact: async (id) => {
    const response = await axios.delete(`${API_URL}/contacts/${id}`);
    return response;
  },
};

export default contactService;