import { useEffect, useState } from 'react';
import { IngredientsType, InProgressRecipes } from '../../types';
import './Ingredients.css';

type IngredientsProp = {
  page: 'details' | 'inProgress',
  id: string,
  image: string,
  name: string,
  ingredients: IngredientsType,
  onAllChecked?: (areAllChecked: boolean) => void;
};

export default function Ingredients({ ingredientsData } : { ingredientsData: IngredientsProp }) {
  const { page, id, ingredients, image, name, onAllChecked } = ingredientsData;
  const [isInitialized, setIsInitialized] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<{ [key: string]: boolean }>(
    ingredients.reduce((acc, { ingredient }) => {
      acc[ingredient] = false;
      return acc;
    }, {} as { [key: string]: boolean }),
  );
  const { pathname } = window.location;
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
  const progressRecipes = localStorage.getItem('inProgressRecipes');
  if (progressRecipes) {
    const parsedRecipes: InProgressRecipes = progressRecipes
    ? JSON.parse(progressRecipes)
    : { meals: {}, drinks: {} };
    const savedIngredients = parsedRecipes[recipeType]?.[id] || [];
    const initialChecked = ingredients.reduce((acc, { ingredient }) => {
      acc[ingredient] = savedIngredients.includes(ingredient);
      return acc;
    }, {} as { [key: string]: boolean });
    setCheckedIngredients(initialChecked);

    if (!parsedRecipes[recipeType]?.[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...parsedRecipes,
        [recipeType]: {
          ...parsedRecipes[recipeType],
          [id]: savedIngredients,
        },
      }));
    }
  }
  setIsInitialized(true);
  }, [id, recipeType, ingredients]);

  useEffect(() => {
    if (isInitialized) {
      const storage: InProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
      const updatedStorage = {
        ...storage,
        [recipeType]: {
          ...storage[recipeType],
          [id]: Object.entries(checkedIngredients)
            .filter(([_ingredient, isChecked]) => isChecked)
            .map(([ingredient]) => ingredient),
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedStorage));
    }
  }, [checkedIngredients, recipeType, id]);

  useEffect(() => { // Verifica se todas as checkboxes estão marcadas para o componente pai
    if (onAllChecked) {
      const areAllChecked = Object.values(checkedIngredients).every((checked) => checked);
      onAllChecked(areAllChecked);
    }
  }, [checkedIngredients, ingredientsData]);

  const handleCheckboxChange = (ingredient: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ingredient]: !prev[ingredient],
    }));
  };

  if (page === 'details') {
    return (
      <section id="ingredientes">
        <div id="list">
          <h2>Ingredients</h2>
          <ol>
            {ingredients && (
              ingredients.map(({ ingredient, measure }) => (
                <li
                  key={ingredient}
                >
                    - {ingredient} - {measure}
                </li>
              ))
            )}
          </ol>
        </div>
        <img src={image} alt={name} />
      </section>
    );
  }
  return (
    <section id="ingredientes">
      <div id="list">
        <h2>Ingredients</h2>
        <ol>
          {ingredients && (
            ingredients.map(({ ingredient, measure }, index) => (
              <li
                key={index}
              >
                <input
                  type="checkbox"
                  name=""
                  id={ingredient}
                  checked={checkedIngredients[ingredient] || false}
                  onChange={() => handleCheckboxChange(ingredient) }
                />
                <label htmlFor={ingredient}>{`${ingredient} - ${measure}`}</label>
              </li>
            ))
          )}
        </ol>
      </div>
      <img src={image} alt={name} />
    </section>
  );
}
