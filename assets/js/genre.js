const API_KEY = '4b52b8d4864cf35092c3095fb398a5e0';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.querySelector('#main');

var pickedGenre = document.querySelector('#genres');
/* Movie Genre IDs 
28 - Action
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
  event.preventDefault();
  if (event.target.id) {
    getMovieList(event.target.id);
  }
    console.log(event.target.id);
};

function getMovieList(genreID) {
  // use this url to gather list given genre ID when user clicks nav bar
  var apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY 
                  + "&language=en-US&sort_by=popularity.desc&include_adult=true&with_genres=" + genreID;
  
  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json().then(renderMovies);
      } else {
        window.location.href = "error.html";
      }
    })
    .catch(function(error) {
      window.location.href = "error.html";
    });
};

function getMovieDetails(movieId) {
  searchID = BASE_URL + '/movie/' + movieId + '?api_key=' + API_KEY + '&language=en-US';
  fetch(searchID).then(res => res.json()).then(data => {
    main.innerHTML='';

    const overviewElement = document.createElement('div');
    overviewElement.setAttribute('class', 'movie-card');

    const overviewTemplate = `
    <div class="movie">
      <h1 class="movie-title">${data.title}</h1>
      <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
      <p class="description">${data.overview}</p>
    </div>`;
    
    overviewElement.innerHTML = overviewTemplate;
    main.appendChild(overviewElement);
  });

  main.appendChild(output);
};

function renderMovies(data) {
  main.innerHTML='';
  const movies = data.results;
  const movieBlock = displayMovieList(movies);
  main.appendChild(movieBlock);
}

function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `
          <a onclick="getMovieDetails(${movie.id})"><img class="zoom" src=${IMG_URL + movie.poster_path} id=${movie.id}/></a>
      `;
    }
  }) 
}

function displayMovieList(movies) {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movie');

  const movieTemplate = `
      <div class="movie-list">
        ${movieSection(movies)}
      </div>
      <div class="content">
        <p id="content-close">X</p>
      </div>`;

      movieElement.innerHTML = movieTemplate;
      return movieElement;
}

const slide_menu = document.querySelector(".sidenav");
M.Sidenav.init(slide_menu,{});

pickedGenre.addEventListener("click", targetHandler);