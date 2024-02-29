import axios from 'axios';

export default {
  async testPost() {
    try {
      let formData = new FormData();
      const response = await axios.post('http://localhost:8000/test/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch(error) {
      console.error(error);
    }
  },
  async removeBgrImage(file, type) {
    try {
      let formData = new FormData();
      formData.append('img_src', file);
      formData.append('type', type);
      const response = await axios.post('http://localhost:8000/person/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch(error) {
      console.error(error);
    }
  }
};