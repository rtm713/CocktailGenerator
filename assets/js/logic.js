
var drinkResultsContainer = document.querySelector("#drinkResultsContainer");
var drinkButton = document.querySelector("#drinkButton");
var buttonDiv = document.querySelector('#buttonDiv');

var COCKTAIL_API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";


drinkButton.addEventListener("click", function () {
  fetchDrinkResults();
});

function fetchDrinkResults() {
  fetch(COCKTAIL_API_URL)
    .then(function (res) {
      if (!res.ok) throw new Error("oops got an error");
      return res.json();
    })
    .then(function (data) {
      console.log("Data :>>", data);
      renderDrinkResults(data.drinks[0]);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function renderDrinkResults(DrinkData) {
  drinkResultsContainer.textContent = "";
  
  var drinkResults = document.createElement('div');
  drinkResults.setAttribute('id','drinkResults');
  drinkResultsContainer.append(drinkResults);

  var drinkName = DrinkData.strDrink;

  var drinkImg = DrinkData.strDrinkThumb;
  var drinkInstructions = DrinkData.strInstructions;

  var newIMG = document.createElement("img");

  newIMG.setAttribute("src", drinkImg);

  var newDrinkName = document.createElement("h4");
  newDrinkName.textContent = drinkName;

  var newDrinkIngredientList = document.createElement("ul");
  var drinkIngredientArray = [];

  for (var i = 1; i <= 15; i++) {
    var ingredientPropertyName = "strIngredient";
    var measurePropertyName = "strMeasure";
    ingredientPropertyName += i;
    measurePropertyName += i;

    var ingredient = DrinkData[ingredientPropertyName];
    if (ingredient) {
      var newDrinkIngredient = document.createElement("li");
      newDrinkIngredient.textContent =
        DrinkData[measurePropertyName] + " " + ingredient;
      newDrinkIngredientList.append(newDrinkIngredient);
      drinkIngredientArray.push(newDrinkIngredient.textContent);
    }
  }

  var newDrinkInstructions = document.createElement("p");
  newDrinkInstructions.textContent = drinkInstructions;

  drinkResults.append(newIMG);
  drinkResults.append(newDrinkName);
  drinkResults.append(newDrinkIngredientList);
  drinkResults.append(newDrinkInstructions);

  var saveButton = document.createElement("button");
  saveButton.setAttribute("type", "submit");
  saveButton.textContent = "Save Drink";
  drinkResults.append(saveButton);

  saveButton.addEventListener("click", function () {
    var saveDrink = {
      saveIMG: drinkImg,
      saveName: drinkName,
      saveIngredients: drinkIngredientArray,
      saveInstructions: drinkInstructions,
    };

    var checkDrink = localStorage.getItem("checkDrink");
    if (checkDrink === null) {
      checkDrink = [];
    } else {
      checkDrink = JSON.parse(checkDrink);
    }
    checkDrink.push(saveDrink);
    var thisDrink = JSON.stringify(checkDrink);
    localStorage.setItem("checkDrink", thisDrink);

    // window.location.replace("./savedItems.html");
  });
}