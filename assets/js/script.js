var weatherInfoEl = document.querySelector(".weather-info");
var forecastInfoEl = document.querySelector(".forecast-info");
var citySearchFormEl = document.querySelector(".city-search-form");
var searchResultForm = document.querySelector(".search-result-form")

var citySearchEl = document.querySelector("#city-search");
var cityResultEl = document.querySelector("#result");
var weatherHeaderEl = document.querySelector("#weather-header");
var weatherTempEl = document.querySelector("#weather-temp");
var weatherWindEl = document.querySelector("#weather-wind");
var weatherHumidityEl = document.querySelector("#weather-humidity");
var weatherUvEl = document.querySelector("#weather-uv");

var appId = "ef8fa03f5832204a6c4c00587e87395b";


citySearchFormEl.addEventListener("submit", function(event){
    event.preventDefault();
    cityName = citySearchEl.value;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=ef8fa03f5832204a6c4c00587e87395b";
    var datas = {};
    fetch(url)
    .then(function(result) {
        return result.json();
    }).then(function(data) {
        datas = data;
    }).then(function() {
        console.log(datas);
        weatherHeaderEl.textContent = JSON.stringify(datas.name).replaceAll('"', "");
    });
    
    // create new result element
    var newResult = document.createElement('input');
    newResult.setAttribute('type', 'submit');
    newResult.setAttribute('id', 'result');
    newResult.setAttribute('name', 'result');
    newResult.setAttribute('value', cityName);
    // append result element
    searchResultForm.append(newResult);
});

searchResultForm.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.value) {
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + event.target.value + "&units=imperial&appid=" + appId;
        var newUrl = "";
        var datas = {};
        var lat, lon = "";

        fetch(url).then(function(result) {
            return result.json();
        }).then(function(data) {
            console.log(data);
            lat = JSON.stringify(data.coord.lat);
            lon = JSON.stringify(data.coord.lon);
        }).then(function(){
            console.log("LAT: " + lat + "  LON: " + lon);
            newUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=ef8fa03f5832204a6c4c00587e87395b";
        }).then(function(){
            fetch(newUrl).then(function(result) {
                return result.json();
            }).then(function(data) {
                datas = data;
            }).then(function() {
                console.log(datas);
                weatherHeaderEl.textContent = event.target.value;
                weatherTempEl.textContent = "Temp: " + JSON.stringify(datas.current.temp) + " \xB0" + "F";
                weatherWindEl.textContent = "Wind: " + JSON.stringify(datas.current.wind_speed) + " mph";
                weatherHumidityEl.textContent = "Humidity: " + JSON.stringify(datas.current.humidity) + "%";
                weatherUvEl.textContent = "UV Index: " + JSON.stringify(datas.current.uvi);
            });
        });
    }
});

