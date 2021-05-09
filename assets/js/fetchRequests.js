// API REQUESTS
const apiKey = "2426d550977235ca6217917baa94407f";

async function getMovies(searchword) {
	const response = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchword}&page=1`
	);
	const data = await response.json();
	return data;
}

async function getMovieDetails(id) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
	);
	const data = await response.json();
	return data;
}

async function getMovieCredits(id) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
	);
	const data = await response.json();
	return data;
}

async function getPopularMovies() {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=2426d550977235ca6217917baa94407f&page=1`
	);
	const data = await response.json();

	return data;
}

async function getTVShows(searchword) {
	const response = await fetch(
		`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&page=1&query=${searchword}`
	);
	const data = await response.json();
	return data;
}

async function getTVShowDetails(id) {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
	);
	const data = await response.json();
	return data;
}

async function getTVShowCredits(id) {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`
	);
	const data = await response.json();
	return data;
}

async function getTVShowEpisodes(id, season) {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${apiKey}`
	);
	const data = await response.json();
	return data;
}

async function getPopularTVShows() {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/popular?api_key=2426d550977235ca6217917baa94407f&page=1`
	);
	const data = await response.json();

	return data;
}

async function getPeople(searchword) {
	const response = await fetch(
		`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&page=1&query=${searchword}`
	);
	const data = await response.json();
	return data;
}

async function getPersonDetails(id) {
	const response = await fetch(
		`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`
	);
	const data = await response.json();
	return data;
}
