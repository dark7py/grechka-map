import axios from 'axios';

export const getAddressFromCoordinates = async (
  coordinates: [number, number]
): Promise<string> => {
  try {
    const API_KEY = '4d977c9b-31db-4e25-8f6d-a70fee3dee6f';
    const geoCode = `${coordinates[1]}, ${coordinates[0]}`;
    const res = await axios.get(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${geoCode}&format=json`
    );
    const { featureMember } = res.data.response.GeoObjectCollection; //get array of results from yandex API
    const address = featureMember[0].GeoObject.name;
    return address;
  } catch (err) {
    console.error(err);
    return '';
  }
};
