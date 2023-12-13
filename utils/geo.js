const request = require("request");

module.exports.getLocation = (country, callback) => {
  const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=pk.eyJ1IjoiYWJkZWxyYWhtYW5oMiIsImEiOiJjbHA4cnR1dzYyYnVjMmtxa3M2MjZiYjU4In0.9Al1UAgwwHiuXI8aL21fZA`;

  request({ url: geoURL, json: true }, (err, response) => {
    if (err) {
      callback("Error to Connect to server", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else if (response.body.features.length == 0) {
      callback("Unable to find location", undefined);
    } else {
      const longtitude = response.body.features[0].center[0];
      const latitude = response.body.features[0].center[1];
      callback(undefined, { longtitude, latitude });
      return { latitude, longtitude };
    }
  });
};
