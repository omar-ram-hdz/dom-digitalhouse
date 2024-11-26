// Imports
import { getCurrent } from "./utils/getData.js";
import handleVisibility from "./dom/handleVisibility.js";
import getDateTime from "./utils/getDateTime.js";
import kelvin2Celsius from "./utils/kelvin2Celsius.js";
import capitalize from "./utils/capitalize.js";

// Variables
const d = document,
  { log } = console;
const toggleLoader = handleVisibility(".loader", "hidden");
const toggleSection = handleVisibility("#weather-current", "hidden");
const $title = d.getElementById("title");
let currentData = {};
const $form = d.querySelector("form");
const $section = d.getElementById("weather-current");

// Funciones
const render = (data) => {
  $title.innerText = `Pronóstico de ${data.name}`;
  let time = $section.querySelector("#weather-current-time");
  let datetime = getDateTime();
  time.setAttribute("datetime", datetime);
  time.innerText = datetime;
  let icon = $section.querySelector("#weather-icon");
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = data.weather[0].description;
  $section.querySelector("#weather-temperature").innerText =
    kelvin2Celsius(data.main.temp) + "°C";
  $section.querySelector("#weather-description").innerText = capitalize(
    data.weather[0].description
  );
  $section.querySelector("#weather-sensacion").innerText =
    "Sensación:" + kelvin2Celsius(data.main.feels_like) + "°C";
  $section.querySelector(
    "#weather-velocidad"
  ).innerText = `Velocidad del viento: ${data.wind.speed}`;
  toggleSection();
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = $form.q.value;
  toggleLoader();
  getCurrent(city)
    .then((res) => {
      currentData = res;
      if (res.status === 404) {
        $title.innerText = `La ciudad "${city}" no se encontró`;
      } else {
        render(res);
      }
    })
    .catch((err) => {
      log(err);
      $title.innerText = "Algo salió mal, inténtalo otra vez mas tarde";
    })
    .finally(() => toggleLoader());
});
