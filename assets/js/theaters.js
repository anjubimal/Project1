var US_key = "Amjd4cZrEZ7bRMEna72hl81GBWhQXiaB5BN5EhRC";
var US_authorization = "Basic VU5JVl80OTpxWXl1NTkxNzZ1enY=";
var sandbox_authorization = "Basic VU5JVl80OV9YWDpvSktYWmt4c1RkaWg=";
var sandbox_key = "z3JmDFRMGa1Wb0O9RsaI66csW8wG6L3N4aViIHdG";
var cities = [];
var lastSearch = "";
var revealPlace;
var optionsPlace = document.getElementById("dropdown-options");
var list = document.querySelector("#theater-list");
var config = {
	key:"72ec3ec64dmsh3a185f201e13e83p1fff16jsn8100cc7ea96c",
    url: "yahoo-weather5.p.rapidapi.com"
}
var saveCities = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
    localStorage.setItem("lastCity", JSON.stringify(lastSearch));
  };

  var loadCities = function() {
    if(localStorage.getItem("cities") != null){
    cities = JSON.parse(localStorage.getItem("cities")); 
    cities.forEach(element => {
       createOption(optionsPlace,element);        
    });
    } 
    else {
        
        cities.splice(0,cities.length);
    }
    lastSearch = JSON.parse(localStorage.getItem("lastCity"));
};

var sameCityDetector = function (city){
    var push = true;
    if(cities){
        if(cities.length>0){
         cities.forEach(element => {
            if(city === element){
                push = false;
            }
                       
        });
      }
    }
    return push;
} 
var getCoordinates = function (city){
    fetch("https://yahoo-weather5.p.rapidapi.com/weather?location="+ city +"&format=json&u=f", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": config.key,
            "x-rapidapi-host": config.url
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        cityTarget = response.location.city;
        var okPush = sameCityDetector(cityTarget);
        
        if(okPush){
             cities.push(cityTarget);
                             
        }
        lastSearch = cityTarget;
        saveCities();
        var lat = response.location.lat;
        var long = response.location.long;
        var coord = lat + ";" + long;
        getCinemas(coord,date);
    })
    .catch(err => {
        console.error(err);
        window.location.href = "error.html";
    });
    }

var createCards = function(arrayElement){
    var cardDiv = document.createElement('div');
    var cardEl = document.createElement('div');
    cardEl.className = "card";
    cardEl.classList.add("small");
    cardEl.classList.add("max-width");
    cardEl.classList.add("margin-card");
    cardEl.classList.add("smaller");
    var imageEl = document.createElement('div');
    imageEl.className = "card-image";
    imageEl.classList.add("waves-effect");
    imageEl.classList.add("waves-block");
    imageEl.classList.add("waves-light");
    var img = document.createElement('img'); 
    img.src = 'assets/images/popcorn.jpg' ;
    img.className = "actvator";
    var imgSpan = document.createElement('span');
    imgSpan.className = "centered";
    imgSpan.classList.add("card-text");
    imgSpan.innerHTML = arrayElement.cinema_name;
    imageEl.appendChild(img);
    imageEl.appendChild(imgSpan);
    var contentEl = document.createElement('div');
    contentEl.className = "class-content";
    var contentSp = document.createElement('span');
    contentSp.className = "card-title";
    contentSp.classList.add("activator");
    contentSp.classList.add("grey-text");
    contentSp.classList.add("text-darken-4");
    contentSp.innerHTML = arrayElement.address + ", " + arrayElement.address2 + ". " + arrayElement.county + ". " + '<p>Movies <i class="material-icons center blue lighten-3">more_vert</i></p>';
    contentEl.appendChild(contentSp);
    var revealEl = document.createElement('div');
    revealEl.className = "card-reveal";
    var revealSp = document.createElement('span');
    revealSp.className = "card-title";
    revealSp.classList.add("grey-text");
    revealSp.classList.add("text-darken-4");
    revealSp.innerHTML = "Movies Showing Today " + '<i class="material-icons right">close</i>';
    revealEl.appendChild(revealSp);
    getCinemaShowTimes(date_format, arrayElement.cinema_id, revealEl);
    
    
    cardEl.appendChild(imageEl);
    cardEl.appendChild(contentEl);
    cardEl.appendChild(revealEl);
    cardDiv.appendChild(cardEl);

    return cardDiv;

}

var createOption = function(optionsPlace, city) {
    var button = document.createElement('button');
    button.className = "hide-button";
    var opt = document.createElement('li');
    button.innerHTML = city;
    opt.appendChild(button);
    if(optionsPlace != null){
    optionsPlace.appendChild(opt);
    }
};

var date = moment().format();
console.log(date);
var date_format = moment().format("YYYY-MM-DD");
console.log(date_format);

var getCinemas = function(coord, date){
    console.log(date);
    console.log(coord);
var settings = {
    "url": "https://api-gate2.movieglu.com/cinemasNearby/?n=10",
    "method": "GET",
    "timeout": 0,
    "headers": {
    "geolocation":coord,
    "api-version": "v200",
    "Authorization": sandbox_authorization,
    "client": "UNIV_49",
    "x-api-key": sandbox_key,
    "device-datetime":  date,
    "territory": "XX",
    },
    };
    
    $.ajax(settings).done(function (response) {
        $("#theater-list").empty(movieCard);
        for(let i = 0; i < response.status.count; i++){
            var movieCard = createCards(response.cinemas[i]);
            $("#theater-list").append(movieCard);
        }
      
    console.log(response);
       
    })
    .catch(err => {
        console.error(err);
        window.location.href = "error.html";

    })
};

var getCinemaShowTimes = function(date, cine_id, place){
    var settings = {
        "url": "https://api-gate2.movieglu.com/cinemaShowTimes/?cinema_id="+cine_id+"&date="+date_format,
        "method": "GET",
        "timeout": 0,
        "headers": {
        "api-version": "v200",
        "Authorization": sandbox_authorization,
        "client": "UNIV_49",
        "x-api-key": sandbox_key,
        "device-datetime":  date,
        "territory": "XX",
        },
        };
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            for(let i = 0; i < response.status.count; i++){
                var revealP = document.createElement('p');
                revealP.className = "grey-text";
                revealP.innerHTML = response.films[i].film_name;
                place.appendChild(revealP);
                }
                                        
        })
        .catch(err => {
            console.error(err);
            window.location.href = "error.html";
    
        })
    };



var buttonHandler = function(event){
    var target = event.target;
     console.log(target.type);
    if(target.type === "button" || target.type === "submit"){
    var city = document.getElementById("form").value;
         if(city && target.id ==="search"){
                getCoordinates(city);
                }
         if(!city && target.id === "search"){
            window.location.href = "error.html";
            }
         if(target.type === "submit") {
             if(target.id != "drop" && target.class === "hide-button"){
              getCoordinates(target.textContent);
             }
            
            }
        }
    else {
        return null;
    }
}
elemsSidenav = document.querySelectorAll(".sidenav");
const instancesSidenav = M.Sidenav.init(elemsSidenav);

const elemsDropdown = document.querySelectorAll(".dropdown-trigger");
const instancesDropdown = M.Dropdown.init(elemsDropdown, {
    coverTrigger: false
});
loadCities();
addEventListener("click", buttonHandler);



