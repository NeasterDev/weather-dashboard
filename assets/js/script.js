var weatherInfoEl = document.querySelector(".weather-info");
var forecastInfoEl = document.querySelector(".forecast-info");
var citySearchFormEl = document.querySelector(".city-search-form");
var searchResultForm = document.querySelector(".search-result-form")

var citySearchEl = document.querySelector("#city-search");
var cityResultEl = document.querySelector("#result");
var weatherHeaderEl = document.querySelector("#weather-header");

citySearchFormEl.addEventListener("submit", function(event){
    event.preventDefault();
    cityName = citySearchEl.value;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ef8fa03f5832204a6c4c00587e87395b";
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
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + event.target.value + "&appid=ef8fa03f5832204a6c4c00587e87395b";
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
    }
});

