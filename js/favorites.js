var favMoviesUL = $('#fav_movies')
var favMealsUL = $('#fav_meals')


var storeTitle = JSON.parse(localStorage.getItem('movie_title')) || [];

var storeIMDB = JSON.parse(localStorage.getItem("imdb_link")) || [];

var storefavMealTitle = JSON.parse(localStorage.getItem('meal_title')) || [];


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
        newLi.append('<li><button id= "clear" style= "margin-top: 25px; vertical-align: middle; background-color: #2AD4DB; border-radius: 4px; cursor: pointer;"> Clear Movies </button> </li>')
        //appends the clear movie button if there are favorited movies

    }

    for (var i = 0; i < storefavMealTitle.length; i++) {
        var newLi = $("<li>").text(storefavMealTitle[i])
        newLi.attr("style", "text-align: center;")
        newLi.attr('id', 'fav_films')
        favMealsUL.append(newLi)}

        if(storefavMealTitle.length > 0){
            newLi.append('<li><button id= "clearMeals" style= "margin-top: 25px; vertical-align: middle; background-color: #2AD4DB; border-radius: 4px; cursor: pointer;"> Clear Meals </button> </li>')
            //appends the clear movie button if there are favorited movies
    
        }

}
    

displayandClear()



// Clear movies button
$(document).on('click', '#clear', function () {
    localStorage.removeItem("movie_title")
    localStorage.removeItem("imdb_link")
    location.reload()

})
//Clear meals button
$(document).on('click', '#clearMeals', function () {
    localStorage.removeItem("meal_title")
    location.reload()

})