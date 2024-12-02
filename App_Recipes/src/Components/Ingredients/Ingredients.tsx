import { IngredientsType } from '../../types';
import './Ingredients.css';

type IngredientsProp = {
  page: 'details' | 'inProgress',
  image: string,
  name: string,
  ingredients: IngredientsType,
};

export default function Ingredients({ ingredientsData } : { ingredientsData: IngredientsProp }) {
  const { page, ingredients, image, name } = ingredientsData;

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
      <h1>In progress</h1>
  );
}
