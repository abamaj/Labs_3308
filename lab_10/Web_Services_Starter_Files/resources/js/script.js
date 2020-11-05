//helper functions
var dayOfWeek = "";
function formatDate(date, month, year)
{
  month = (month.length < 2) ? ('0' + month) : month;
  date = (date.length < 2)? ('0' + date) : date;
  return [year,month,date].join('-');
}
function getDayofWeek(date, month, year){
  var week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayOfWeek =  week_names[new Date([month,date,year].join('-')).getDay()];
}
function getFarenheitTemp(temp){
  return (9*temp/5)+32;
}

//run when the document object model is ready for javascript code to execute
$(document).ready(function() {
  var url ='https://api.weatherstack.com/forecast?access_key=5bc82451636190abd9d7afe6fe9b20b5&query=40,-105.3&forecast_days=5';
  $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
    console.log(data);
    console.log("Current Temp: " + data.current.temperature);
    var current_time = new Date(data.location.localtime);
    console.log(current_time.getDay());
    document.getElementById("heading").innerHTML = "Today's Weather Forecast - " + data.location.name
    var image_today = document.getElementById("image_today").setAttribute("src", data.current.weather_icons[0])
    document.getElementById("temp_today").innerHTML = "Temperature " + getFarenheitTemp(data.current.temperature)
    document.getElementById("thermometer_inner").setAttribute("innerHeight", getFarenheitTemp(data.current.temperature))
    document.getElementById("precip_today").innerHTML = data.current.precip + "%"
    document.getElementById("humidity_today").innerHTML = data.current.humidity + "%"
    document.getElementById("wind_today").innerHTML = data.current.wind_speed
    document.getElementById("summary_today").innerHTML = data.current.weather_descriptions[0]
    document.getElementById("local_time").innerHTML = data.location.localtime

    if (getFarenheitTemp(data.current.temperature) > 85) {
      document.getElementById("thermometer_inner").style.backgroundColor = 'red';
    } else if (getFarenheitTemp(data.current.temperature) < 65) {
      document.getElementById("thermometer_inner").style.backgroundColor = 'blue';
    } else {
      document.getElementById("thermometer_inner").style.backgroundColor = 'grey';
    }
    
    
    function getKey(i){
        var week_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
        dayOfWeek=week_names[new Date(Object.keys(data.forecast)[i]).getDay()];
        return data.forecast[Object.keys(data.forecast)[i]];
        
    }
    let text = "";
    let n = 0
         while (n < 5) {
             let day = getKey(n)
             n++
             text += `<div style="width: 20%;">
         <div class="card">
           <div class="card-body">
             <h5 class="card-title">${dayOfWeek}</h5>
             <p class="card-text">High: ${day.maxtemp}<br>
               Low: ${day.mintemp}<br>
               Sunrise: ${day.astro.sunrise}<br>
               Sunset: ${day.astro.sunset}</p>
           </div>
         </div>
       </div>\n`
         }
     document.getElementById("5_day_forecast").innerHTML = text;
  })
});
