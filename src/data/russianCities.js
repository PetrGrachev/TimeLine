import rawCities from './russia-cities.json';

const russianCities = rawCities.map(city => city.name).sort();

export default russianCities;