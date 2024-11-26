import { ReactNode, useEffect, useState } from 'react';
import mealsContext from './mealsContext';
import drinksContext from './drinksContext';
import { DrinksAPIFilter, FiltersType, MealsAPIFilter } from '../types';
import { fetchCategoriesAPI, randomRecipes } from '../utils/resultAPI';
import { stringFilter } from '../utils/stringFilter';

export default function ContextProviders({
  children,
}: {
  children: ReactNode;
}) {
  const [listDrinks, setListDrinks] = useState<DrinksAPIFilter[] | []>([]);
  const [listMeals, setListMeals] = useState<MealsAPIFilter[] | []>([]);
  const [filters, setFilters] = useState<FiltersType>({ meal: [], drink: [] });
  const [randomMeals, setRandomMeals] = useState<MealsAPIFilter[]>([]);
  const [randomDrinks, setRandomDrinks] = useState<DrinksAPIFilter[]>([]);

  useEffect(() => {
    const fetchFilter = async () => {
      const fetchFilters = await fetchCategoriesAPI();
      setFilters(fetchFilters);
    };
    const initialRecipes = async () => {
      if (randomDrinks.length === 0 && randomMeals.length === 0) {
        const drinkRecipes = await randomRecipes('drinks', 12);
        setRandomDrinks(drinkRecipes);
        setListDrinks(drinkRecipes);

        const mealRecipes = await randomRecipes('meals', 12);
        setRandomMeals(mealRecipes);
        setListMeals(mealRecipes);
      }
    };
    initialRecipes();
    fetchFilter();
  }, []);

  const newRecipes = (recipe: 'drinks' | 'meals', recipes: DrinksAPIFilter[] | MealsAPIFilter[]) => {
    if (recipe === 'drinks') {
      setListDrinks(recipes as DrinksAPIFilter[]);
    } else {
      setListMeals(recipes as MealsAPIFilter[]);
    }
  };

  const newRandomRecipes = (recipe: 'drinks' | 'meals', recipes: DrinksAPIFilter[] | MealsAPIFilter[]) => {
    if (recipe === 'drinks') {
      setRandomDrinks(recipes);
    } else {
      setRandomMeals(recipes);
    }
  };

  // Falta implementar o req 22. "toggle" nos botoes de filtro
  // Refatorar vvvv
  const filterRecipe = async (recipe: 'drink' | 'meal', filter: string) => {
    const filterUnderscored = stringFilter(filter);
    const url = recipe === 'drink'
      ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterUnderscored}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterUnderscored}`;

    if (filter === 'all') {
      if (recipe === 'drink') {
        if (randomDrinks.length > 0) {
          newRecipes('drinks', randomDrinks);
        } else {
          const listRandomDrinks = await randomRecipes('drinks', 12);
          newRandomRecipes('drinks', listRandomDrinks);
          newRecipes('drinks', listRandomDrinks);
        }
      } else {
        if (randomMeals.length > 0) {
          newRecipes('meals', randomMeals);
        } else {
          const listRandomMeals = await randomRecipes('meals', 12);
          newRandomRecipes('meals', listRandomMeals);
          newRecipes('meals', listRandomMeals);
        }
      }
      return;
    }

    const response = await fetch(url);
    const data = await response.json();
    const newFilters = [];

    if (recipe === 'drink') {
      const max = Math.min(12, data.drinks.length);
      for (let i = 0; i < max; i += 1) {
        const recipe = {
          id: data.drinks[i].idDrink,
          name: data.drinks[i].strDrink,
          image: data.drinks[i].strDrinkThumb,
        };
        newFilters.push(recipe);
      }
      setListDrinks(newFilters);
    } else {
      const max = Math.min(12, data.meals.length);
      for (let i = 0; i < max; i += 1) {
        const recipe = {
          id: data.meals[i].idMeal,
          name: data.meals[i].strMeal,
          image: data.meals[i].strMealThumb,
        };
        newFilters.push(recipe);
      }
      setListMeals(newFilters);
    }
  };

  const mealsValue = {
    listMeals,
    randomMeals,
    newRandomRecipes,
    newRecipes,
    mealFilters: filters.meal,
    filterRecipe,
  };
  const drinksValue = {
    listDrinks,
    randomDrinks,
    newRandomRecipes,
    newRecipes,
    drinkFilters: filters.drink,
    filterRecipe,
  };

  return (
    <mealsContext.Provider value={mealsValue}>
      <drinksContext.Provider value={drinksValue}>
        {children}
      </drinksContext.Provider>
    </mealsContext.Provider>
  );
}
