import { useEffect, useState } from 'react';
import { DrinksAPIFilter, FavoriteRecipe } from '../../types';
import yellowHeartIcon from '../../images/yellow-heart.png';
import mealsImage from '../../images/meals.webp';
import drinksImage from '../../images/drinks.avif';
import heartIcon from '../../images/heart.png';
import './HeaderDetails.css';
import ButtonComp from '../ButtonComp/ButtonComp';

type HeaderDetailsProp = {
  recipeType: 'meals' | 'drinks',
  recipe: {
    id: string,
    name: string,
    image: string,
    category: string,
    alcoholic?: string,
    region?: string,
  },
};

export default function HeaderDetails({ headerData } : { headerData: HeaderDetailsProp }) {
  const [favorite, setFavorite] = useState(false);
  const { recipe, recipeType } = headerData;
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    if (storedFavorites) {
      const parsedFavorites: FavoriteRecipe[] = JSON.parse(storedFavorites);
      setFavoriteRecipes(parsedFavorites);

      const isFavorited = parsedFavorites.some((favRecipe) => favRecipe.id === recipe.id);
      setFavorite(isFavorited);
    }
    setIsInitialized(true);
  }, [recipe.id]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  }, [favoriteRecipes]);

  const favoriteButton = () => {
    if (!favorite) {
      const newRecipe = {
        id: recipe.id,
        type: recipeType,
        region: recipe.region,
        category: recipe.category,
        alcoholic: recipe.alcoholic,
        name: recipe.name,
        image: recipe.image,
      } as FavoriteRecipe;

      setFavoriteRecipes((prev) => [...prev, newRecipe]);
      setFavorite(true);
    } else {
      const recipesFilter = favoriteRecipes
        .filter((favRecipe) => favRecipe.id !== recipe.id);
      setFavoriteRecipes(recipesFilter);
      setFavorite(false);
    }
  };

  if (recipeType === 'drinks') {
    const { name, alcoholic } = recipe as DrinksAPIFilter;

    return (
      <header
        id="header"
        style={{
          backgroundImage: `url(${ drinksImage })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '40vh', // ajuste a altura conforme necessário
          width: '100%',
          color: 'white', // cor do texto sobre o background
        }}
      >
        <div id="icons">
          <ButtonComp buttonData={ { recipeType, id: recipe.id } } />
          { favorite ? (
            <button onClick={ favoriteButton }>
              <img src={ yellowHeartIcon } alt="heart icon" />
            </button>
          ) : (
            <button onClick={ favoriteButton }>
              <img src={ heartIcon } alt="heart icon" />
            </button>
          ) }
        </div>
        <h1>{ name.toUpperCase() }</h1>
        <span>
          ({ alcoholic })
        </span>
      </header>
    );
  }

  const { name, region } = recipe;

  return (
    <header
      id="header"
      style={{
        backgroundImage: `url(${ mealsImage })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '40vh', // ajuste a altura conforme necessário
        width: '100%',
        color: 'white', // cor do texto sobre o background
      }}
    >
      <div id="icons">
      <ButtonComp buttonData={ { recipeType, id: recipe.id } } />
        {favorite ? (
          <button onClick={ favoriteButton }>
            <img src={ yellowHeartIcon } alt="heart icon" />
          </button>
        ) : (
          <button onClick={ favoriteButton }>
            <img src={ heartIcon } alt="heart icon" />
          </button>
        )}
      </div>
      <h1>{ name.toUpperCase() }</h1>
      <span>
          ({ region })
      </span>
    </header>
  );
}
