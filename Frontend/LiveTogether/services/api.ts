export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`
    }
}

export const fetchMovies = async ({query}: {query:string}) => {
    const endpoint = query                              //if statement ?=true :=false
            ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch movies', response.statusText);
    }

    const data = await response.json();
    return data.results;
}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {

        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) throw new Error('Failed to fetch movie details');

        const data = await response.json();

        return data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

//const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';
//const options = {
//    method: 'GET',
//    headers: {
//        accept: 'application/json',
//        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODJlYmI3ZWEwYjliMDViNDdmMTUzYTJlYWI4NDNkMiIsIm5iZiI6MTc1OTU5MjY2Mi41Nzc5OTk4LCJzdWIiOiI2OGUxNDBkNjkwYmU1Njk0ZTljMjFmNzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T00MLsySO2uhvq9J6ZFxyhg8qRd6FiogrEVJtZKm_70'
//    }
//};

//fetch(url, options)
//    .then(res => res.json())
//    .then(json => console.log(json))
//    .catch(err => console.error(err));