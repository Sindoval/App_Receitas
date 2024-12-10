import { ReactNode, useEffect, useState } from 'react';
import mealsContext from './mealsContext';
import drinksContext from './drinksContext';
import { DrinksAPIFilter, FiltersType, MealsAPIFilter } from '../types';
import { fetchCategoriesAPI, fetchRecipeByCategory, randomRecipes } from '../utils/resultAPI';

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
        setRandomDrinks(drinkRecipes as DrinksAPIFilter[]);
        setListDrinks(drinkRecipes as DrinksAPIFilter[]);

        const mealRecipes = await randomRecipes('meals', 12);
        setRandomMeals(mealRecipes as MealsAPIFilter[]);
        setListMeals(mealRecipes as MealsAPIFilter[]);
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
      setRandomDrinks(recipes as DrinksAPIFilter[]);
    } else {
      setRandomMeals(recipes as MealsAPIFilter[]);
    }
  };

  const filterRecipe = async (recipe: 'drinks' | 'meals', filter: string) => {
    const isDrink = recipe === 'drinks';

    if (filter === 'all') {
      const randomRecipesList = isDrink ? randomDrinks : randomMeals;

      if (randomRecipesList.length > 0) {
        newRecipes(recipe, randomRecipesList);
      } else {
        const listRandomRecipes = await randomRecipes(recipe, 12);
        newRandomRecipes(recipe, listRandomRecipes);
        newRecipes(recipe, listRandomRecipes);
      }

      return;
    }

    const newFilters = await fetchRecipeByCategory(recipe, filter);

    if (isDrink) {
      setListDrinks(newFilters as DrinksAPIFilter[]);
    } else {
      setListMeals(newFilters as MealsAPIFilter[]);
    }
    console.log(listMeals);
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
    <mealsContext.Provider value={ mealsValue }>
      <drinksContext.Provider value={ drinksValue }>
        { children }
      </drinksContext.Provider>
    </mealsContext.Provider>
  );
}
