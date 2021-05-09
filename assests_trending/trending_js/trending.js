//TMDB

const API_KEY = 'api_key=4b52b8d4864cf35092c3095fb398a5e0';
const BASE_URL = "https://api.themoviedb.org/3"
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;



const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const prev = document.getElementById('prev');
const current = document.getElementById('curr');
const next = document.getElementById('next');
const containerEl = document.getElementById('movie');
const bodyEl = document.getElementById('body');

var lastUrl = '';



getMovies(API_URL)

function getMovies(url) {
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        previousPage = currentPage - 1;
        totalPages = data.total_pages;

        current.innerText = currentPage;

        if (currentPage <= 1) {
            prev.classList.add('disabled');
            next.classList.remove('disabled');
        } else if (currentPage >= totalPages) {
            prev.classList.remove('disabled');
            next.classList.add('disabled');

        } else {
            prev.classList.remove('disabled');
            next.classList.remove('disabled');

        }
        form.scrollIntoView({ behavior: 'smooth' })
    })
}


function showMovies(data) {
    main.innerHTML = "";
    data.forEach(movie => {
        const { title, poster_path, vote_average, id,overview } = movie;
        const movieEl = document.createElement('div');
        // <div class="desc">${overview}</div>
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img class="zoom" src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">
            <div class="movie-info">
                <p>${title}</p>
                <span class="${getColor(vote_average)}">${vote_average}</span>
                <a onclick="overview('${id}')" href="#" id="trailer">Details</a>
            </div>
        `
        main.appendChild(movieEl);


    });

}

function overview(id) {
    sessionStorage.setItem('movieId', id);
    window.location = "movie.html"
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    searchID = `${BASE_URL}/movie/${movieId}?${API_KEY}&append_to_response=videos`
    fetch(searchID).then(res => res.json()).then(data => {
        console.log(searchID);
        let movie = data.overview;
        // bodyEl.style.backgroundImage = `"https://image.tmdb.org/t/p/w500${data.backdrop_path}"`
        // <h3 class="release">Relase Date: ${data.release_date}</3 >
        const output = document.createElement('div');
        // 
        output.classList.add('movie');
        output.innerHTML = `
        <h1 class="movieTitle">${data.title}</h1>
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}">
        <iframe class="video" width="800" height="600" src="https://www.youtube.com/embed/${data.videos.results[0].key}" frameborder="0" <iframe width="560" height="315" src="https://www.youtube.com/embed/gClnj1aqc3E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>></iframe>
        <p class="description">${movie}</p>
        
        `


        containerEl.appendChild(output)


    })
}



function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
}



form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    } else {
        getMovies(API_URL);
    }
})

prev.addEventListener('click', () => {
    if (previousPage > 0) {
        pageCall(previousPage);
    }
})

next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }
})

function pageCall(page) {
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length - 1].split('=')
    if (key[0] != 'page') {
        let url = lastUrl + '&page=' + page
        getMovies(url);
    } else {
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length - 1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b
        getMovies(url);

    }

}

const slide_menu = document.querySelector(".sidenav");
M.Sidenav.init(slide_menu,{});