import { createContext } from 'react';
import { DrinksAPIFilter } from '../types';

type DrinksContextType = {
  listDrinks: DrinksAPIFilter[],
  randomDrinks: DrinksAPIFilter[],
  newRandomRecipes: (recipe: 'drinks' | 'meals', recipes: DrinksAPIFilter[]) => void,
  newRecipes: (recipe: 'drinks' | 'meals', recipes: DrinksAPIFilter[]) => void,
  drinkFilters: string[],
  filterRecipe: (recipe: 'drink' | 'meal', filter: string) => void,
};

const drinksContext = createContext({} as DrinksContextType);

export default drinksContext;
