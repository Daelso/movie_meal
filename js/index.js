/////////////////////////
/////////HTML Vars//////
///////////////////////

var movieTitle = $('#title')
var moviePlot = $('#plot')
var posterDisplay = $('#poster')
var releaseDate = $('#release-date')
var imdbLink = $('#imdb-link')
var userScore = $('#rating')
var runTime = $('#runtime')
var favoriteBtn = $('#favorite')
var favoriteMealBtn = $('#favMeal')

var submitBtn = $('#submit')

var movieBox = $('#movieBox')
var recipeBox = $('#food-results')


var storeTitle = JSON.parse(localStorage.getItem('movie_title')) || [];

var storeIMDB = JSON.parse(localStorage.getItem("imdb_link")) || [];

var storefavMealTitle = JSON.parse(localStorage.getItem('meal_title')) || [];


var mealTitle = $('#food-title')
var mealImage = $('#image')
var recipeIngredients = $('#cuisineRecipe')


var APIKey = "759f66f279b4468e91990ad761aa5966"
// var cuisineType = "chinese"



// MOVIE genre IDs
// Action          28
// Adventure       12
// Animation       16
// Comedy          35
// Crime           80
// Documentary     99
// Drama           18
// Family          10751
// Fantasy         14
// History         36
// Horror          27
// Music           10402
// Mystery         9648
// Romance         10749
// Science Fiction 878
// TV Movie        10770
// Thriller        53
// War             10752
// Western         37


////////////////////
///////defaults////
//////////////////

var movieID = 550 //defaults to fight club

var genreID = 37 // Controls the genre ID

function errorDefaultHandler (){
	var defaultMovie = 550
	queryMovieDB(defaultMovie)
}

///////////////////////////////
/////////API call section//////
//////////////////////////////


function getGenreList (genrefromID) {

	if(genrefromID){
		genreID = genrefromID
	}

	var pageNum = Math.floor((Math.random() * 250) + 1) //Pages are kind of static, adds more randomization


	var movieidfromGenre = "https://api.themoviedb.org/3/discover/movie?api_key=2be50216a9231d782c1ba136d60ba871&with_genres=" + genreID + "&language=en-US&page=" + pageNum

	fetch(movieidfromGenre)
        .then(function (response) {
        	return response.json();
        })

        .then(function (genrelist) {
			var arrayRandomizer = Math.floor((Math.random() * 10) + 1) //selects random array
        	console.log(genrelist)
			var sampleMovieID = genrelist.results[arrayRandomizer].id
			console.log(sampleMovieID)
			queryMovieDB(sampleMovieID)
	})};



function queryMovieDB(moviefromGenre) {
	if(moviefromGenre){
		movieID = moviefromGenre
	}

	var fetchMovie = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=2be50216a9231d782c1ba136d60ba871&language=en"

	fetch(fetchMovie)
        .then(function (response) {
        	console.log(response)
        	return response.json();
        })
        .then(function (data) {
        	console.log(data)
		if(data.status_code == 34 || data.poster_path == null || data.adult == true ){
			errorDefaultHandler() //Defaults to fight club, westerns are bad
		}
		else{
			movieTitle.text(data.original_title)
			releaseDate.text("Released: " + data.release_date)
			moviePlot.text(data.overview)
			runTime.text("Run time: " + data.runtime + " min")
			userScore.text("Average User Score: " + data.vote_average + "/10" + " Votes: " + data.vote_count)
			var imdbPointer = "https://www.imdb.com/title/" + data.imdb_id
			imdbLink.empty()
			imdbLink.append("<a href='" + imdbPointer + "'>" + "IMDB - " + data.original_title  + "</a>")
			var moviePoster = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + data.poster_path
			posterDisplay.empty()
			posterDisplay.append("<img src='"+ moviePoster + "'style='max-height: 400px; max-width: 350px;'></img>")

			var newBtn = $('<button>').text("Favorite the Movie")
			newBtn.attr('id', 'favoriteBtn')
			newBtn.attr("style", "background-color: #2AD4DB; color: white; border-radius: 4px; border: none; margin-bottom: 15px;")
			newBtn.mouseenter(function() {
				$(this).attr("style", "background-color: #DB4535; cursor: pointer; color: white; border-radius: 4px; border: none; margin-bottom: 15px;")
			}).mouseleave(function() {
				 $(this).attr("style", "background-color: #2AD4DB; color: white; border-radius: 4px; border: none; margin-bottom: 15px;");
			});
			favoriteBtn.empty(newBtn)
			favoriteBtn.append(newBtn)

            movieBox.attr("style", "border: 2px solid #DB4535; display: flex; list-style:none; padding: 10px; flex-direction: column; flex-wrap:wrap; max-width: 800px; line-height: 1.5em;") //Movie Box here



		}})};



//////////////////////////
///////BTN listeners//////
/////////////////////////
var genHorror = $("#generateHorror")
var genWestern = $("#generateWestern")
var genFantasy = $('#generateFantasy')
var genTrueRandom = $('#generateTrueRandom')

genHorror.on('click', generateHorrorMovie)
genWestern.on('click', generateWesternMovie)
genFantasy.on('click', generateFantasyMovie)
genTrueRandom.on('click', generateTrueRandom)

////////////////////////////
///////btn functions///////
//////////////////////////

function generateHorrorMovie (){
	var horrorID = 27
	getGenreList(horrorID)

}

function generateWesternMovie (){
	var westernID = 37
	getGenreList(westernID)

}

function generateFantasyMovie (){
	var fantasyID = 14
	getGenreList(fantasyID)

}


function generateTrueRandom (){
	var randomMovieID = Math.floor((Math.random() * 100000) + 1)
	queryMovieDB(randomMovieID)
}



$(document).on('click', '#favoriteBtn', function () {
	
	var storeMoveTitle = movieTitle.text()
	storeTitle.push(storeMoveTitle)

	localStorage.setItem("movie_title", JSON.stringify(storeTitle))

	var storeIMDBLink = $(this).parent().siblings('#imdb-link').children().attr( "href")	
	storeIMDB.push(storeIMDBLink)

	localStorage.setItem("imdb_link", JSON.stringify(storeIMDB))

})

$(document).on('click', '#favMeal', function () {
	
	var storeMealTitle = mealTitle.text()
	storefavMealTitle.push(storeMealTitle)

	localStorage.setItem("meal_title", JSON.stringify(storefavMealTitle))

})


submitBtn.on('click', chooseGenreID)


function chooseGenreID(event) {
    event.preventDefault()
    var e = document.getElementById("genre-search"); //can't use jquery apparently

	var genreID = e.value
	getGenreList(genreID)

	var f = document.getElementById("cuisine-search");
	var cuisineType = f.value

	recipeIngredients.empty()
	queryCuisineDB(cuisineType)


	
	
}


function queryCuisineDB(meals){
	if (meals) {
		var cuisineType = meals
	}
	var cuisineUrl = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisineType + "&apiKey=" + APIKey;

    fetch(cuisineUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
    
        
        //have the recipe of the meal selected display as well

        var randomArray = Math.floor((Math.random() * 10) + 1)
        mealTitle.text(data.results[randomArray].title)
        mealImage.append(data.results[randomArray].image)
        var foodImage = data.results[randomArray].image
			mealImage.empty()
			mealImage.append("<img src='"+ foodImage + "'></img>")
		var newBtn = $('<button>').text("Favorite this meal")
		newBtn.attr('id', 'favoriteMealBtn')
		newBtn.attr("style", "background-color: #2AD4DB; color: white; border-radius: 4px; border: none; margin-bottom: 15px;")
		newBtn.mouseenter(function() {
		$(this).attr("style", "background-color: #51DB40; cursor: pointer; color: white; border-radius: 4px; border: none; margin-bottom: 15px;")
			}).mouseleave(function() {
		$(this).attr("style", "background-color: #2AD4DB; color: white; border-radius: 4px; border: none; margin-bottom: 15px;");
			});
		favoriteMealBtn.empty(newBtn)
		favoriteMealBtn.append(newBtn)

        var recipeOption = data.results[randomArray].id
        console.log(recipeOption)
        
        recipeIdTransfer (recipeOption)


         // 

        });
}

    function recipeIdTransfer (recipeId) {
        if (recipeId) {
            var mealId = recipeId
        }

        var getRecipeUrl = "https://api.spoonacular.com/recipes/" + mealId + "/ingredientWidget.json?&apiKey=" + APIKey

        fetch (getRecipeUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            console.log(data.ingredients[0].name);
    
            for (var i= 0; i < data.ingredients.length; i++) {
                var ingredientsText = $('<p>').text(data.ingredients[i].name + " " + data.ingredients[i].amount.us.value + " " + data.ingredients[i].amount.us.unit +  ",")
                recipeIngredients.append(ingredientsText)         
            }
			recipeBox.attr("style", "border: 2px solid #51DB40; display: flex; list-style:none; padding: 10px; flex-direction: column; flex-wrap:wrap; max-width: 800px; line-height: 1.5em;") //Movie Box here
        });

    }

    queryCuisineDB();


