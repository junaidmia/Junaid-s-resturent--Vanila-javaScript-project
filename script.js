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

                resultOfSearchResult.innerHTML = `<h2> Result for searching '${valueOfSearch}': </h2>`;
                if (data.meals === null) {
                    resultOfSearchResult.innerHTML = `<p> Wrong keyword !! Please enter a valid Keyword & Try again. </p>`
                } else {
                    mealsElement.innerHTML = data.meals
                        .map(meal => `<div class="meal">
                <img id="imgaes" src ="${meal.strMealThumb}" alt="${meal.strMeal}"/>

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