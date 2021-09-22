var movieTitle = $('#title')
var moviePlot = $('#plot')
var posterDisplay = $('#poster')

var movieID = 500

var genreID = 27 // Controls the genre ID

var pageNum = Math.floor((Math.random() * 450) + 1) //Pages are kind of static, adds more randomization

var genreTestQuery = "https://api.themoviedb.org/3/genre/movie/list?api_key=2be50216a9231d782c1ba136d60ba871&language=en-US"

var anothaOne = "https://api.themoviedb.org/3/discover/movie?api_key=2be50216a9231d782c1ba136d60ba871&with_genres=" + genreID + "&language=en-US&page=" + pageNum



function getGenreList () {
	fetch(anothaOne)
        .then(function (response) {
        	console.log(response)
        	return response.json();
        })

        .then(function (genrelist) {
        	console.log(genrelist)
			var sampleMovieID = genrelist.results[5].id
			console.log(sampleMovieID)
			queryMovieDB(sampleMovieID)
	})};

getGenreList()



function queryMovieDB(moviefromGenre) {
	if(moviefromGenre)
		{movieID = moviefromGenre}

	var sampleQuery = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=2be50216a9231d782c1ba136d60ba871&language=en&genre=27" //550 is what I assume the movie number is, randomize that and we got it random
	fetch(sampleQuery)
        .then(function (response) {
        	console.log(response)
        	return response.json();
        })
        .then(function (data) {
        	console.log(data)
		if(data.status_code == 34 || data.poster_path == null || data.adult == true ){
			window.location.href = window.location.href; //apparently they also have porn movies lol
		}
		else{
			movieTitle.text(data.original_title)
			moviePlot.text(data.overview)
			var moviePoster = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + data.poster_path
			posterDisplay.empty()
			posterDisplay.append("<img src='"+ moviePoster + "'></img>")
		}
		
		}
        
        
        )};


function getGenreID () {
	fetch(genreTestQuery)
        .then(function (response) {
        	console.log(response)
        	return response.json();
        })
        .then(function (genres) {
        	console.log(genres)}
		
		)};

getGenreID()


