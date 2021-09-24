var favMoviesUL = $('#fav_movies')
var clearBtn = $('<button>').text("Clear Favorite Movies");
clearBtn.attr('id', 'clearBtn');




var storeTitle = JSON.parse(localStorage.getItem('movie_title')) || [];

var storeIMDB = JSON.parse(localStorage.getItem("imdb_link")) || [];


for (var i = 0; i < storeTitle.length; i++) {
    var newLi = $("<li>").text(storeTitle[i])
    newLi.attr("style", "text-align: center;")
    newLi.attr('id', 'fav_films')
    favMoviesUL.append(newLi)

    var imdbLinks = $("<a />", {
        id : "imdb_links",
        name : "imdb",
        href : storeIMDB[i],
        text : " IMDB"
    });

    newLi.append(imdbLinks);



}