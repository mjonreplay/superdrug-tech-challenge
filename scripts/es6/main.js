fetch('./resources/recipes.json')
    .then(response => response.json())
    .then(data => initBtns(data))

// Create Machine Buttons
let initBtns = data => {
    data.recipes.map(recipe => {
        const recipeSelectBtnEl = document.createElement("div");
        recipeSelectBtnEl.classList.add("sd-btn-primary");
        const recipeBtnName = document.createTextNode(recipe.name);
        recipeSelectBtnEl.appendChild(recipeBtnName);
        recipeSelectBtnEl.onclick = (e) => {
            selectedRecipe(e, recipe);
        };
        const btnInterfaceEl = document.getElementById("sd-btn-interface");
        btnInterfaceEl.appendChild(recipeSelectBtnEl);
    });
}

// Display Selected Recipe
let selectedRecipe = (e, recipe) => {

    // Set active button
    const selected = e.currentTarget;
    Array.from(document.querySelectorAll('.sd-btn-primary')).forEach((el) => {
        el.classList.remove('active');
    });
    selected.classList.add('active');

    // Reset display
    const displayEl = document.getElementById("sd-display");
    displayEl.innerHTML = "";
    
    // Populate Display
    const recipeTitleEl = document.createElement("h2");
    const recipeTitleName = document.createTextNode(recipe.name);
    recipeTitleEl.appendChild(recipeTitleName);
    displayEl.appendChild(recipeTitleEl);

    // Include Steps
    const recipeStepEl = document.createElement("p");
    stepGenerator(recipeStepEl, recipe.steps);
    
}

let stepGenerator = (recipeStepEl, steps) => {
    let iterationTime = 1000;
    steps.forEach((step, i) => {
        const displayEl = document.getElementById("sd-display");
        setTimeout(() => {
            recipeStepEl.innerHTML = "";
            const recipeStepName = document.createTextNode(step.name);
            recipeStepEl.appendChild(recipeStepName);
            displayEl.appendChild(recipeStepEl);
        }, iterationTime);
        iterationTime += step.duration * 1000;
        
    });
};