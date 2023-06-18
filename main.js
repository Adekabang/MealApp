const result = document.getElementById('result')
const formSearch = document.getElementById('search-section')
const numResult = document.getElementById('num-result')

async function search(keyword) {
  result.textContent = "";

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
    const data = await response.json();
    const meals = data.meals;
    
    if (meals) { 
      const numMeals = meals ? meals.length : 0
      numResult.textContent = `${numMeals} foods found`

      meals.forEach(meal => {
        const itemCard = `<div class="result-item"><img src="${meal.strMealThumb}" alt="${meal.strMeal}"><span>${meal.strMeal}</span></div>`
        result.innerHTML += itemCard;
      });
    } else {
      const noResult = document.createElement("p");
      noResult.textContent = "No meals for today 😭";
      result.appendChild(noResult);
      numResult.textContent = `0 foods found`
    }
  } catch (error) {
    console.log(error);
  }
}


formSearch.addEventListener('submit', function(event){
  event.preventDefault()
  let keyword = document.getElementById('search-input').value
  search(keyword)
})
