// Select Elements
// ===============
const search = document.getElementById("search"); // Form Input
const submit = document.getElementById("submit"); // Submit Button
const random = document.getElementById("random"); // Random Button
const resultHeading = document.getElementById("result-heading"); // Dynamic Heading for Meal
const mealsEl = document.getElementById("meals"); // Dynamic Div for Grid Display of Meals
const single_mealEl = document.getElementById("single-meal"); // Dynamic Div for Single Meal

// Event Listeners
// ===============
submit.addEventListener("submit", searchMeal); // Submit Button
random.addEventListener("click", getRandomMeal); // Random Button

// LISTENER to Select Meal from Grid of Meals
mealsEl.addEventListener("click", (e) => {
  // clicking meal in grid selects multiple divs. Need to select div with class meal-info.
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  }); // returns div with class "meal-Info" and "data-mealid" that was generated dynamically by searchMeal()
  console.log(mealInfo);
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});

// Functions
// =========

// SearchMeal()
// -------------
// 1. search  by food item using fetch API
// 2. populate grid with images of all meals and its name using map()
function searchMeal(e) {
  e.preventDefault(); // dont submit to a file

  single_mealEl.innerHTML = ""; // Clear single meal dynamically

  const term = search.value; // Get the user's food item search input

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals == null) {
          resultHeading.innerHTML = `<p>There are no results for '${term}'</p>`;
          mealsEl.innerHTML = "";
        } else {
          resultHeading.innerHTML = `<h2>Search Results for: '${term}'</h2>`;
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
              <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
                </div>
              </div>
            `
            )
            .join("");
        }
      });
    //  clear search text
    search.value = "";
  } else {
    alert("Please Enter Meal");
  }
}

// getMealById() - API search for food Item given API
// -------------
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// addMealToDOM(meal)
// ------------------
// 1. populate ar array with meal ingredients and its portion
// 2. Dynamically fill single-meal div
//          a. large photo
//          b. recipe details
//          c. ingredients using Map()
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ``} 
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ``}
    </div>
    <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map((ingred) => `<li>${ingred}</li>`).join("")}
        </ul>
    </div>
  </div>
  `;
}

// getRandomMeal() - gets a random meal from the API and populates DOM with addMealToDOM()
// ---------------
function getRandomMeal() {
  // Clear old data
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}
