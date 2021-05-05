const API_KEY = '4b52b8d4864cf35092c3095fb398a5e0';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original'; /*https://image.tmdb.org/t/p/w500/xGuOF1T3WmPsAcQEQJfnG7Ud9f8.jpg*/
const qURL = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=' + API_KEY;

$(document).ready(() => {
	getMovies(qURL);
});
function getMovies(qURL) {
	axios(qURL).then(response => {
		let res1 = response.data.results[0].overview;
		console.log(res1);

		$('#overview').html('<div>' + res1 + '</div>');
		$('.responsive-img').html('<img src="' + IMG_URL + response.data.results[0].backdrop_path + '">');
		console.log('<img src="' + IMG_URL + response.data.results[0].backdrop_path + '">');
		console.log(response.data.results[0].poster_path);

		console.log(response.data.results[0]);
	});
}
