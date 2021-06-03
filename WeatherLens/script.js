var lat, long;
let weather = {
    apiKey: '09ace9fd65255e26f0fa3f969d6a0004',
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
                city + "&units=metric&appid=" + this.apiKey)
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                //console.log("this is working");
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        //console.log("this is working");
        const { name } = data;
        const { temp, feels_like, humidity } = data.main;
        const { description, icon } = data.weather[0];
        const { speed } = data.wind;

        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".temp").innerHTML = temp + " °C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".feelsLike").innerHTML = "Feels like: " + feels_like + " °C";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".wind").innerHTML = "Wind Speed: " + speed + " km/h";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + " %";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";

    },
    search: function() {
        //console.log("this is working");
        this.fetchWeather(document.querySelector('.searchBar').value);
    },
};

document.querySelector('.searchButton').addEventListener('click', function() {
    weather.search();
});
document.querySelector(".searchBar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
        //console.log("enter button working");
    }
});
document.querySelector('.locate').addEventListener('click', function() {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition);
    else
        alert("Geolocation is not supported by the browser");
}

function showPosition(position) {
    lat = (position.coords.latitude);
    long = (position.coords.longitude);
    console.log(lat, long);
    fetchLatLong(lat, long);
}

function fetchLatLong(lat, long) {
    var apiKey = '09ace9fd65255e26f0fa3f969d6a0004';
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=" + apiKey)
        .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("Location not supported");
            }
            //console.log("this is working");
            return response.json();
        })
        .then((data) => weather.displayWeather(data));
}
getLocation();