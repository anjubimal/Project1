const API_KEY = '4b52b8d4864cf35092c3095fb398a5e0';
const BASE_URL = 'https://api.themoviedb.org/3';

const main = document.querySelector('#main');

var pickedGenre = document.querySelector('#genres');
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

var targetHandler = function(event) {
  if (event.target.id) {
    getMovieList(event.target.id);
  } 
};

function getMovieList(genreID) {
  console.log("searching for id: " + genreID);
  // use this url to gather list given genre ID when user clicks nav bar
  var apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=" + genreID + "&with_watch_monetization_types=flatrate";
  

  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
        });
      } else {
        console.log('wtttff');
      }
    })
    .catch(function(error) {
      console.log('alksjdl');
    });
};


pickedGenre.addEventListener("click", targetHandler);