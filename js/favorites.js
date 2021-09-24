var favMoviesUL = $('#fav_movies')


var storeTitle = JSON.parse(localStorage.getItem('movie_title')) || [];

var storeIMDB = JSON.parse(localStorage.getItem("imdb_link")) || [];

function displayandClear(){
for (var i = 0; i < storeTitle.length; i++) {
    var newLi = $("<li>").text(storeTitle[i])
    newLi.attr("style", "text-align: center;")
    newLi.attr('id', 'fav_films')
    favMoviesUL.append(newLi)

    var imdbLinks = $("<a />", {
        id : "imdb_links",
        name : "imdb",
        href : storeIMDB[i],
        text : " IMDB",
        style: "text-decoration: none"
    });

    newLi.append(imdbLinks);

}
    if(storeTitle.length > 0){
        newLi.append('<li><button id= "clear" style= "margin-top: 25px; vertical-align: middle;"> Clear Movies </button> </li>')
        //appends the clear movie button if there are favorited movies

    }}
    

displayandClear()



// Clear movies button
$(document).on('click', '#clear', function () {
    localStorage.removeItem("movie_title")
    localStorage.removeItem("imdb_link")
    location.reload()

})