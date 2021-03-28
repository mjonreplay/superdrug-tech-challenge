"use strict";

fetch('./resources/recipes.json').then(function (response) {
  return response.json();
}).then(function (data) {
  return initBtns(data);
}); // Create Machine Buttons

var initBtns = function initBtns(data) {
  data.recipes.map(function (recipe) {
    var recipeSelectBtnEl = document.createElement("div");
    recipeSelectBtnEl.classList.add("sd-btn-primary");
    var recipeBtnName = document.createTextNode(recipe.name);
    recipeSelectBtnEl.appendChild(recipeBtnName);

    recipeSelectBtnEl.onclick = function (e) {
      selectedRecipe(e, recipe);
    };

    var btnInterfaceEl = document.getElementById("sd-btn-interface");
    btnInterfaceEl.appendChild(recipeSelectBtnEl);
  });
}; // Display Selected Recipe


var selectedRecipe = function selectedRecipe(e, recipe) {
  // Set active button
  var selected = e.currentTarget;
  Array.from(document.querySelectorAll('.sd-btn-primary')).forEach(function (el) {
    el.classList.remove('active');
  });
  selected.classList.add('active'); // Reset display

  var displayEl = document.getElementById("sd-display");
  displayEl.innerHTML = ""; // Populate Display

  var recipeTitleEl = document.createElement("h2");
  var recipeTitleName = document.createTextNode(recipe.name);
  recipeTitleEl.appendChild(recipeTitleName);
  displayEl.appendChild(recipeTitleEl); // Include Steps

  var recipeStepEl = document.createElement("p");
  stepGenerator(recipeStepEl, recipe.steps);
};

var stepGenerator = function stepGenerator(recipeStepEl, steps) {
  var iterationTime = 1000;
  steps.forEach(function (step, i) {
    var displayEl = document.getElementById("sd-display");
    setTimeout(function () {
      recipeStepEl.innerHTML = "";
      var recipeStepName = document.createTextNode(step.name);
      recipeStepEl.appendChild(recipeStepName);
      displayEl.appendChild(recipeStepEl);
    }, iterationTime);
    iterationTime += step.duration * 1000;
  });
};
//# sourceMappingURL=main.js.map
