function mealsFetchAPI() {
    var requestMealsUrl = 'https://api.spoonacular.com/recipes/complexSearch';

    fetch(mealsFetchAPI)
        .then(function (response) {
        return response.json();
        //console.log(response)
        })
        .then(function (data) {
        console.log(data)
        });
}