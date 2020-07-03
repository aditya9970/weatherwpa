const geoTz = require("geo-tz");
const axios = require("axios");
const { min } = require("moment");
function dateconverter(ms) {
  var ap = "am";
  var date = new Date(ms * 1000);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (date.getHours() >= 12) {
    hours = hours - 12;
    ap = "pm";
  }
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes} ${ap}`;
}

console.log(dateconverter(1593783932));
