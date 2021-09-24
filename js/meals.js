var APIKey = "759f66f279b4468e91990ad761aa5966"
var cuisineType = "chinese"
var cuisineUrl = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisineType + "&apiKey=" + APIKey;
var mealTitle = $('#title')
var mealImage = $('#image')
var recipeIngredients = $('#cuisineRecipe')


function queryCuisineDB(){
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
                var ingredientsText = $('<p>').text(data.ingredients[i].name)
                recipeIngredients.append(ingredientsText)         
            }
        });

    }

    queryCuisineDB();


