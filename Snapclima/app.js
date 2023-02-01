//interação
const citySearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')
//exibição
const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
 const currentTemperature = document.getElementById("current-temperature");
const windSpeed = document.getElementById("wind-speed");
const feelsLikeTemperature = document.getElementById("feels-like-temperature");
const currentHumidity = document.getElementById("current-humidity");
 const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");


const api_key = "9655dc6b1081c7f4d89e2fc74d2c493c"


citySearchButton.addEventListener("click", () =>{
      let cityName = citySearchInput.value
      getCityWeather(cityName)
})

alert('Olá, digite o nome de uma cidade')

//Inicio de sistema de Geolocalização
/*
navigator.geolocation.getCurrentPosition((position) =>{

let lat = position.coords.latitude
let lon = position.coords.longitude

getCurrentLocationWeather(lat, lon)
 
}
,(err) =>{
    if(err.code === 1){
        alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade na barra de pesquisa.")
    }else{
        console.log(err)
    }
})
*/
//Fim de sistema de Geolocalização

function getCurrentLocationWeather(lat , lon){

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metrics&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data)=> displayWeather(data))   

}



function getCityWeather(cityName) {
    weatherIcon.src=`/assets/loading-icon.svg`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))

}
function displayWeather(data){
let{ dt,
    name,
    weather: [{icon,description}],
    main: {temp,feels_like, humidity},
    wind: {speed},
    sys: {sunrise, sunset}
} = data

currentDate.textContent = formatDate(dt);
cityName.textContent = name;
weatherIcon.src=`/assets/${icon}.svg`;
weatherDescription.textContent = description;
currentTemperature.textContent =`${Math.round(temp/1)}°C`;
windSpeed.textContent = `${Math.round(speed*3.6)}Km`;
feelsLikeTemperature.textContent = `${Math.round(feels_like/1)}°C`;
currentHumidity.textContent = `${humidity}%`;
sunriseTime.textContent = formatTime(sunrise);
sunsetTime.textContent = formatTime(sunset);

}

function formatDate(epochTime){
    let date = new Date(epochTime * 1000)
    let formattedDate=date.toLocaleDateString('pt-BR', {month:"long", day:'numeric' })
    return `Hoje, ${formattedDate}`
}

// formatação hora nascer e Por-do-sol

function formatTime(epochTime){
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()

    return `${hours}:${minutes}`

}
