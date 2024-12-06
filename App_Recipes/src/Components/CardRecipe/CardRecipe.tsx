import { Link } from 'react-router-dom';
import { IngredientsType } from '../../types';
import './CardRecipe.css';

type CardRecipeType = {
  recipe: 'DRINK' | 'MEAL',
  id: string,
  name: string,
  image: string,
  category?: string,
  region?: string,
  alcoholic?: string,
  glass?: string,
  instructions?: string,
  video?: string,
  ingredients?: IngredientsType,
};

export default function CardRecipe({ cardData }: { cardData: CardRecipeType }) {
  const {
    recipe,
    id,
    name,
    category,
    region,
    alcoholic,
    glass,
    instructions,
    image,
    video,
    ingredients,
  } = cardData;

  if (recipe === 'DRINK') {
    return (
      <div className="card">
        <Link to={ `/drinks/${ id }` }>
          <img src={ image } alt={ name } />
        </Link>
        <span>{ name }</span>
      </div>
    );
  }
  return (
    <div className="card">
      <Link to={ `/meals/${id}` }>
        <img src={ image } alt={ name } />
      </Link>
      <span>{ name }</span>
    </div>
  );
}
