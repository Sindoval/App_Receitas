import { useContext, useEffect } from 'react';
import CardRecipe from '../../Components/CardRecipe/CardRecipe';
import Header from '../../Components/Header/Header';
import drinksContext from '../../context/drinksContext';
import './Drinks.css';
import Footer from '../../Components/Footer/Footer';
import Filters from '../../Components/Filters/Filters';

export default function Drinks() {
  const { listDrinks, randomDrinks, newRecipes } = useContext(drinksContext);

  useEffect(() => {
    if (listDrinks.length === 0 && randomDrinks.length > 0) {
      newRecipes('drinks', randomDrinks);
    }
  }, [randomDrinks, listDrinks]);

  return (
    <div>
      <Header
        headerData={ { title: 'DRINKS', boolProfile: true, boolSearch: true } }
      />
      <Filters filterData={ { recipe: 'drink' } } />
      <div className="cards">
        {listDrinks.map((drink) => (
          <CardRecipe
            key={ drink.id }
            cardData={ {
              recipe: 'DRINK',
              id: drink.id,
              name: drink.name,
              category: drink.category,
              alcoholic: drink.alcoholic,
              glass: drink.glass,
              instructions: drink.instructions,
              image: drink.image,
              video: drink.video,
              ingredients: drink.ingredients,
            } }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
