const parentContainer = document.querySelector(".main")
const URL = "https://movies-app.prakashsakari.repl.co/api/movies";
const searchInput = document.querySelector(".input");
let searchValue = "";
let filteredArray =[];

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

const getFilteredData = (event) =>{
    searchValue = event.target.value;
    
}

searchInput.addEventListener("keyup", getFilteredData)

createMoviesCard(movies);
