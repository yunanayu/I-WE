import axios from "axios";

export const getInfo = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/api/info/1'
      });
      console.log(response.data)
    } catch (error) {
      console.log(error);
      throw error;
    }
  };