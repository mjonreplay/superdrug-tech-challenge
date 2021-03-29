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
    el.classList.add('disabled');
  }); // Reset display

  var displayEl = document.getElementById("sd-display");
  displayEl.innerHTML = ""; // Populate Display

  var recipeTitleEl = document.createElement("h2");
  var recipeTitleName = document.createTextNode(recipe.name + " in progress...");
  recipeTitleEl.appendChild(recipeTitleName);
  displayEl.appendChild(recipeTitleEl); // Include Steps

  var recipeStepEl = document.createElement("p");
  stepGenerator(recipeStepEl, recipe);
}; // Step Process 


var stepGenerator = function stepGenerator(recipeStepEl, recipe) {
  var iterationTime = 1000;
  recipe.steps.forEach(function (step, i) {
    var displayEl = document.getElementById("sd-display");
    setTimeout(function () {
      recipeStepEl.innerHTML = "";
      var recipeStepName = document.createTextNode(step.name);
      recipeStepEl.appendChild(recipeStepName);
      displayEl.appendChild(recipeStepEl);
      progressBar(step); // Last iteration

      if (i === recipe.steps.length - 1) setTimeout(function () {
        recipeComplete(recipe);
      }, step.duration * 1000);
    }, iterationTime);
    iterationTime += step.duration * 1000;
  });
}; // Display Progress Bar


var progressBar = function progressBar(step) {
  // Reset (Remove) Bar
  var bar = document.getElementById("sd-progress-bar");
  if (document.getElementById("sd-progress-bar")) bar.remove(); // Create Progress bar

  var displayEl = document.getElementById("sd-display");
  var progressBarEl = document.createElement("div");
  progressBarEl.setAttribute("id", "sd-progress-bar"); // Set Duration

  progressBarEl.style.transitionDuration = step.duration + "s";
  displayEl.appendChild(progressBarEl).focus();
  progressBarEl.classList.add('active');
}; // Initialise Recipe Completion


var recipeComplete = function recipeComplete(recipe) {
  // Clear Display
  var displayEl = document.getElementById("sd-display");
  displayEl.innerHTML = ""; // Show thank you message

  var completionMessageEl = document.createElement("h2");
  var completionMessage = document.createTextNode("All done!");
  completionMessageEl.appendChild(completionMessage);
  var completionSubMessageEl = document.createElement("p");
  var completionSubMessage = document.createTextNode("Please take your " + recipe.name + " and have a nice day!");
  completionSubMessageEl.appendChild(completionSubMessage);
  displayEl.appendChild(completionMessageEl);
  displayEl.appendChild(completionSubMessageEl);
  setTimeout(function () {
    // Clear display after message
    displayEl.innerHTML = ""; // Enable Buttons

    Array.from(document.querySelectorAll('.sd-btn-primary')).forEach(function (el) {
      el.classList.remove('disabled');
    });
  }, 5000);
};
//# sourceMappingURL=main.js.map
