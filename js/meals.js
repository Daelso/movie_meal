var APIKey = "759f66f279b4468e91990ad761aa5966"
var queryChickenUrl = "https://api.spoonacular.com/food/products/search?query=chicken" + "&apiKey=" + APIKey;
var cuisineUrl = "https://api.spoonacular.com/recipes/complexSearch?cuisine=italian" + "&apiKey=" + APIKey;
var mealTitle = $('#title')
var mealImage = $('#image')

//cuisines
//protein

function queryCuisineDB(){
    fetch(cuisineUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        
        mealTitle.text(data.results[2].title)
        // mealImage.append(data.results[2].image)

        var foodImage = data.results[2].image
			mealImage.empty()
			mealImage.append("<img src='"+ foodImage + "'></img>")
        });
}
    queryCuisineDB();






    // function queryChickenMealsDB() {
    //     //to-do: get whole array.length displayed
    //     fetch(queryChickenUrl)
    //         .then(function (response) {
    //         return response.json();
    //         })
    //         .then(function (data) {
    //         console.log(data)
    //         mealTitle.text(data.products[2].title)
    //         // mealImage.append(data.products[2].image)
    
    //         var foodImage = data.products[2].image
    //             mealImage.empty()
    //             mealImage.append("<img src='"+ foodImage + "'></img>")
    //         });
    //     }
        
    //     queryChickenMealsDB();

