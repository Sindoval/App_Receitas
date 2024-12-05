import { Link } from 'react-router-dom';
import ButtonComp from '../ButtonComp/ButtonComp';
import './CardDoneRecipe.css';

type DoneRecipeProp = {
  page: 'done-recipes' | 'favorites',
  id: string,
  image: string,
  name: string,
  region: string | '',
  alcoholic: string | '',
  category: string,
  tags: string[] | [],
  date: string,
  type: 'meals' | 'drinks',
};

export default function CardDoneRecipe({cardDoneData} : {cardDoneData: DoneRecipeProp}) {
  const { page, id, image, name, region, alcoholic, category, tags, date, type } = cardDoneData;
  
  if (page === 'done-recipes') {
    return (
      <div id="card-done">

        <div id="image">
      	  <Link to={`http://127.0.0.1:5173/${type}/${id}`}>
            <img src={ image } alt={ name } />
          </Link>

        </div>

        <section id="info">

          <div>
            <Link to={`http://127.0.0.1:5173/${type}/${id}`}>
              <h3>{ name }</h3>
            </Link>
            { type === 'drinks' ? (
              <span>{`${alcoholic} - ${category}`}</span>
            ) : (
              <span>{`${region} - ${category}`}</span>
            )}
          </div>

          <div id="date-tag">
            <div>
              <p>{`Done in: ${date}`}</p>
            </div>
            <div>
              {tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

        </section>
        <ButtonComp buttonData={{recipeType: type, id}} />
      </div>
      );
  }
  return null;
}
