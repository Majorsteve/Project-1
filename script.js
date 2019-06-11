const DOMAIN = "https://www.thecocktaildb.com/api.php";
const button = document.querySelector("button");
const drinkList = document.querySelector(".drink-list");

const displayInstruction = (drinkCard, drink) => {
  drinkCard.addEventListener('click', async () => {
    const resp = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`)
    const newDrink = resp.data.drinks[0];
    let drinkKeys = Object.keys(newDrink);
    drinkKeys = drinkKeys.filter((key) => key.includes('strIngredient'));
    drinkKeys.forEach((key) => {
      if (newDrink[key]) {
        const measurement = key.replace('strIngredient', 'strMeasure')
        const recipe = document.createElement('p');
        recipe.innerText = `${newDrink[key]} ${newDrink[measurement]}`;
        drinkCard.appendChild(recipe);
      }
    })
    const drinkInstructions = document.createElement('p');
    drinkInstructions.innerText = newDrink.strInstructions;
    drinkCard.appendChild(drinkInstructions);
  })
}

const renderList = (drinks) => {
  drinks.forEach((drink) => {
    const drinkCard = document.createElement('div');
    const drinkImage = document.createElement('img');
    drinkImage.src = drink.strDrinkThumb;
    const drinkName = document.createElement('p');
    drinkName.innerText = drink.strDrink;
    drinkCard.appendChild(drinkName);
    drinkCard.appendChild(drinkImage);
    drinkList.appendChild(drinkCard);
    displayInstruction(drinkCard, drink);
  })
}

const searchDrink = async (name) => {
  const resp = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
  renderList(resp.data.drinks)
};

button.addEventListener('click', (ev) => {
  ev.preventDefault();
  drinkList.innerHTML = " ";
  let inputDrink = document.querySelector('input');
  searchDrink(inputDrink.value);
});
