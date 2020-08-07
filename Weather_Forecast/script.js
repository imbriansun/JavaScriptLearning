function handleResponse(response){
    // Handling backgroundImg
    switch (response.result.weather){
        case "晴":
            document.body.style.backgroundImage = 'url("https://s1.ax1x.com/2020/08/06/agwbgH.png")';
            break;
        case "多云":
        case "阴":
        case "雾":
            document.body.style.backgroundImage = 'url("https://s1.ax1x.com/2020/08/06/agwMnI.png")';
            break;
        case "雷阵雨":
        case "小雨":
        case "中雨":
        case "大雨":
        case "雨":
            document.body.style.backgroundImage = 'url("https://s1.ax1x.com/2020/08/06/ag0ivj.png")';
            break;
        default:
            document.body.style.backgroundImage = 'url("https://s1.ax1x.com/2020/08/06/ag0ILn.png")';
            break;
    }
    // Handling intradayWeatherInfo
    var cityHeader = document.getElementById("cityHeader");
    var temperatureElement = document.getElementById("temperature");
    var weatherDescriptionHeader = document.getElementById("weatherDescriptionHeader");
    var windSpeedHeader = document.getElementById("windSpeed");
    var humidityElement = document.getElementById("humidity");
    var weatherIcon = document.getElementById("documentIconImg");

    weatherIcon.src = "https://www.jisuapi.com/weather/static/images/weathercn/"+response.result.img+".png";

    cityHeader.innerHTML = response.result.city;
    weatherDescriptionHeader.innerText = response.result.weather;
    temperatureElement.innerHTML = Math.floor(response.result.temp) + "&#176";
    windSpeedHeader.innerHTML = response.result.winddirect + " " + response.result.windpower;
    humidityElement.innerHTML = "湿度：" + response.result.humidity + "%";


    // Handling weeklyWeatherInfo
    var weeklyWeatherList = document.getElementById("weeklyWeatherList");

    for (var i = 0; i < 7; i++) {
        var thisDayInfo = document.createElement("li");
        thisDayInfo.setAttribute("class","item");
        thisDayInfo.setAttribute("style", "width: 92px");
        
        var dateNode = document.createElement("p");
        dateNode.innerText = response.result.daily[i].date;
        thisDayInfo.appendChild(dateNode);

        var weekNode = document.createElement("p");
        weekNode.innerText = response.result.daily[i].week;
        thisDayInfo.appendChild(weekNode);

        var dayTimeNode = document.createElement("div");
        var dayTimeDescription = document.createElement("p");
        dayTimeDescription.innerText = response.result.daily[i].day.weather;
        dayTimeNode.appendChild(dayTimeDescription);
        var dayTimeImg = document.createElement("img");
        dayTimeImg.setAttribute("class","icon");
        var imgUrl = "https://www.jisuapi.com/weather/static/images/weathercn/" + response.result.daily[i].day.img +".png";
        dayTimeImg.setAttribute ("src", imgUrl);
        dayTimeNode.appendChild(dayTimeImg);
        thisDayInfo.appendChild(dayTimeNode);

        var nightTimeNode = document.createElement("div");
        var nightTimeDescription = document.createElement("p");
        nightTimeDescription.innerText = response.result.daily[i].night.weather;
        nightTimeNode.appendChild(nightTimeDescription);
        var nightTimeImg = document.createElement("img");
        nightTimeImg.setAttribute("class","icon");
        var imgUrl = "https://www.jisuapi.com/weather/static/images/weathercn/" + response.result.daily[i].night.img +".png";
        nightTimeImg.setAttribute("src", imgUrl);
        nightTimeNode.appendChild(nightTimeImg);
        thisDayInfo.appendChild(nightTimeNode);

        weeklyWeatherList.appendChild(thisDayInfo);
    }


    // Handling weeklyWeatherInfo
    var hourlyWeatherList = document.getElementById("hourlyWeatherList");







    // setPositionForWeatherInfo
    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
    var weatherContainer = document.getElementById("weatherContainer");
    var weeklyWeatherContainer = document.getElementById("weeklyWeatherContainer");

    weatherContainer.style.visibility = "visible";
    weeklyWeatherContainer.style.visibility = "visible";
}


function searchWeather(searchTerm){
    var script = document.createElement("script");
    script.src = "https://api.jisuapi.com/weather/query?appkey=bd87493350ec7055&city="+searchTerm+"&callback=handleResponse";
    document.body.insertBefore(script, document.body.firstChild);
}


document.getElementById("searchBtn").addEventListener("click", function(){
    var searchTerm = document.getElementById("searchInput").value;
    if(searchTerm){
        searchWeather(searchTerm);
    }
})

