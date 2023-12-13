const btn = document.getElementById("btn");
const input = document.getElementById("input");
const countryName = document.getElementById("name");
const latitude = document.getElementById("latitude");
const longtitude = document.getElementById("longtitude");
const weather = document.getElementById("weather");
const temp = document.getElementById("temp");
const errorDiv = document.getElementById("error");
const ul = document.getElementById("ul");
const sendData = async () => {
  try {
    const res = await fetch(
      "http://www.localhost:3000/service?address=" + input.value
    );
    const data = await res.json();
    if (data.error) {
      errorDiv.innerText = data.error;
      ul.style.display = "none";
      errorDiv.style.display = "block";
    } else {
      console.log(data);
      ul.style.display = "flex";
      errorDiv.style.display = "none";
      countryName.innerText = data.countryName;
      latitude.innerText = data.latitude;
      longtitude.innerText = data.longtitude;
      weather.innerText = data.currentWeather;
      temp.innerText = data.temp;
    }
  } catch (e) {
    console.log(e);
  }
};

btn.addEventListener("click", sendData);
