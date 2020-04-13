var fs = require('fs');
const countryList = require('./country_list.json');

const parsed = countryList.map(item => ({
  code: item.iso3,
  label: item.nombre,
  phone: item.phone_code,
}))

fs.writeFile('country_list_esp.json', JSON.stringify(parsed), function (err) {
  if (err) throw err;
  console.log('Saved!');
});