var itemContainer = document.querySelector('#drinkResultsContainer');
var clearButton = document.querySelector('#clear');

var checkDrink = JSON.parse(localStorage.getItem("checkDrink"));


if (checkDrink != null) {

    var drinkResults = document.createElement('div');
    drinkResults.setAttribute('id','drinkResults');
    drinkResultsContainer.append(drinkResults);

    for (var i = 0; i < checkDrink.length; i++) {

        var newIMG = document.createElement("img");
        newIMG.setAttribute("src", checkDrink[i].saveIMG);
        drinkResults.append(newIMG);

        var newDrinkName = document.createElement("h4");
        newDrinkName.textContent = checkDrink[i].saveName;
        drinkResults.append(newDrinkName);

        var newDrinkIngredientList = document.createElement("ul");
        var savedList = checkDrink[i].saveIngredients;
        for (var i2=0; i2< savedList.length; i2++) {
            var ingredient = document.createElement('li');
            ingredient.textContent = savedList[i2];
            newDrinkIngredientList.append(ingredient);
        }
        drinkResults.append(newDrinkIngredientList);

        var newDrinkInstructions = document.createElement('p');
        newDrinkInstructions.textContent = checkDrink[i].saveInstructions;
        drinkResults.append(newDrinkInstructions);
    }
};

clearButton.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});