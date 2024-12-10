import { useEffect, useState } from 'react';
import CardDoneRecipe from '../../Components/CardDoneRecipe/CardDoneRecipe';
import { FilterFavorites } from '../../Components/FiltersDone/FiltersDone';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { FavoriteRecipe } from '../../types';
import '../DoneRecipes/DoneRecipes.css';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<FavoriteRecipe[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem('favoriteRecipes');
    if (storage) {
      setFavoriteRecipes(JSON.parse(storage));
      setAllRecipes(JSON.parse(storage));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  const updateRecipes = (recipes: FavoriteRecipe[]) => {
    setFavoriteRecipes(recipes);
  };

  return (
    <div>
      <Header headerData={ { title: 'FAVORITES', boolProfile: true, boolSearch: false } } />
      <FilterFavorites filterData={ { recipes: favoriteRecipes, allRecipes, updateRecipes } } />
      <main id="recipes">
        {favoriteRecipes.map(({ id, image, name, region, category, type, alcoholic }) => (
          <CardDoneRecipe
            key={ id }
            cardDoneData={ {
              page: 'favorites',
              id,
              image,
              name,
              category,
              region,
              type,
              alcoholic,
            } }
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
