const parentContainer = document.querySelector(".main")
const URL = "https://movies-app.prakashsakari.repl.co/api/movies";
const searchInput = document.querySelector(".input");
const movieRating = document.querySelector("#rating-select");
const movieGenres = document.querySelector("#genre-select");


let searchValue = "";
let filteredArrayOfMovies =[];
let rating = 0;
let selectedGenre = "";

const getMovies = async (url) =>{
    
    try{
        const {data} = await axios.get(url);
        return data;
    }catch(err){
        console.log(err);

    }
}
const movies = await getMovies(URL);
console.log(movies);

const createElement = (element)=>document.createElement(element);

/**Creating Card Container */

const createMoviesCard = (movies)=>{
    for(let movie of movies){
        const cardContainer = createElement("div");
        cardContainer.classList.add("card", "shadow")

        //creating image container
        const imageContainer = createElement("div");
        imageContainer.classList.add("card-image-container");
        //creating image element
        const imageElement = createElement("img");
        imageElement.classList.add("card-image");
        imageElement.setAttribute("src", movie.img_link);
        imageElement.setAttribute("alt", movie.name);
        imageContainer.appendChild(imageElement)

        cardContainer.appendChild(imageContainer);
        
        //creating movie detail container

        const detailsContainer = createElement("div");
        detailsContainer.classList.add("movie-details");

        //title
        const titleElement = createElement("p");
        titleElement.classList.add("title")
        titleElement.innerText = movie.name;
        detailsContainer.appendChild(titleElement);
        //genre
        const genreElement = createElement("p");
        genreElement.classList.add("genre")
        genreElement.innerText = `Genre : ${movie.genre}`
        detailsContainer.appendChild(genreElement);

        //movie Rating 
        const movieRatingContainer = createElement("div");
        movieRatingContainer.classList.add("rating");

        //creating ratingsContainer

        const ratingContainer = createElement("div");
        ratingContainer.classList.add("star-rating");

        //star icon 
        const starIcon = createElement("span");
        starIcon.classList.add("material-icons-outlined");
        starIcon.innerText = "star";
        ratingContainer.appendChild(starIcon);

        //ratingValue

        const ratingValue = createElement("span");
        ratingValue.innerText = movie.imdb_rating;
        ratingContainer.appendChild(ratingValue);

        movieRatingContainer.appendChild(ratingContainer);

        //timeSpan
        const movieDuration = createElement("span");
        movieDuration.innerText = `${movie.duration} mins`;
        movieRatingContainer.appendChild(movieDuration);
        cardContainer.appendChild(detailsContainer);
        cardContainer.appendChild(movieRatingContainer);
        
        parentContainer.appendChild(cardContainer);


    }
}

const getFilteredData = () =>{
    filteredArrayOfMovies = searchValue?.length>0 ? 
    movies.filter((movie)=> movie.name.toLowerCase() === searchValue || 
    searchValue === movie.director_name.toLowerCase() || 
    movie.cast_name.toLowerCase().split(",").includes(searchValue)|| 
    movie.writter_name.toLowerCase().split(",").includes(searchValue))
    : movies;
    //adding interconnectivity between genre & Rating with Input field
    if((rating)>0){
        filteredArrayOfMovies = searchValue?.length>0? filteredArrayOfMovies : movies;
        filteredArrayOfMovies = filteredArrayOfMovies.filter((movie)=>(movie.imdb_rating)>=rating);
    }
    if(selectedGenre?.length >0){
        filteredArrayOfMovies = searchValue?.length>0 || rating>7   ? filteredArrayOfMovies: movies;
        filteredArrayOfMovies = filteredArrayOfMovies.filter((movie) => movie.genre.includes(selectedGenre));
    }

    return filteredArrayOfMovies;
}

const handleSearch = (event) =>{
    //creating a search field
    searchValue = event.target.value.toLowerCase();
    let filterBySearch = getFilteredData();
    parentContainer.innerHTML = "";
    createMoviesCard(filterBySearch);
    console.log("filtered Data",filterBySearch);
}



function debounce(callback, delay){
    let timerId;
    return (...args)=>{
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
            callback(...args);
        },delay)
    };
}
const handleRatingSelector = (event) =>{
    rating = event.target.value;
    let filterByRating = getFilteredData();
    parentContainer.innerHTML = "";
    createMoviesCard(rating ? filterByRating : movies);
}
const debounceInput = debounce(handleSearch, 500);

searchInput.addEventListener("keyup", debounceInput);

movieRating.addEventListener("change", handleRatingSelector);


//Creating unique genre's array

const genres = movies.reduce((acc, cur)=>{
    let genresArr =[];
    let tempGenresArr = cur.genre.split(",");
    acc = [...acc, ...tempGenresArr];
    for(let genre of acc){
        if(!genresArr.includes(genre)){
            genresArr = [...genresArr, genre];
        }
    }
    return genresArr;
},[]);

//creating dynamic options dropdown

for(let genre of genres){
    const options = createElement("option");
    options.classList.add("option");
    options.setAttribute("value", genre);
    options.innerText = genre;
    movieGenres.appendChild(options)
}

const handleGenreSelect = (event) =>{
    selectedGenre = event.target.value;
    let filterByGenre = getFilteredData();
    parentContainer.innerHTML = "";
    createMoviesCard(selectedGenre ? filterByGenre : movies);
}

movieGenres.addEventListener("change", handleGenreSelect);

createMoviesCard(movies);
