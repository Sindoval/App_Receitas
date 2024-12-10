import Swal from 'sweetalert2';
import {
  DrinksAPIFilter,
  FilterCategory,
  FiltersType,
  IngredientsType,
  MealsAPIFilter,
} from '../types';
import { stringFilter } from './stringFilter';

export const fetchDrinkByName = async (filter:'name' | 'first', input: string) => {
  const url = filter === 'name'
    ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.drinks) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Sorry, we haven't found any recipes for these filters.",
      });
      return [];
    }
    const formattedDrinks = data.drinks.map((drink: any) => formatRecipeDrink(drink));
    return formattedDrinks;
  } catch (error) {
    console.error('Error fetching the drinks:', error);
    return [];
  }
};

export const fetchMealByName = async (filter:'name' | 'first', input: string) => {
  const url = filter === 'name'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    : `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.meals) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Sorry, we haven't found any recipes for these filters.",
      });
      return [];
    }
    const formattedMeals = data.meals.map((meal: any) => formatRecipeMeal(meal));
    return formattedMeals;
  } catch (error) {
    console.error('Error fetching the Meals:', error);
    return [];
  }
};

export const fetchRecipeById = async (id: string, recipe: 'drinks' | 'meals') => {
  const URL = recipe === 'drinks'
    ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${(id)}`
    : `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${(id)}`;

  if (recipe === 'drinks') {
    const response = await fetch(URL);
    const data = await response.json();
    const recipeData = formatRecipeDrink(data.drinks[0]);
    return recipeData;
  }
  const response = await fetch(URL);
  const data = await response.json();
  const recipeData = formatRecipeMeal(data.meals[0]);
  return recipeData;
};

export const fetchRecipeForIngredient = async (recipe: 'drink' | 'meal', input: string) => {
  const url = recipe === 'drink'
    ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.text();
    // Se o corpo estiver vazio, exibe um alert específico
    if (!responseBody) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Sorry, we haven't found any recipes for these filters.",
      });
      return [];
    }

    let data;
    try {
      data = JSON.parse(responseBody);
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while parsing the response. Please try again later.',
      });
      return [];
    }

    if (recipe === 'drink') {
      const formattedDrinks = data.drinks
        .map((drink: any) => formatRecipeForIngredient('drink', drink));
      return formattedDrinks;
    } else {
      if (!data.meals) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Sorry, we haven't found any recipes for these filters.",
        });
        return [];
      }
      const formattedMeals = data.meals.map((meal:any) => formatRecipeForIngredient('meal', meal));
      return formattedMeals;
    }
  } catch (error) {
    console.error('Error fetching the Recipe:', error);
    return [];
  }
};

export const fetchCategoriesAPI = async ():Promise<FiltersType> => {
  const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const urlMeal = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const [responseDrinks, responseMeals] = await Promise
    .all([fetch(urlDrink), fetch(urlMeal)]);
  const dataDrink = await responseDrinks.json() as { drinks: FilterCategory[] };
  const dataMeal = await responseMeals.json() as { meals: FilterCategory[] };
  const filters: FiltersType = { meal: [], drink: [] };

  for (let i = 0; i <= 4; i += 1) {
    filters.meal.push(dataMeal.meals[i].strCategory);
    filters.drink.push(dataDrink.drinks[i].strCategory);
  }

  return filters;
};

export const fetchRecipeByCategory = async (recipe: 'drinks' | 'meals', category: string) => {
  const filterUnderscored = stringFilter(category);
  const url = recipe === 'drinks'
    ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterUnderscored}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterUnderscored}`;
  const response = await fetch(url);
  const data = await response.json();
  const allRecipes = [];

  if (recipe === 'drinks') {
    const max = Math.min(12, data.drinks.length);
    for (let i = 0; i < max; i += 1) {
      const recipe = {
        id: data.drinks[i].idDrink,
        name: data.drinks[i].strDrink,
        image: data.drinks[i].strDrinkThumb,
      };
      allRecipes.push(recipe);
    }
    return allRecipes;
  }
  const max = Math.min(12, data.meals.length);
  for (let i = 0; i < max; i += 1) {
    const recipe = {
      id: data.meals[i].idMeal,
      name: data.meals[i].strMeal,
      image: data.meals[i].strMealThumb,
    };
    allRecipes.push(recipe);
  }
  return allRecipes;
};

export const formatRecipeDrink = (recipe: any): DrinksAPIFilter => {
  const ingredients = [];
  const tags:string[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push({
        ingredient,
        measure: measure || '',
      });
    }
  }

  if (recipe.strTags) {
    const arrayTags = recipe.strTags.split(',');
    const limit = Math.min(2, arrayTags.length);
    for (let i = 0; i < limit; i++) {
      tags.push(arrayTags[i]);
    }
  }

  return {
    id: recipe.idDrink,
    name: recipe.strDrink,
    category: recipe.strCategory,
    alcoholic: recipe.strAlcoholic,
    glass: recipe.strGlass,
    instructions: recipe.strInstructions,
    image: recipe.strDrinkThumb,
    video: recipe.strVideo,
    ingredients: ingredients as IngredientsType,
    tags,
  };
};

export const formatRecipeMeal = (recipe: any): MealsAPIFilter => {
  const ingredients = [];
  const tags:string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push({
        ingredient,
        measure: measure || '',
      });
    }
  }

  if (recipe.strTags) {
    const arrayTags = recipe.strTags.split(',');
    const limit = Math.min(2, arrayTags.length);
    for (let i = 0; i < limit; i++) {
      tags.push(arrayTags[i]);
    }
  }

  return {
    id: recipe.idMeal,
    name: recipe.strMeal,
    category: recipe.strCategory,
    region: recipe.strArea,
    instructions: recipe.strInstructions,
    image: recipe.strMealThumb,
    video: recipe.strYoutube,
    ingredients: ingredients as IngredientsType,
    tags,
  };
};

const formatRecipeForIngredient = (recipeType: 'drink' | 'meal', recipe:any):MealsAPIFilter | DrinksAPIFilter => {
  if (recipeType === 'drink') {
    const result = {
      id: recipe.idDrink,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    return result as DrinksAPIFilter;
  }
  const result = {
    id: recipe.idMeal,
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  };
  return result as MealsAPIFilter;
};

export const randomRecipes = async (recipe: 'drinks' | 'meals', quantidade: number):Promise<MealsAPIFilter[] | DrinksAPIFilter[]> => {
  const url = recipe === 'drinks'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    : 'https://www.themealdb.com/api/json/v1/1/random.php';

  const recipes = [];

  if (recipe === 'drinks') {
    for (let i = 0; i < quantidade; i += 1) {
      const response = await fetch(url);
      const data = await response.json();
      const randomRecipe = formatRecipeDrink(data.drinks[0]);
      recipes.push(randomRecipe);
    }
    return recipes as DrinksAPIFilter[];
  }
  for (let i = 0; i < quantidade; i += 1) {
    const response = await fetch(url);
    const data = await response.json();
    const randomRecipe = formatRecipeMeal(data.meals[0]);
    recipes.push(randomRecipe);
  }
  return recipes as MealsAPIFilter[];
};
