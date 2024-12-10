import { createContext } from 'react';
import { MealsAPIFilter } from '../types';

type MealsContextType = {
  listMeals: MealsAPIFilter[] | [],
  randomMeals: MealsAPIFilter[],
  newRandomRecipes: (recipe: 'drinks' | 'meals', recipes: MealsAPIFilter[]) => void,
  newRecipes: (recipe: 'drinks' | 'meals', recipes: MealsAPIFilter[]) => void,
  mealFilters: string[],
  filterRecipe: (recipe: 'drinks' | 'meals', filter: string) => void,
};

const mealsContext = createContext({} as MealsContextType);

export default mealsContext;
