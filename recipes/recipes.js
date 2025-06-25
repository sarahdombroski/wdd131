import { recipes } from './recipe-book.js';

function generateRandomNumber(number) {
	return Math.floor(Math.random() * number);
}

function getRandomEntry() {
	const number = recipes.length;
	const entry = generateRandomNumber(number);
	return recipes[entry];
}

function tagsTemplate(tags) {
	let html = '';
	tags.forEach(tag => {
		html += `<p>${tag}</p>`;
	});
	return html;
}

function ratingTemplate(rating) {
	let html = `<span
		class="rating"
		role="img"
		aria-label="Rating: ${rating} out of 5 stars">`;

	for (let i = 1; i <= 5; i++) {
		if (i <= rating) {
			html += `<span aria-hidden="true" class="icon-star-empty">⭐</span>`;
		} else {
			html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
		}
	}
        
	html += `</span>`;
	return html;
}

function recipeTemplate(recipe) {
	return `<div class="recipe">
				<img src="${recipe.image}" alt="${recipe.alt}">
				<div class="info">
					<div class="tags">
						${tagsTemplate(recipe.tags)}
					</div>
					<h2>${recipe.name}</h2>
					${ratingTemplate(recipe.rating)}
					<p class="description">${recipe.description}</p>
				</div>
			</div>`
}

function renderRecipes(recipeList) {
	const output = document.querySelector(".allRecipes");
	let html = '';
	recipeList.forEach(recipe => {
		html += recipeTemplate(recipe);
	});
	output.innerHTML = html;
}

function init() {
	const recipe = getRandomEntry(recipes);
	renderRecipes([recipe]);
}

function searchHandler(e) {
	e.preventDefault();
	const input = document.getElementById('searchbar').value;
	const loweredinput = input.toLowerCase();
	const inputsplit = loweredinput.split(/\s+/);
	function filterRecipes(recipe) {
		return (
			inputsplit.some(word => recipe.name.toLowerCase().includes(word)) ||
			inputsplit.some(word => recipe.description.toLowerCase().includes(word)) ||
			inputsplit.some(word => recipe.tags.some(tag => tag.toLowerCase().includes(word))) ||
			inputsplit.some(word => recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(word)))
		)
	}
	const filteredRecipes = recipes.filter(filterRecipes);
	const sortedRecipes = filteredRecipes.sort((a,b) => a.name.localeCompare(b.name));
	renderRecipes(sortedRecipes);
}

init();

document.getElementById('searchButton').addEventListener('click', searchHandler);
document.getElementById('searchbar').addEventListener('input', searchHandler);