/////////////////////////
/////////HTML Vars//////
///////////////////////

var movieTitle = $('#title')
var moviePlot = $('#plot')
var posterDisplay = $('#poster')
var releaseDate = $('#release-date')
var imdbLink = $('#imdb-link')
var userScore = $('#rating')




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

var movieID = 500 //defaults to fight club

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
        	console.log(response)
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

	var fetchMovie = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=2be50216a9231d782c1ba136d60ba871&language=en&genre=27" //550 is what I assume the movie number is, randomize that and we got it random

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
			userScore.text("Average User Score: " + data.vote_average + "/10" + " Votes: " + data.vote_count)
			var imdbPointer = "https://www.imdb.com/title/" + data.imdb_id
			imdbLink.empty()
			imdbLink.append("<a href='" + imdbPointer + "'>" + "IMDB - " + data.original_title  + "</a>")
			var moviePoster = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + data.poster_path
			posterDisplay.empty()
			posterDisplay.append("<img src='"+ moviePoster + "'></img>")


		}})};



//////////////////////////
///////BTN listeners//////
/////////////////////////
var genHorror = $("#generateHorror")
var genWestern = $("#generateWestern")

genHorror.on('click', generateHorrorMovie)
genWestern.on('click', generateWesternMovie)

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
