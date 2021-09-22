var APIKey = "759f66f279b4468e91990ad761aa5966"
var queryUrl = "https://api.spoonacular.com/food/products/search?query=chicken" + "&apiKey=" + APIKey;
// var entry = "burgers"

var mealTitle = $('#title')
var mealImage = $('#image')




    fetch(queryUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data)
        mealTitle.text(data.products[2].title)
        // mealImage.append(data.products[2].image)

        var foodImage = data.products[2].image
			mealImage.empty()
			mealImage.append("<img src='"+ foodImage + "'></img>")
        });

        
    



        // if(data.status == 34 || data.image_path == null){
		// 	console.log("working")
		// 	window.location.href = window.location.href;
        
        // }
        // else {
        // }

