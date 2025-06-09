import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const contactService = {
  createContact: async (data, token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/contacts`, 
        data, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error in contactService:', error);
      throw error;
    }
  }
};

export default contactService;