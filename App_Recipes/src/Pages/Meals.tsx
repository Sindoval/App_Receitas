import { useContext, useEffect } from 'react';
import Header from '../Components/Header/Header';
import mealsContext from '../context/mealsContext';
import CardRecipe from '../Components/CardRecipe/CardRecipe';
import Footer from '../Components/Footer/Footer';
import Filters from '../Components/Filters/Filters';

export default function Meals() {
  const { listMeals, newRecipes, randomMeals } = useContext(mealsContext);

  useEffect(() => {
    if (listMeals.length === 0 && randomMeals.length > 0) {
      newRecipes('meals', randomMeals);
    }
  }, [randomMeals, listMeals]);

  return (
    <div>
      <Header
        headerData={ { title: 'MEALS', boolProfile: true, boolSearch: true } }
      />
      <Filters filterData={ { recipe: 'meal' } } />
      <div className="cards">
        {listMeals.map((meal) => (
          <CardRecipe
            key={ meal.id }
            cardData={ {
              recipe: 'MEAL',
              id: meal.id,
              name: meal.name,
              category: meal.category,
              region: meal.region,
              instructions: meal.instructions,
              image: meal.image,
              video: meal.video,
              ingredients: meal.ingredients,
            } }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
