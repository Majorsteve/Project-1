const DOMAIN = "https://www.thecocktaildb.com/api.php";
const button = document.querySelector("button");
const list = document.querySelector(".drink-list");

const renderList = (drinks) => {
  drinks.forEach((drink) => {
    const drinkCard = document.createElement('div');
    const drinkImage = document.createElement('img');
    drinkImage.src = drink.strDrinkThumb;
    const drinkName = document.createElement('p');
    drinkName.innerText = drink.strDrink;
    drinkCard.appendChild(drinkName);
    drinkCard.appendChild(drinkImage);
    list.appendChild(drinkCard);
  })
}


const searchDrink = async (name) => {
  const resp = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
  renderList(resp.data.drinks)
};

button.addEventListener('click', (ev) => {
  ev.preventDefault();
  list.innerHTML = " ";
  let inputDrink = document.querySelector('input');
  searchDrink(inputDrink.value);
});
