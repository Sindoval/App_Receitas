export type InputSearch = {
  input: string,
  filter: 'Ingredient' | 'Name' | 'First letter' | ''
};

export type DrinksAPIFilter = {
  id: string,
  name: string,
  image: string,
  category?: string,
  alcoholic?: string,
  glass?: string,
  instructions?: string,
  video?: string,
  ingredients?: IngredientsType,
};

export type IngredientsType = [{
  ingredient: string,
  measure: string,
}];

export type MealsAPIFilter = {
  id: string,
  name: string,
  image: string,
  category?: string,
  region?: string,
  instructions?: string,
  video?: string,
  ingredients?: IngredientsType,
};

export type DrinkForIngredientType = {
  idDrink: string,
  strDrink: string,
  strDrinkThumb: string,
};

export type MealForIngredientType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
};

export type RecipeAPIIngredientFilter = {
  id: string,
  name: string,
  image: string,
};

export type FiltersType = {
  meal: string[],
  drink: string[],
};

export type FilterCategory = {
  strCategory: string,
};

export type FilterAPIResponse =
{ drinks: FilterCategory[] } | { meals: FilterCategory[] };