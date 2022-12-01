const api_key = '#'

async function getWeather(city) {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}&units=imperial`
    );

    const data = await response.json();
    return data;
}

let form = document.querySelector('#button') 

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let query = document.querySelector('#search').value

    load_data(query)
})

const displayWeather = (name, forecast, temp_max, temp_min, humidity) => {
    const html = 
    `<h2 class="city">Weather in ${name}</h2>
        <div class="display" list-style>
            <li style="list-style:none;" class="forecast"> Forecast: ${forecast}</li>
            <li style="list-style:none;" class="temp-high"> Temperature Max: ${temp_max}</li>
            <li style="list-style:none;" class="temp-low"> Temperature Min: ${temp_min}</li>
            <li style="list-style:none;" class="forecast"> Humidity: ${humidity}</li>
        </div>`

    document.querySelector('.weather_container').insertAdjacentHTML('beforeend', html)
}

const load_data = async (query) => {
    const weather = await getWeather(query)

    const { name } = weather;
    const { temp_max, temp_min, humidity } = weather.main;
    const { description } = weather.weather[0];

    displayWeather(name, description, temp_max, temp_min, humidity)
}

