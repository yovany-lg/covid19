import axios from 'axios';
import { transformCountryData, transformCountryLatest } from './transformers';

export const getCountryTimeline = (code) => {
  return axios.get(`https://corona.lmao.ninja/v2/historical/${code}`)
    .then(response => transformCountryData(response))
}

export const getCountryLatest = (code) => {
  return axios.get(`https://corona.lmao.ninja/countries/${code}`)
    .then(response => transformCountryLatest(response))
}

export const getGeoInfo = () => {
  return axios.get('https://ipapi.co/json/').then((response) => {
      const { data } = response;
      return { countryCode: data.country_code_iso3, countryName: data.country_name };
  });
};

export const getCountriesTotals = () => {
  return axios.get('https://corona.lmao.ninja/countries').then((response) => {
      const { data } = response;
      return data.map(item => ({ id: item.countryInfo.iso3, value: item.deaths }));
  });
}

// export const loadCountryInfo = (iso3Code) => {
//   return axios.get(`https://corona.lmao.ninja/countries/${iso3Code}`).then((response) => response.data);
// }