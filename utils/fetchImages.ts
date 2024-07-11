import axios from 'axios';

const fetchImages = async (pageNumber = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`,
    );
    console.log('<<<<', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export default fetchImages;
