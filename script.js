const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_mealEl = document.getElementById('single-meal');

function searchMeal(e) {
    e.preventDefault();
    resultHeading.innerHTML = ""
    const term = search.value;
    console.log(term);
    if (term){


        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {console.log(data)
            
            resultHeading.innerHTML = `<h2> Result for searching '${term}': </h2>`;
            if(data.meals === null){
                resultHeading.innerHTML = `<p> Please enter a valid Keyword . Try again ! </p>`
            }else{
                mealsEl.innerHTML = data.meals
                .map(meal =>`<div class="meal">
                <img id="imgaes" src ="${meal.strMealThumb}" alt="${meal.strMeal}"/>

                <div class="meal-info" data-mealID= "${meal.idMea}"> 
                
                 <h3> ${meal.strMeal} </h3> 

                  </div>
                </div>` ) 

                .join("");
            }
        });
        search.value="";

    }else{
        alert("please enter a valid item")
    }
}


submit.addEventListener("submit", searchMeal);