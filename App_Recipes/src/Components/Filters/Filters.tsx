import { useContext } from 'react';
import drinkIcon from '../../images/drinkIcon.svg';
import drinkFilterIcon from '../../images/cocktail_filter.png';
import mealFilterIcon from '../../images/meal_filter.png';
import mealIcon from '../../images/mealIcon.svg';
import mealsContext from '../../context/mealsContext';
import drinksContext from '../../context/drinksContext';
import './Filters.css';

type FilterProp = {
  recipe: 'drink' | 'meal',
};

export default function Filters({ filterData }: { filterData: FilterProp }) {
  const { recipe } = filterData;
  const { mealFilters, filterRecipe } = useContext(mealsContext);
  const { drinkFilters } = useContext(drinksContext);

  if (recipe === 'drink') {
    return (
      <div className="filters">
        <div className="filter">
          <button onClick={ () => filterRecipe('drinks', 'all') }>
            <img src={ drinkIcon } alt="drink-icon" />
          </button>
          <span>All</span>
        </div>
        {drinkFilters.map((filter) => (
          <div className="filter" key={ filter }>
            <button onClick={ () => filterRecipe('drinks', filter) }>
              <img src={ drinkFilterIcon } alt="" />
            </button>
            <span>{ filter }</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="filters">
      <div className="filter" key="all">
        <button onClick={ () => filterRecipe('meals', 'all') }>
          <img src={ mealIcon } alt="meal-icon" />
        </button>
        <span>All</span>
      </div>
      {mealFilters.map((filter) => (
        <div className="filter" key={ filter }>
          <button onClick={ () => filterRecipe('meals', filter) }>
            <img src={ mealFilterIcon } alt="" />
          </button>
          <span>{ filter }</span>
        </div>
      ))}
    </div>
  );
}
