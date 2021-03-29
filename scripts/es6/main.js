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
        el.classList.add('disabled');
    });

    // Reset display
    const displayEl = document.getElementById("sd-display");
    displayEl.innerHTML = "";
    
    // Populate Display
    const recipeTitleEl = document.createElement("h2");
    const recipeTitleName = document.createTextNode(recipe.name+" in progress...");
    recipeTitleEl.appendChild(recipeTitleName);
    displayEl.appendChild(recipeTitleEl);

    // Include Steps
    const recipeStepEl = document.createElement("p");
    stepGenerator(recipeStepEl, recipe);
    
}

// Step Process 
let stepGenerator = (recipeStepEl, recipe) => {
    let iterationTime = 1000;
    recipe.steps.forEach((step, i) => {
        const displayEl = document.getElementById("sd-display");
        setTimeout(() => {
            recipeStepEl.innerHTML = "";
            const recipeStepName = document.createTextNode(step.name);
            recipeStepEl.appendChild(recipeStepName);
            displayEl.appendChild(recipeStepEl);
            progressBar(step);
            // Last iteration
            if (i === recipe.steps.length - 1)
                setTimeout(() => {
                    recipeComplete(recipe);
                }, step.duration * 1000);
        }, iterationTime);
        iterationTime += step.duration * 1000;
    });
};

// Display Progress Bar
let progressBar = (step) => {

    // Reset (Remove) Bar
    const bar = document.getElementById("sd-progress-bar");
    if(document.getElementById("sd-progress-bar"))
        bar.remove()

    // Create Progress bar
    const displayEl = document.getElementById("sd-display");
    const progressBarEl = document.createElement("div");
    progressBarEl.setAttribute("id", "sd-progress-bar");

    // Set Duration
    progressBarEl.style.transitionDuration = step.duration+"s";
    displayEl.appendChild(progressBarEl).focus();
    progressBarEl.classList.add('active');
}

// Initialise Recipe Completion
let recipeComplete = (recipe) => {
    
    // Clear Display
    const displayEl = document.getElementById("sd-display");
    displayEl.innerHTML = "";

    // Show thank you message
    const completionMessageEl = document.createElement("h2");
    const completionMessage = document.createTextNode("All done!");
    completionMessageEl.appendChild(completionMessage);
    const completionSubMessageEl = document.createElement("p");
    const completionSubMessage = document.createTextNode("Please take your "+recipe.name+" and have a nice day!");
    completionSubMessageEl.appendChild(completionSubMessage);
    displayEl.appendChild(completionMessageEl);
    displayEl.appendChild(completionSubMessageEl);

    setTimeout(() => {
        // Clear display after message
        displayEl.innerHTML = "";

        // Enable Buttons
        Array.from(document.querySelectorAll('.sd-btn-primary')).forEach((el) => {
            el.classList.remove('disabled');
        });
    }, 5000);
}