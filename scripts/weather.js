

const weather = {
  temperature:{
    value:0,
    unit:"celsius"
  },
  description:'Nothing',
  iconId:'unkown',
  city:'-',
  country:'-'
};
if (navigator.geolocation) {
    var location_timeout = setTimeout("geolocFail()", 10000);

    navigator.geolocation.getCurrentPosition(function(position) {
        clearTimeout(location_timeout);

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        getWeather(latitude,longitude);
      },
      function(error) {
        clearTimeout(location_timeout);
        alert(`Error ${error.code} ${error.message}`);
        geolocFail();
      },
      {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
} else {
    geolocFail();
}

var geolocFail = () =>{
  alert('Sorry,failed to load leolocation service');
  return;
}

const KELVIN = 273;
const key ="96f70a610a2b066259b75fc8d23eab98"
function getWeather(lat,lon){
  let api =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  fetch(api).then(response => {
	             let data = response.json();
               return data;
                })
              .then(data=>{
                weather.temperature.value = Math.round(data.main.temp - KELVIN);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
                return weather;
              }).then(weather=>{
                showResult(weather);
              });
}
function getWeatherByCity(city){
  let api =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
  fetch(api).then(handleErrors).then(response =>{
      let data = response.json();
      return data;
  })
  .then(data =>{
    weather.temperature.value = Math.round(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    return weather;
  }).then(weather=>{
    showResult(weather);
  }).catch(error => {
    alert(error);
  })
}
const submit = document.getElementById("submit");
submit.addEventListener("click",chechInput);
var temperature = Math.floor(Math.random()*26)+10;

const searchbar = document.getElementById("searchbar");

function chechInput(){
  let input = searchbar.value;
  if(!input) {
    alert("Please enter the city name you want to check!")
    return;
  }
  else{
    getWeatherByCity(input);
  }
}

var showResult = (weather)=>{
  if(!document.getElementById) return false;
  if(!document.getElementById("img")) return false;
  if(!document.getElementById("cityName")) return false;
  if(!document.getElementById("temp")) return false;


  var img = document.getElementById("img");
  var cityName = document.getElementById("cityName");
  var temp = document.getElementById("temp");
  var desc = img.nextSibling.nextSibling;

  temp.addEventListener('click',()=>{

    if(weather.temperature.unit ==='celsius'){
      let fahrenheit = Math.floor(weather.temperature.value *9/5 +32);
      temp.innerHTML = fahrenheit + "°F";
      weather.temperature.unit = 'fahrenheit';
    }
    else{
      temp.innerHTML = weather.temperature.value +"°C";
      weather.temperature.unit = "celsius";
    }
  })

  cityName.innerHTML = weather.city+','+weather.country;
  temp.innerHTML = weather.temperature.value+"°C";
  img.setAttribute("src",`./images/${weather.iconId}.png`);
  desc.innerHTML = weather.description;
}
