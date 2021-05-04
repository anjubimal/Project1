
var coord = "-22.0;14.0";
var austin = "30.3;-97.6";
var cities = [];
var lastSearch = "";
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
        console.log(coord);
        getCinemas(coord);
    })
    .catch(err => {
        console.error(err);
        window.location.href = "error.html";
    });
    }

var createCards = function(arrayElement){
    var cardEl = document.createElement('div');
    cardEl.className = "card";
    cardEl.classList.add("margin-card");
    var imageEl = document.createElement('div');
    imageEl.className = "card-image";
    imageEl.classList.add("waves-effect");
    imageEl.classList.add("waves-block");
    imageEl.classList.add("waves-light");
    var img = document.createElement('img'); 
    img.src = 'C:/users/vikin/virginia_r/projects/Project1/assets/images/AMC_logo.jpg';
    img.className = "actvator";
    imageEl.appendChild(img);
    var contentEl = document.createElement('div');
    contentEl.className = "class-content";
    var contentSp = document.createElement('span');
    contentSp.className = "card-title";
    contentSp.classList.add("activator");
    contentSp.classList.add("grey-text");
    contentSp.classList.add("text-darken-4");
    contentSp.innerHTML = arrayElement.cinema_name + '<i class="material-icons right">more_vert</i>';
    contentEl.appendChild(contentSp);
    var revealEl = document.createElement('div');
    revealEl.className = "card-reveal";
    var revealSp = document.createElement('span');
    revealSp.className = "card-title";
    revealSp.classList.add("grey-text");
    revealSp.classList.add("text-darken-4");
    revealSp.innerHTML = arrayElement.cinema_name + '<i class="material-icons right">close</i>';
    revealEl.appendChild(revealSp);
    var revealP1 = document.createElement('p');
    revealP1.innerHTML = "Address: " + arrayElement.address;
    var revealP2 = document.createElement('p');
    revealP2.innerHTML = "City: " + arrayElement.city;
    var revealP3 = document.createElement('p');
    revealP3.innerHTML = "County: " + arrayElement.county;
    revealEl.appendChild(revealP1);
    revealEl.appendChild(revealP2);
    revealEl.appendChild(revealP3);
    cardEl.appendChild(imageEl);
    cardEl.appendChild(contentEl);
    cardEl.appendChild(revealEl);

    return cardEl;

}

var createOption = function(optionsPlace, city) {
    var button = document.createElement('button');
    button.className = "hide-button";
    var opt = document.createElement('li');
    button.innerHTML = city;
    opt.appendChild(button);
    optionsPlace.appendChild(opt);

};

var getCinemas = function(coord){
var settings = {
    "url": "https://api-gate2.movieglu.com/cinemasNearby/?n=10",
    "method": "GET",
    "timeout": 0,
    "headers": {
    "geolocation":coord,
    "api-version": "v200",
    "Authorization": "Basic VU5JVl80OV9YWDpvSktYWmt4c1RkaWg=",
    "client": "UNIV_49",
    "x-api-key": "z3JmDFRMGa1Wb0O9RsaI66csW8wG6L3N4aViIHdG",
    "device-datetime": "2021-05-02T12:07:57.296Z",
    "territory": "XX",
    },
    };
    
    $.ajax(settings).done(function (response) {

        for(let i = 0; i < response.status.count; i++){
            var movieCard = createCards(response.cinemas[i]);
            list.appendChild(movieCard);
        }
      
    console.log(response);
       
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
         if(target.type === "submit" && target.id != "drop") {
              getCoordinates(target.textContent);
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



