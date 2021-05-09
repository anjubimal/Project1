
const API_KEY = '4b52b8d4864cf35092c3095fb398a5e0';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original'; /*https://image.tmdb.org/t/p/w500/xGuOF1T3WmPsAcQEQJfnG7Ud9f8.jpg*/
const qURL = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=' + API_KEY;

$(document).ready(() => {
	getMovies(qURL);
});
function getMovies(qURL) {
	axios.get(qURL)
		.then(response => {
			console.log(response);
			let movies = response.data.results;
			let output = '';
			$.each(movies, (index, movie) => {
				output += `
			<div class="col-md-4">
            	<div class="well ">
						<img src="${IMG_URL}${movie.poster_path}">
						<h5 class="text-center">${movie.title}</h5>
						<a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
					</div>
				</div>
				`
				console.log(`${movie.title}`);
				console.log(`${movie.title}`);

			});
			$('#movies').html(output);
			console.log(movies);

		}
		);
}

function movieSelected(id) {
	// sessionStorage.setItem)
}

const slide_menu = document.querySelector(".sidenav");
M.Sidenav.init(slide_menu,{});