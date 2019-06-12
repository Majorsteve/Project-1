const DOMAIN = "https://www.thecocktaildb.com/api.php";
const button = document.querySelector("button");
const drinkList = document.querySelector(".drink-list");
const modalDiv = document.querySelector(".additional-data");
const modal = document.querySelector("#modal");
const offButton = document.querySelector(".offButton");

offButton.addEventListener('click', () => {
  modal.classList.add("display-none");
  modalDiv.innerText = "";
})

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
        modalDiv.appendChild(recipe);
      }
    })
    const drinkInstructions = document.createElement('p');
    drinkInstructions.innerText = newDrink.strInstructions;
    modalDiv.appendChild(drinkInstructions);
    modal.classList.remove("display-none");
  })
}



const renderList = (drinks) => {
  drinks.forEach((drink) => {
    const drinkCard = document.createElement('div');
    const drinkImage = document.createElement('img');
    drinkImage.src = drink.strDrinkThumb;
    displayInstruction(drinkImage, drink);
    const drinkName = document.createElement('p');
    drinkName.innerText = drink.strDrink;
    drinkCard.appendChild(drinkImage);
    drinkCard.appendChild(drinkName);
    drinkList.appendChild(drinkCard);
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
