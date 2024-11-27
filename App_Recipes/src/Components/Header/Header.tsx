import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import recipeLogo from '../../images/recipe_12300151.png';
import searchLogo from '../../images/searchIcon.svg';
import profileLogo from '../../images/profileIcon.svg';
import './Header.css';
import MidHeader from '../MidHeader/MidHeader';
import { InputSearch } from '../../types';
import {
  fetchDrinkByName,
  fetchMealByName,
  fetchRecipeForIngredient,
} from '../../utils/resultAPI';
import drinksContext from '../../context/drinksContext';

type HeaderProp = {
  title?: 'DRINKS' | 'MEALS' | 'PROFILE' | 'FAVORITES' | 'DONE RECIPES';
  boolProfile: boolean;
  boolSearch: boolean;
};

export default function Header({ headerData }: { headerData: HeaderProp }) {
  const { title, boolProfile, boolSearch } = headerData;
  const [inputSearch, setInputSearch] = useState(false);
  const [search, setSearch] = useState<InputSearch>({
    input: '',
    filter: '',
  });
  const navigate = useNavigate();
  const { newRecipes } = useContext(drinksContext);

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSearch({
      ...search,
      [name]: value,
    });
  };

  const clickSearch = async () => {
    const { input, filter } = search;
    if (filter === 'First letter' && input.length > 1) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your search must have only 1 (one) character!',
      });
    }

    if (title === 'DRINKS') {
      switch (filter) {
        case 'Ingredient': {
          const dataI = await fetchRecipeForIngredient('drink', input);
          newRecipes('drinks', dataI);
          console.log(dataI);
          break;
        }
        case 'Name': {
          const dataN = await fetchDrinkByName('name', input);
          console.log(dataN);
          newRecipes('drinks', dataN);
          break;
        }
        case 'First letter': {
          const dataF = await fetchDrinkByName('first', input);
          console.log(dataF);
          newRecipes('drinks', dataF);
          break;
        }
        default:
          console.warn('Filtro inesperado:', filter);
      }
    } else if (title === 'MEALS') {
      switch (filter) {
        case 'Ingredient': {
          const dataI = await fetchRecipeForIngredient('meal', input);
          newRecipes('meals', dataI);
          console.log(dataI);

          break;
        }
        case 'Name': {
          const dataN = await fetchMealByName('name', input);
          newRecipes('meals', dataN);
          console.log(dataN);
          break;
        }
        case 'First letter': {
          const dataF = await fetchMealByName('first', input);
          newRecipes('meals', dataF);
          console.log(dataF);
          break;
        }
        default:
          console.warn('Filtro inesperado:', filter);
      }
    }
    setInputSearch(false);
  };

  return (
    <header>
      <div className="top-header">
        <img src={recipeLogo} alt="" />
        <h3>RECIPESapp</h3>
        <div>
          {boolSearch && ( // condicional para os icones
            <button>
              <img
                onClick={() => setInputSearch(!inputSearch)}
                src={searchLogo}
                alt="search-icon"
              />
            </button>
          )}
          {boolProfile && (
            <button>
              <img
                src={profileLogo}
                alt="profile-icon"
                onClick={() => navigate('/profile')}
              />
            </button>
          )}
        </div>
      </div>

      {title && (
        <MidHeader midProp={{ title }} />// comp. para o meio do header
      )}

      {inputSearch && ( // condicional para a pesquisa
        <div className="search-header">
          <div>
            <input
              type="text"
              placeholder="Search"
              name="input"
              id="search"
              onChange={(e) => handleInputSearch(e)}
            />
          </div>

          <div className="radios">
            <div>
              <label htmlFor="ingredient">Ingredient</label>
              <input
                type="radio"
                name="filter"
                id="ingredient"
                value="Ingredient"
                onChange={(e) => handleInputSearch(e)}
              />
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
               type="radio"
                name="filter"
                id="name"
                value="Name"
                onChange={(e) => handleInputSearch(e)}
              />
            </div>
            <div>
              <label htmlFor="first-letter">First letter</label>
              <input
                type="radio"
                name="filter"
                id="first-letter"
                value="First letter"
                onChange={(e) => handleInputSearch(e)}
              />
            </div>
          </div>
          <button
            onClick={clickSearch}
          >
            SEARCH
          </button>
        </div>
      )}
    </header>
  );
}
