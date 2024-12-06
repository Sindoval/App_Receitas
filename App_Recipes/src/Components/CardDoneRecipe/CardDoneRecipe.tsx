import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteRecipe } from '../../types';
import ButtonComp from '../ButtonComp/ButtonComp';
import heartIcon from '../../images/yellow-heart.png';
import './CardDoneRecipe.css';

type DoneRecipeProp = {
  page: 'done-recipes' | 'favorites',
  id: string,
  image: string,
  name: string,
  region: string | '',
  alcoholic: string | '',
  category: string,
  tags?: string[] | [],
  date?: string,
  type: 'meals' | 'drinks',
};

export default function CardDoneRecipe({ cardDoneData } : { cardDoneData: DoneRecipeProp }) {
  const [favorite, setFavorite] = useState(true);
  const { page, id, image, name, region, alcoholic, category, tags, date, type } = cardDoneData;

  const favButton = () => {
    setFavorite(false);
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    const parsedFavorites: FavoriteRecipe[] = JSON.parse(storedFavorites as string);
    const favoriteFilter = parsedFavorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteFilter));
  };

  if (page === 'done-recipes') {
    return (
      <div id="card-done">

        <div id="image">
      	  <Link to={ `http://127.0.0.1:5173/${type}/${id}` }>
            <img src={ image } alt={ name } />
          </Link>

        </div>

        <section id="info">

          <div>
            <Link to={ `http://127.0.0.1:5173/${type}/${id}` }>
              <h3>{ name }</h3>
            </Link>
            { type === 'drinks' ? (
              <span>{`${ alcoholic } - ${ category }`}</span>
            ) : (
              <span>{`${ region } - ${ category }`}</span>
            )}
          </div>

          <div id="date-tag">
            <div>
              <p>{ `Done in: ${ date }` }</p>
            </div>
            <div>
              {tags?.map((tag) => (
                <span key={ tag } className="tag">{ tag }</span>
              ))}
            </div>
          </div>

        </section>
        <ButtonComp buttonData={{ recipeType: type, id }} />
      </div>
      );
  }
  if (favorite) {
    return (
    <div id="card-done">

        <div id="image">
      	  <Link to={ `http://127.0.0.1:5173/${type}/${id}` }>
            <img src={ image } alt={ name } />
          </Link>

        </div>

        <section id="info-fav">

          <div>
            <Link to={ `http://127.0.0.1:5173/${type}/${id}` }>
              <h3>{ name }</h3>
            </Link>
            { type === 'drinks' ? (
              <span>{`${ alcoholic } - ${ category }`}</span>
            ) : (
              <span>{`${ region } - ${ category }`}</span>
            )}
          </div>
            
          <div id="buttons">
            <ButtonComp buttonData={{ recipeType: type, id }} />
            <button onClick={ favButton }>
              <img src={ heartIcon } alt="heart-icon" />
            </button>
          </div>

        </section>
      </div>
    );  
  }
  return null;
}
