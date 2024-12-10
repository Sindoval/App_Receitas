import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRecipeById, randomRecipes } from '../../utils/resultAPI';
import { DoneRecipe, DrinksAPIFilter, InProgressRecipes, MealsAPIFilter } from '../../types';
import './RecipeDetails.css';
import { getYouTubeEmbedUrl } from '../../utils/stringFilter';
import CardRecipe from '../../Components/CardRecipe/CardRecipe';
import Ingredients from '../../Components/Ingredients/Ingredients';
import Instructions from '../../Components/Instructions/Instructions';
import HeaderDetails from '../../Components/HeaderDetails/HeaderDetails';
import FooterButton from '../../Components/FooterButton/FooterButton';

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState<MealsAPIFilter | DrinksAPIFilter>();
  const [random, setRandom] = useState<MealsAPIFilter[] | DrinksAPIFilter[]>([]);
  const [recipeVerify, setRecipeVerify] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const { id } = useParams();
  const { pathname } = window.location;
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const recipeById = await fetchRecipeById(id, recipeType);
        setRecipe(recipeById);
      }
    };

    const fetchRandomRecipes = async () => {
      if (recipeType) {
        const recipes = await randomRecipes(recipeType, 6);
        setRandom(recipes);
      }
    };

    const localStorageVerify = () => {
      const storageDone = localStorage.getItem('doneRecipes');
      const progressRecipes = localStorage.getItem('inProgressRecipes');

      if (storageDone) {
        const verify = JSON.parse(storageDone).some((done: DoneRecipe) => done.id === id);
        setRecipeVerify(verify);
      }

      if (progressRecipes && id) {
        const storageProgress: InProgressRecipes = JSON.parse(progressRecipes);
        if (storageProgress[recipeType]?.[id]) {
          const verifyRecipe = storageProgress[recipeType] && storageProgress[recipeType][id].length > 0;
          setInProgress(verifyRecipe);
        }
      }
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchRecipe();
    fetchRandomRecipes();
    localStorageVerify();
  }, [id, recipeType]);

  if (recipe && recipeType === 'drinks') {
    const {
      name,
      alcoholic,
      instructions,
      image,
      video,
      ingredients,
      category,
    } = recipe as DrinksAPIFilter;
    return (
      <div>
        <HeaderDetails headerData={ { recipe: { id: recipe.id, name, image, alcoholic, category }, recipeType: 'drinks' } } />
        <main>
          <Ingredients ingredientsData={ { page: 'details', id: recipe.id, ingredients, image, name } } />
          <Instructions instructionsData={ { instructions } } />
          {video && (
            <section id="video">
              <h2>Vídeo</h2>
              <iframe
                src={ getYouTubeEmbedUrl(video) }
                width="560"
                height="315"
                allowFullScreen
              />
            </section>
          )}
          <section id="rec">
            <h2>Recommended</h2>
            <div id="random">
              {random.map((randomRecipe) => (
                <CardRecipe
                  key={ randomRecipe.id }
                  cardData={ {
                    recipe: 'DRINK',
                    id: randomRecipe.id,
                    name: randomRecipe.name,
                    image: randomRecipe.image,
                  } }
                />
              ))}
            </div>
          </section>
        </main>
        <FooterButton buttonData={ { type: recipeType, id, done: recipeVerify, inProgress } } />
      </div>
    );
  }
  if (recipe && recipeType === 'meals') {
    const { name, image, instructions, ingredients, video, region, category } = recipe as MealsAPIFilter;
    return (
      <div>
        <HeaderDetails headerData={ { recipe: { id: recipe.id, name, image, region, category }, recipeType: 'meals' } } />
        <main>
          <Ingredients ingredientsData={ { page: 'details', id: recipe.id, ingredients, image, name } } />
          <Instructions instructionsData={ { instructions } } />

          {video && (
            <section id="video">
              <iframe
                src={ getYouTubeEmbedUrl(video) }
                width="560"
                height="315"
                allowFullScreen
              />
            </section>
          )}

          <section id="rec">
            <h2>Recommended</h2>
            <div id="random">
              {random.map((randomRecipe) => (
                <CardRecipe
                  key={ randomRecipe.id }
                  cardData={ {
                    recipe: 'MEAL',
                    id: randomRecipe.id,
                    name: randomRecipe.name,
                    image: randomRecipe.image,
                  } }
                />
              ))}
            </div>
          </section>
        </main>
        <FooterButton buttonData={ { type: recipeType, id, done: recipeVerify, inProgress } } />
      </div>
    );
  }
  return null;
}
