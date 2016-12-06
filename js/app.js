$(document).ready(function() {
    var API_KEY = "ed7b34986576a0b179ebbcefd31ade9a";
    var location;

    function block() {
        $('.container-info').hide();
        $('.container-fluid').css('background-color', '#777');
    }


    function unblock() {
        $('.container-info').fadeIn();
        $('.loading').hide();
    }


    block();

    $.getJSON('http://ipinfo.io', function(data) {

        location = data;

        var coord = data.loc.split(",");
        var long = coord[0];
        var lat = coord[1];
        var wd;
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=metric&lat=' +
            long + '&lon=' + lat + '&APPID=' + API_KEY,
            function(apiData) {
                wd = apiData;

                var temp = wd.main.temp;
                var generalState = wd.weather[0].main;
                var city = location.city;
                var state = wd.weather[0].description;
                var iconId = wd.weather[0].id;
                var iconUrl = "wi-owm-" + iconId + "";

                console.log(generalState);

                if (generalState === 'Clouds') {
                    $('.container-fluid').css('background', "url('http:floridaphotomatt.com/wp-content/photos/2015/06/tampa-skyline-with-big-clouds-7_27_14.jpg') no-repeat center center");
                } else if (generalState === 'Clear') {
                    $('.container-fluid').css('background', "url('https://healthyposts.files.wordpress.com/2013/05/beach-wallpaper9.jpg') no-repeat center center");
                } else if (generalState === 'Rain') {
                    $('.container-fluid').css('background', "url('http://cdn.wallpapersafari.com/75/35/kWgtsU.jpg') no-repeat center center");

                } else if (generalState === 'Thunderstorm') {
                    $('.container-fluid').css('background', "url('http://cdn.wallpapersafari.com/75/35/kWgtsU.jpg') no-repeat center center");
                } else if (generalState === 'Drizzle') {
                    $('.container-fluid').css('background', "url('http://cloud-maven.com/wp-content/uploads/2014/10/DSC_0128.jpg') no-repeat center center");

                } else if (generalState === 'Snow') {
                    $('.container-fluid').css('background', "url('http://www.walldevil.com/wallpapers/a84/city-winter-snow-branch.jpg') no-repeat center center");


                }





                $(".city-info").text(city);
                $(".temp-info").text(temp);
                $(".temp-info").append("<span> ºC</span>");
                $(".state-info").text(state);

                $("#icon").addClass(iconUrl);
                unblock();

            });


    });

});