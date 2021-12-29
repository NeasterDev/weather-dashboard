var weatherInfoEl = document.querySelector(".weather-info");
var forecastInfoEl = document.querySelector(".forecast-info");
var citySearchFormEl = document.querySelector(".city-search-form");
var searchResultFormEl = document.querySelector(".search-result-form");

var citySearchEl = document.querySelector("#city-search");
var cityResultEl = document.querySelector("#result");
var weatherHeaderEl = document.querySelector("#weather-header");
var weatherTempEl = document.querySelector("#weather-temp");
var weatherWindEl = document.querySelector("#weather-wind");
var weatherHumidityEl = document.querySelector("#weather-humidity");
var weatherUvEl = document.querySelector("#weather-uv");

var appId = "ef8fa03f5832204a6c4c00587e87395b";
var storageCounter = 0;

var newResult = function(cityName,num) {
    if(cityName) {
        var newResult = document.createElement('input');
        newResult.setAttribute('type', 'submit');
        newResult.setAttribute('id', 'result');
        newResult.setAttribute('name', 'result');
        newResult.setAttribute('value', cityName);
        // append result element
        searchResultFormEl.append(newResult);
    
        localStorage.setItem("city" + num, cityName);
    }
}

citySearchFormEl.addEventListener("submit", function(event){
    event.preventDefault();
    cityName = citySearchEl.value.split(" ");
    
    while(forecastInfoEl.firstChild) {
        forecastInfoEl.removeChild(forecastInfoEl.firstChild);
    }

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=ef8fa03f5832204a6c4c00587e87395b";
    var newUrl = "";
    var datas = {};
    var lat, lon = "";

    fetch(url).then(function(result) {
        return result.json();
    }).then(function(data) {
        if(data.cod === "404") {
            console.log("City not found");
        }
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
            if(datas.cod !== "404") {
                console.log(datas);
                weatherHeaderEl.textContent = cityName;
                weatherTempEl.textContent = "Temp: " + JSON.stringify(datas.current.temp) + " \xB0" + "F";
                weatherWindEl.textContent = "Wind: " + JSON.stringify(datas.current.wind_speed) + " mph";
                weatherHumidityEl.textContent = "Humidity: " + JSON.stringify(datas.current.humidity) + "%";
                weatherUvEl.textContent = "UV Index: " + JSON.stringify(datas.current.uvi);

                for (var i = 0; i < searchResultFormEl.children.length; i++) {
                    // check if the city has already been searched
                    if(searchResultFormEl.children[i].value == cityName) {
                        console.log("Found duplicate search");
                        cityName = "";
                    }
                }
                // create new result element
                newResult(cityName, ++storageCounter);
                
                var currentDate = new Date();
                var currentMonth = new Date();
                var monthCounter = currentMonth.getMonth();
                monthCounter = monthCounter + 1;
                var currentYear = new Date();
                console.log(datas);
                for(var i = 0; i < 5; i++) {
                    
                    var iconUrl = "http://openweathermap.org/img/wn/" + JSON.stringify(datas.daily[i].weather[0].icon).replaceAll('"', "") +"@2x.png";
                    
                    // create new forecast box
                    var forecastBoxEl = document.createElement("div");
                    forecastBoxEl.setAttribute("class", "forecast-box");

                    // create new date 
                    var forecastDateEl = document.createElement('h3');
                    forecastDateEl.setAttribute("class", "forecast-date");
                    forecastDateEl.textContent = monthCounter + "/" + currentDate.getDate() + "/" + currentYear.getFullYear();
                    currentDate.setDate(currentDate.getDate() + 1);

                    // create new span to hold icon
                    var forecastIconSpanEl = document.createElement("span");
                    forecastIconSpanEl.setAttribute("class", "forecast-icon-span");

                    // create new img tag for the icon
                    var forecastIconEl = document.createElement('img');
                    forecastIconEl.setAttribute('class', 'forecast-icon');

                    // create temperature tag
                    var tempEl = document.createElement("h4");
                    tempEl.textContent = datas.daily[i].temp.day + "\xB0" + " f";

                    // create wind tag
                    var windEl = document.createElement("h4");
                    windEl.textContent = "Wind: " + datas.daily[i].wind_speed + " mph";

                    // create humidity tag
                    var humidityEl = document.createElement("h4");
                    humidityEl.textContent = "Humidity: " + datas.daily[i].humidity + "%";
                    
                    console.log(iconUrl);
                    forecastIconEl.setAttribute('src', iconUrl);

                    // append the forecast box to the screen
                    forecastInfoEl.append(forecastBoxEl);

                    // append date to box
                    forecastBoxEl.append(forecastDateEl);

                    // append span and img to box
                    forecastBoxEl.append(forecastIconSpanEl);
                    forecastIconSpanEl.append(forecastIconEl);

                    // append temp/wind/humidity to box
                    forecastBoxEl.append(tempEl);   
                    forecastBoxEl.append(windEl);
                    forecastBoxEl.append(humidityEl);
                }

            }
        });
    });
});

searchResultFormEl.addEventListener("click", function(event) {
    event.preventDefault();

    while(forecastInfoEl.firstChild) {
        forecastInfoEl.removeChild(forecastInfoEl.firstChild);
    }
    if(event.target.value) {
        var input = event.target.value.split(" ");
        console.log("0" + input[0]);
        console.log("1" + input[1]);
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + input[0] + "&units=imperial&appid=" + appId;
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
            
                var currentDate = new Date();
                var currentMonth = new Date();
                var monthCounter = currentMonth.getMonth();
                monthCounter = monthCounter + 1;
                var currentYear = new Date();
                console.log(datas);
                for(var i = 0; i < 5; i++) {
                    
                    var iconUrl = "http://openweathermap.org/img/wn/" + JSON.stringify(datas.daily[i].weather[0].icon).replaceAll('"', "") +"@2x.png";
                    
                    // create new forecast box
                    var forecastBoxEl = document.createElement("div");
                    forecastBoxEl.setAttribute("class", "forecast-box");

                    // create new date 
                    var forecastDateEl = document.createElement('h3');
                    forecastDateEl.setAttribute("class", "forecast-date");
                    forecastDateEl.textContent = monthCounter + "/" + currentDate.getDate() + "/" + currentYear.getFullYear();
                    currentDate.setDate(currentDate.getDate() + 1);

                    // create new span to hold icon
                    var forecastIconSpanEl = document.createElement("span");
                    forecastIconSpanEl.setAttribute("class", "forecast-icon-span");

                    // create new img tag for the icon
                    var forecastIconEl = document.createElement('img');
                    forecastIconEl.setAttribute('class', 'forecast-icon');

                    // create temperature tag
                    var tempEl = document.createElement("h4");
                    tempEl.textContent = datas.daily[i].temp.day + "\xB0" + " f";

                    // create wind tag
                    var windEl = document.createElement("h4");
                    windEl.textContent = "Wind: " + datas.daily[i].wind_speed + " mph";

                    // create humidity tag
                    var humidityEl = document.createElement("h4");
                    humidityEl.textContent = "Humidity: " + datas.daily[i].humidity + "%";
                    
                    console.log(iconUrl);
                    forecastIconEl.setAttribute('src', iconUrl);

                    // append the forecast box to the screen
                    forecastInfoEl.append(forecastBoxEl);

                    // append date to box
                    forecastBoxEl.append(forecastDateEl);

                    // append span and img to box
                    forecastBoxEl.append(forecastIconSpanEl);
                    forecastIconSpanEl.append(forecastIconEl);

                    // append temp/wind/humidity to box
                    forecastBoxEl.append(tempEl);   
                    forecastBoxEl.append(windEl);
                    forecastBoxEl.append(humidityEl);
                } 
            });
        });
    }
});
