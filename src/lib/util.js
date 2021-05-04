import axios from 'axios';

export default function carsUtil() {
  return {
    URL: 'http://www.cartrawler.com/ctabe/cars.json',
    fetchData: (url) => {
      return new Promise(async (resolve, reject) => {
        try {
          let data = await axios.get(url);
          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    },
  };
}
