var movieTitle = $('#title')
var moviePlot = $('#plot')
var posterDisplay = $('#poster')

var movieID = Math.floor((Math.random() * 10000) + 1);

var sampleQuery = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=2be50216a9231d782c1ba136d60ba871" //550 is what I assume the movie number is, randomize that and we got it random



function queryMovieDB() {
	fetch(sampleQuery)
        .then(function (response) {
        	console.log(response)
        	return response.json();
        })
        .then(function (data) {
        	console.log(data)
		if(data.status_code == 34 || data.poster_path == null){
			console.log("working")
			window.location.href = window.location.href;
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

		queryMovieDB()




console.log(movieID)