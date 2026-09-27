const apiKey = "16a425d6045ec634412772de4b323a51";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city !== ""){
        getWeather(city);
    }
});

async function getWeather(city){

    weatherCard.innerHTML = "Loading...";

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    }
    catch(error){

        weatherCard.innerHTML = `
            <p class="error">${error.message}</p>
        `;

    }

}

function displayWeather(data){

    const city = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherCard.innerHTML = `
        <h2>${city}, ${country}</h2>

        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">

        <h3>${temp} °C</h3>

        <p><strong>Weather:</strong> ${description}</p>

        <p><strong>Humidity:</strong> ${humidity}%</p>

        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
    `;
}