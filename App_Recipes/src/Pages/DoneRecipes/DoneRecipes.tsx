import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { DoneRecipe } from '../../types';
import CardDoneRecipe from '../../Components/CardDoneRecipe/CardDoneRecipe';
import './DoneRecipes.css';
import { FiltersDone } from '../../Components/FiltersDone/FiltersDone';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<DoneRecipe[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem('doneRecipes');
    if (storage) {
      setDoneRecipes(JSON.parse(storage));
      setAllRecipes(JSON.parse(storage));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  const updateRecipes = (recipes: DoneRecipe[]) => {
    setDoneRecipes(recipes);
  };

  return (
    <div>
      <Header headerData={ { title: 'DONE RECIPES', boolProfile: true, boolSearch: false } } />
      <FiltersDone filterData={ { recipes: doneRecipes, allRecipes, updateRecipes } } />
      <main id="recipes">
        {doneRecipes.map(({ id, image, name, region, alcoholicOrNot, category, tags, type, doneDate }) => (
          <CardDoneRecipe
            key={ id }
            cardDoneData={ {
              page: 'done-recipes',
              id,
              image,
              name,
              category,
              region,
              alcoholic: alcoholicOrNot,
              tags,
              type,
              date: doneDate,
            } }
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
