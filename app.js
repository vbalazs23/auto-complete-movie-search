// The below function is called by the text input on the page on input
const change = debounce(async function (userQuery) {
    const config = { params: { s: userQuery, type: 'movie'} };
    try {
        const res = await axios.get('https://www.omdbapi.com/?apikey=15a8eb7b', config);
        createMovies(res.data.Search);
    } catch (e) {
        console.log("Could not retrieve data from OMDb API or no results found for your query.", 
        "Try a different search term or try again later.", e);
    }
})

// Debouncing to limit API calls (no need to say thanks omdb guys)
// Yes we are declaring the below function after calling it but it's fine because of hoisting rules (not declared as a const)

function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {       // We only need to pass in userQuery here and we know that.. We could just pass in "a" or some random argument name
        clearTimeout(timeout);  // so spreading in this short app is a bit of an overkill but it's fancier this way
        timeout = setTimeout(() => { 
            cb(...args)
        }, delay)
    }
}

// We are creating the actual movie "cards" here with the data acquired from the API
const createMovies = (movies) =>  {
    const resultDisplay = document.querySelector('.result-display');
        resultDisplay.innerHTML = ''; //Clearing all movies first
// Looping over the results of the api call and creating/filling in the images src, title and year data
    for (let element of movies) {   
        const movie = document.createElement('div');
        movie.classList.add('movie');
        resultDisplay.append(movie);

        const movieImage = document.createElement('div');
        movieImage.classList.add('movie-image');
        movie.append(movieImage);

        const movieTitle = document.createElement('div');
        movieTitle.classList.add('movie-title');
        movie.append(movieTitle);

        const movieYear = document.createElement('div');
        movieYear.classList.add('movie-year');
        movie.append(movieYear);

        const img = document.createElement('img');
        if (element.Poster === 'N/A') {
            img.src = 'assets/noimage.svg'
        } else {
            img.src = element.Poster;
        }
        movieImage.append(img);

    
        const h1 = document.createElement('h1');
        h1.textContent = element.Title;
        movieTitle.append(h1);

    
        const p = document.createElement('p');
        p.textContent = element.Year;
        movieYear.append(p);
    }
}