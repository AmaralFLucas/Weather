let button = document.querySelector('.search-city');
let container = document.querySelector('.search-city');
let form = document.querySelector('.form-city');
let cidade = document.querySelector('.city-name');
let date = document.querySelector('.date');
let week_day = document.querySelector('.week-day');
let icon = document.querySelector('.icon');
let text = document.querySelector('.text');
let degrees = document.querySelector('.degrees');
let feels_like = document.querySelector('.feels-like');
let temp_min = document.querySelector('.temp-min');
let temp_max = document.querySelector('.temp-max');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    getCities(button.value);
});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    getForecast(button.value);
});

async function getCities(city){
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ea789715fd944c3387b220657241104&q=${city}`);
    let data = await response.json();
    console.log(data);
    if(data.error){
        cidade.innerHTML = '<p>Cidade não pode ser encontrada</p>';
    }else{
        cidade.innerHTML = data.location.name;
        icon.innerHTML = `<img src = "${data.current.condition.icon}">`;
        text.textContent = data.current.condition.text;
        feels_like.textContent = data.current.feelslike_c;
        degrees.textContent = `${data.current.temp_c}°`;
        wind.textContent = `Vento: ${data.current.wind_kph} km/h`;
        humidity.textContent = `${data.current.humidity}%`;
        date.textContent = data.current.last_updated;

        const today = new Date();
        const formattedDate = formatDate(today);
        const weekday = getWeekday(today);
        document.querySelector('.date').innerText = formattedDate;
        document.querySelector('.week-day').innerText = weekday.toUpperCase();
    }
}

async function getForecast(city){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ea789715fd944c3387b220657241104&q=${city}&days=1&aqi=no&alerts=no`);
    let data = await response.json();
    console.log(data);
    if(data.error){
        cidade.innerHTML = '<p>Cidade não pode ser encontrada</p>'
    }else{
        temp_min.textContent = `${data.forecast.forecastday[0].day.mintemp_c}°`
        temp_max.textContent = `${data.forecast.forecastday[0].day.maxtemp_c}°`
    }
}

function formatDate(dateString){
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    return `${day} ${monthNames[monthIndex]}`
}

function getWeekday(dateString){
    const date = new Date(dateString);
    const weekdayIndex = date.getDay();
    const weekdayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    return weekdayNames[weekdayIndex];
}