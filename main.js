$(document).ready(function() {
	var lat = "";
	var lon = "";
			$.getJSON('https://ipapi.co/json',function (json) {
				console.log(json);
				lat = json.latitude;
				lon = json.longitude;
			getWeather(lat,lon);		
			});
	function getWeather(lat,lon){
		var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?units=metric&APPID=3b430c594b0f78b779ef14e56256d2ce&callback=?';
		$.ajax({
				url: url,
				dataType: 'jsonp',
				data: {lon:lon,lat:lat},
				success: function(json, textStatus) {
				console.log(json);
				var icon = json.list[0].weather[0].icon;
				if(icon === '03n' || icon === '04n' || icon === '09n' || icon === '11n'||icon === '13n'||icon === '50n'){
					icon = icon.replace("n","d");
				}
				document.getElementById('temperature').innerHTML = '<img src=\"http://openweathermap.org/img/w/'+ icon+'.png\">' +
				json.list[0].temp.day.toFixed(1) +' &deg;C';

				document.getElementById('countryName').innerHTML = json.city.name+', '+json.city.country;
				document.getElementById('description').innerHTML = json.list[0].weather[0].description;

				if(icon === '13d'){
					$('.temp, .country, .desc').css({
						backgroundColor: '#000000',
						color: '#ffffff',
					});
				}

				var bg = 'http://res.cloudinary.com/ddqocjh3g/weatherapp/'+icon+'.jpg';
				document.body.style.background = 'url('+bg+') no-repeat 100% 100% fixed';
				document.body.style.backgroundSize = 'cover';
			}});
	}
});