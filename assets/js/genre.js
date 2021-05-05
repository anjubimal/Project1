var pickedGenre = document.querySelector('#genres');

const API_KEY = '4b52b8d4864cf35092c3095fb398a5e0';


/* Movie Genre IDs */
/* 28 - Action
18 - Drama
35 - Comedy 
10751 - Family
27 - Horror
10749 - Romance
878 - Sci-Fi
16 - Animated

12 - Adventure 
80 - Crime 
36 - History 
37 - Wetsern
99 - Documentary */

// dropdown javascript
const elemsDropdown = document.querySelector('.dropdown-trigger');
const instancesDropdown= M.Dropdown.init(elemsDropdown, {
  coverTrigger: false,
  constrainWidth: false,
  hover: true
});

var apiTest = function() {
    // format the api url
    var apiUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY + "&language=en-US";

    // use this url to gather list given genre ID when user clicks nav bar
    //var apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=4b52b8d4864cf35092c3095fb398a5e0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=28&with_watch_monetization_types=flatrate";
  
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
          });
        } else {
          // head to error page
          console.log("error: in else");
        }
      })
      .catch(function(error) {
        // head to error page
        console.log("error: in catch");
      });
  };


  apiTest();

var targetHandler = function(event) {

  console.log("You clicked " + event.target.id);
}

pickedGenre.addEventListener("click", targetHandler);