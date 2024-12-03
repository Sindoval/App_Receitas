import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderDetails from '../../Components/HeaderDetails/HeaderDetails';
import Ingredients from '../../Components/Ingredients/Ingredients';
import Instructions from '../../Components/Instructions/Instructions';
import { DrinksAPIFilter, MealsAPIFilter } from '../../types';
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
            <button onClick={() => navigate('/done-recipes')}>FINISH RECIPE</button>
          </footer>
        )}
      </div>
    );
  }
  if (recipe && recipeType === 'meals') {
    const { name, image, instructions, ingredients, region} = recipe as MealsAPIFilter;

    return (
      <div>
        <HeaderDetails headerData={{recipe: {id: recipe.id, name, image, region}, recipeType: 'meals'}} />
        <main>
          <Ingredients ingredientsData={{page: 'inProgress',id: recipe.id, ingredients, image, name, onAllChecked: changeAllChecked}} />
          <Instructions instructionsData={{instructions}} />
        </main>
        {allChecked && (
          <footer>
            <button onClick={() => navigate('/done-recipes')}>FINISH RECIPE</button>
          </footer>
        )}
      </div>
    );
  }
  return null;
}
