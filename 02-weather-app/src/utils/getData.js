const getData = async (url, params = {}) => {
  let appid = "a7c1361a30246a0990b9d20cec948f90";
  try {
    let res = await axios.get(url, {
      params: { ...params, appid, lang: "es" },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    let statusText = err.statusText || "Ocurrió un error",
      message = err.message,
      status = err.status;
    return {
      statusText,
      message,
      status,
    };
  }
};
const getCurrent = (city) =>
  getData("https://api.openweathermap.org/data/2.5/weather", { q: city });
export { getCurrent };
