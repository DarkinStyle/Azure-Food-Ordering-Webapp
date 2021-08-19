$(function () {

    $('.datetime').html(new Date().toLocaleString('en-us', { weekday: 'long' }) + " " + new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));

    // if ('geolocation' in navigator) {
    //     navigator.geolocation.getCurrentPosition(setWeather, showError);
    // } else {
    //     $('.weather-card').html('<h3 class = "text-center">Your browser does not support weather and geolocation 🏠</h3>');
    // }

    setWeather();

    function setWeather(position) {

        // Stall Coords 3.081592, 101.737589
        // let lat = position.coords.latitude;
        // let long = position.coords.longitude;

        let lat = 3.114319;
        let long = 101.730005;
        let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d751f3ea4b5239e8e4ff67157e71dc03`;

        currentLoc = {};
        currentLoc.lat = lat;
        currentLoc.long = long;

        localStorage.setItem('confirmedLoc', JSON.stringify(currentLoc));

        $.getJSON(api, function (data) {
            $('.city-name').html(data.name);
            $('.cur-temp').html(`${(data.main.temp - 273.15).toFixed(2)}°C`);
            $('.cur-weather').html(`${(data.weather[0].description).toUpperCase()}`);
            $('img.weather-icon').attr("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

            let currentTime = new Date();
            let tomorrowTime = new Date(currentTime);
            
            if (!(currentTime.getHours() >= 0 && currentTime.getHours() < 12))
                tomorrowTime.setDate(tomorrowTime.getDate() + 1);

            tomorrowTime.setHours(10);

            if (!(currentTime.getHours() >= 10 && currentTime.getHours() < 22))
                $('.stall-status').html(`We are closed! We will open in ${diffHours(currentTime, tomorrowTime)} ${diffHours(currentTime, tomorrowTime) == 1 ? 'hour' : 'hours'} 😴`);
            else if ((data.weather[0].id >= 200 && data.weather[0].id <= 232) || (data.weather[0].id >= 300 && data.weather[0].id <= 321) || (data.weather[0].id >= 500 && data.weather[0].id <= 531))
                $('.stall-status').html("We are closed due to bad weather ☔");

        })
            .fail(function () {
                $('.weather-card').html('<h3 class = "text-center">Your browser does not support weather and geolocation 🏠</h3>');
                $('.stall-status-c').hide();
            });
    }

    // function showError(error) {
    //     switch (error.code) {
    //         case error.PERMISSION_DENIED:
    //             $('.weather-card').html('<h3 class = "text-center">Your have declined weather and geolocation support 😢</h3>');
    //             $('.stall-status-c').hide();
    //             break;
    //     }
    // }

    function diffHours(start, end) {
        let temp = end - start;
        return Math.floor(temp / 1000 / 60 / 60);
    }
});
