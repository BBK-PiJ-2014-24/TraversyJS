// Select Elements
// ---------------
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

// Event Listeners
// ---------------
submit.addEventListener("submit", searchMeal);

// Functions
// ---------

// SearchMeal() - search API with fetch
// ------------
function searchMeal(e) {
  e.preventDefault(); // dont submit to a file

  // Clear single meal
  single_mealEl.innerHTML = "";

  // Ger search Term
  const term = search.value;

  // check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search Results for: '${term}'</h2>`;

        if (data.meals == null) {
          resultHeading.innerHTML = `<p>There are no results for '${term}'</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
                <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
            `
            )
            .join();
        }
      });
    //  clear search text
    search.value = "";
  } else {
    alert("Please Enter Meal");
  }
}
