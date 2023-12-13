const express = require("express");
const PORT = 3000;
const geo = require("./utils/geo");
const weather = require("./utils/weather");
const path = require("path");
const app = express();
const hbs = require("hbs");
const cors = require("cors");
/* const exphbs = require("express-handlebars"); */
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, ".", "public", "views"));
hbs.registerPartials(path.join(__dirname, ".", "public", "partials"));
app.get("/", (req, res) => {
  res.render("index", {
    welcome: "Welcome to Our Server",
  });
});

app.get("/service", (req, res) => {
  geo.getLocation(req.query.address, (err, data) => {
    if (err) {
      return res.send({ success: false, error: "Country name Wrong" });
    } else {
      weather.getWeather(data.latitude, data.longtitude, (err, weatherData) => {
        if (err) {
          return res.send({ success: false, error: "Cant get all data" });
        } else {
          return res.send({
            countryName: req.query.address,
            latitude: data.latitude,
            longtitude: data.longtitude,
            currentWeather: weatherData.currentWeather,
            temp: weatherData.temperature,
          });
        }
      });
    }
  });
});
app.get("/w", (req, res) => {
  console.log(req.query);
  res.render("weather", {});
});

app.listen(PORT, () => {
  console.log(`Server Start at port:${PORT}`);
});
