const searchInput = document.getElementById('search'),
    submitBtn = document.getElementById('submit'),
    mealsElement = document.getElementById('meals'),
    resultOfSearchResult = document.getElementById('heading-of-result');


function inputSearchMeal(e) {
    e.preventDefault();
    resultOfSearchResult.innerHTML = ""
    const valueOfSearch = searchInput.value;
    console.log(valueOfSearch);

    if (valueOfSearch) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valueOfSearch}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                resultOfSearchResult.innerHTML = `<h2 id="result"> Result for searching '${valueOfSearch}': </h2>`;
                if (data.meals === null) {
                    resultOfSearchResult.innerHTML = `<p> Wrong keyword !! Please enter a valid Keyword & Try again. </p>`
                } else {
                    mealsElement.innerHTML = data.meals
                        .map(meal => `<div  id="div-of-image" onclick="mealname('${meal.idMeal}')" class="meal">
                        <div class="image-div" > <img  id="images" src ="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                         </div>

                         <div class="meal-info"> 
                         <h3> ${meal.strMeal} </h3> 
                          </div>            
                </div>`)

                        .join("");
                }
            });
        searchInput.value = "";

    } else {
        alert("Please Write Something in the search Box ")
    }
}

submitBtn.addEventListener("submit", inputSearchMeal);
// mealsElement.addEventListener('click',function(){
//     const junaid = '${meal.strMeal}';
//     console.log(junaid); 
// })




// Ingredients area

const mealname = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showMealInfo(data.meals[0]));
}
const showMealInfo = meal => {
    const infoDiv = document.getElementById('meals-information');
    infoDiv.innerHTML = `<div id="inf" >
<h1 class="mealName"> ${meal.strMeal}</h1>
<p id="country" > Country: ${meal.strArea} </p>
<img src="${meal.strMealThumb}">
 <h3 class="ingredients" >Ingredients</h3>
 <p> 01: ${meal.strIngredient1}</p>
 <p> 02: ${meal.strIngredient2}</p>
 <p> 03: ${meal.strIngredient3}</p>
 <p> 04: ${meal.strIngredient4}</p>
 <p> 05: ${meal.strIngredient5}</p>
 <p> 06: ${meal.strIngredient6}</p>
 <p> 07: ${meal.strIngredient7}</p>
 <p> 08: ${meal.strIngredient8}</p>
</div>
`
}