const apiKey = '4b52b8d4864cf35092c3095fb398a5e0';
const qURL = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=' + apiKey;

const getBtn = $('#getBtn').on('click', function () {
	$.ajax({
		url: qURL,
		method: 'GET',
	}).then(function (movies) {
		console.log(movies);
		
	});
});
