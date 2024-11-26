import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById, randomRecipes } from '../../utils/resultAPI';
import { DrinksAPIFilter, MealsAPIFilter } from '../../types';
import './RecipeDetails.css';
import mealsImage from '../../images/meals.webp';
import drinksImage from '../../images/drinks.avif';
import { getYouTubeEmbedUrl } from '../../utils/stringFilter';
import CardRecipe from '../../Components/CardRecipe/CardRecipe';

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState<MealsAPIFilter | DrinksAPIFilter>();
  const [random, setRandom] = useState<MealsAPIFilter[] | DrinksAPIFilter[]>([]);

  const { id } = useParams();
  const { pathname } = window.location;
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const recipeById = await fetchRecipeById(id, recipeType);
        setRecipe(recipeById);
        console.log(recipeById);
      }
    };

    const fetchRandomRecipes = async () => {
      if (recipeType) {
        const recipes = await randomRecipes(recipeType, 2);
        setRandom(recipes);
      }
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchRecipe();
    fetchRandomRecipes();
  }, [id, recipeType]);

  if (recipe && recipeType === 'drinks') {
    const {
      name,
      alcoholic,
      instructions,
      image,
      video,
      ingredients,
    } = recipe as DrinksAPIFilter;
    return (
      <div>
        <header
          id="header"
          style={{
            backgroundImage: `url(${drinksImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '50vh', // ajuste a altura conforme necessário
            width: '100%',
            color: 'white', // cor do texto sobre o background
          }}
        >
          <h1>{name.toUpperCase()}</h1>
        </header>
        <main>

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

          <section id="instrucao">
            <h2>Instructions</h2>
            <div>
              <p>{instructions}</p>
            </div>
          </section>

          {video && (
            <section id="video">
              <h2>Vídeo</h2>
              <iframe
                src={getYouTubeEmbedUrl(video)}
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
                  key={randomRecipe.id}
                  cardData={{
                    recipe: 'DRINK',
                    id: randomRecipe.id,
                    name: randomRecipe.name,
                    image: randomRecipe.image,
                  }}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }
  if (recipe && recipeType === 'meals') {
    const { name, image, instructions, ingredients, video } = recipe as MealsAPIFilter;
    return (
      <div>
        <header
          id="header"
          style={{
            backgroundImage: `url(${mealsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '40vh', // ajuste a altura conforme necessário
            width: '100%',
            color: 'white', // cor do texto sobre o background
          }}
        >
          <h1>{name.toUpperCase()}</h1>
        </header>
        <main>

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

          <section id="instrucao">
            <h2>Instructions</h2>
            <div>
              <p>{instructions}</p>
            </div>
          </section>

          {video && (
            <section id="video">
              <h2>Vídeo</h2>
              <iframe
                src={getYouTubeEmbedUrl(video)}
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
                  key={randomRecipe.id}
                  cardData={{
                    recipe: 'MEAL',
                    id: randomRecipe.id,
                    name: randomRecipe.name,
                    image: randomRecipe.image,
                  }}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }
}
