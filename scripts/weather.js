
var temperature = Math.floor(Math.random()*26)+10;

// var city = ()=>{
//   var cities =["paris", "Sydney","Shanghai","NewYork"];
//   let i = Math.floor((Math.random()*10))%cities.length;
//   return cities[i];
// }

var cities =["paris", "sydney","shanghai","newyork"];
const searchbar = document.getElementById("searchbar");

function chechInput(){

  let input = searchbar.value;
  if(!input) {
    alert("Please enter the city name you want to check!")
    return;
  }
  if(!cities.includes(input.toLowerCase())){
    alert(`Sorry, we don't have the data of ${input}. Please try other cities.`)
    return;
  }
  else{
    temperature = Math.floor(Math.random()*26)+10;
    console.log(input);
    showResult(temperature,input);
  }
}
//var desc = getDesc(temp);
const submit = document.getElementById("submit");
submit.addEventListener("click",chechInput);

var showResult = (temperature,city)=>{
  if(!document.getElementById) return false;
  if(!document.getElementById("img")) return false;
  if(!document.getElementById("cityName")) return false;
  if(!document.getElementById("temp")) return false;


  var img = document.getElementById("img");
  var cityName = document.getElementById("cityName");
  var temp = document.getElementById("temp");
  var desc = img.nextSibling.nextSibling;

  if(temperature > 30){
    cityName.innerHTML = city;
    temp.innerHTML = temperature+"°C";
    img.setAttribute("src","./images/sun.gif");
    desc.innerHTML = "So Hot!";
    return "So hot.";
  }
  else if(temperature>25){
    cityName.innerHTML = city;
    temp.innerHTML = temperature+"°C";
    img.setAttribute("src","./images/cloud1.gif");
    desc.innerHTML ="The weather is nice!";
    return "The weather is nice!";
  }
  else if(temperature>20){
    cityName.innerHTML = city;
    temp.innerHTML = temperature+"°C";
    img.setAttribute("src","./images/cloud.gif");
    desc.innerHTML ="Cloud";
    return "Cloud";
  }
  else if(temperature>15){
    cityName.innerHTML = city;
    temp.innerHTML = temperature+"°C";
    img.setAttribute("src","./images/thunder.gif");
    desc.innerHTML ="Thunder";
    return "thunder";
  }
  else{
    cityName.innerHTML = city;
    temp.innerHTML = temperature+"°C";
    img.setAttribute("src","./images/rain.gif");
    desc.innerHTML ="Rain";
    return "rain";
  }
}
// var data = [
//   {city:city(),temp:temperature,desc:showResult(temperature)}
// ]

//console.log(data);
