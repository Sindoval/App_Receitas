import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderDetails from '../../Components/HeaderDetails/HeaderDetails';
import Ingredients from '../../Components/Ingredients/Ingredients';
import Instructions from '../../Components/Instructions/Instructions';
import { DrinksAPIFilter, MealsAPIFilter, DoneRecipe } from '../../types';
import { getFormattedDate } from '../../utils/dateFormated';
import { fetchRecipeById } from '../../utils/resultAPI';

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState<MealsAPIFilter | DrinksAPIFilter>();
  const [allChecked, setAllChecked] = useState(false);
  const { id } = useParams();
  const { pathname } = window.location;
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const recipeById = await fetchRecipeById(id, recipeType);
        setRecipe(recipeById);
        console.log(recipeById);
      }
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchRecipe();
  }, [id, recipeType]);

  const changeAllChecked = (areAllChecked: boolean) => {
    setAllChecked(areAllChecked);
  };

  const finishRecipeButton = () => {
    const storage = localStorage.getItem('doneRecipes');
    const currentDate = getFormattedDate(new Date());

    if (!recipe || !id) return;
    const isDrink = (recipe: MealsAPIFilter | DrinksAPIFilter): recipe is DrinksAPIFilter => {
      return (recipe as DrinksAPIFilter).alcoholic !== undefined;
    };

    const newRecipe: DoneRecipe = {
      id,
      type: recipeType,
      region: !isDrink(recipe) ? recipe.region : '', // Apenas Meals têm região
      alcoholicOrNot: isDrink(recipe) ? recipe.alcoholic : '', // Apenas Drinks têm alcoholic
      category: recipe.category,
      name: recipe.name,
      image: recipe.image,
      doneDate: currentDate,
      tags: recipe.tags,
    };

    if (storage) {
      const parseStorage: DoneRecipe[] = JSON.parse(storage);
      parseStorage.push(newRecipe);
      localStorage.setItem('doneRecipes', JSON.stringify(parseStorage));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([newRecipe]));
    }
    navigate('/done-recipes');
  };

  if (recipe && recipeType === 'drinks') {
    const {
      name,
      alcoholic,
      instructions,
      image,
      ingredients,
      category,
    } = recipe as DrinksAPIFilter;

    return (
      <div>
        <HeaderDetails headerData={{recipe: {id: recipe.id, name, image, alcoholic, category}, recipeType: 'drinks'}} />
        <main>
          <Ingredients ingredientsData={{page: 'inProgress',id: recipe.id, ingredients, image, name, onAllChecked: changeAllChecked}} />
          <Instructions instructionsData={{instructions}} />
        </main>
        {allChecked && (
          <footer>
            <button onClick={finishRecipeButton}>FINISH RECIPE</button>
          </footer>
        )}
      </div>
    );
  }
  if (recipe && recipeType === 'meals') {
    const {
      name,
      image,
      instructions,
      ingredients,
      region,
    } = recipe as MealsAPIFilter;

    return (
      <div>
        <HeaderDetails headerData={{recipe: {id: recipe.id, name, image, region}, recipeType: 'meals'}} />
        <main>
          <Ingredients ingredientsData={{page: 'inProgress',id: recipe.id, ingredients, image, name, onAllChecked: changeAllChecked}} />
          <Instructions instructionsData={{instructions}} />
        </main>
        {allChecked && (
          <footer>
            <button onClick={finishRecipeButton}>FINISH RECIPE</button>
          </footer>
        )}
      </div>
    );
  }
  return null;
}
