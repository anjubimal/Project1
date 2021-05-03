var coord = "-22.0;14.0";
var austin = "30.3;-97.6";
var list = document.querySelector("#theater-list");

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
       
    });

};
getCinemas(coord);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
    instances.open();
  });
