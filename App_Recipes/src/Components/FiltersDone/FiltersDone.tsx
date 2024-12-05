import drinkIcon from '../../images/bebida-de-coquetel.png';
import mealAndDrinkIcon from '../../images/comida.png';
import mealIcon from '../../images/comida-e-restaurante.png';
import './FiltersDone.css';
import { DoneRecipe } from '../../types';

type FiltersDoneProp = {
  recipes: DoneRecipe[],
  allRecipes: DoneRecipe[],
  updateRecipes: (recipes: DoneRecipe[]) => void,
};

export default function FiltersDone({filterData} : {filterData: FiltersDoneProp}) {
  const { allRecipes, updateRecipes } = filterData;

  const filterRecipes = (filter: 'all' | 'meals' | 'drinks') => {
    if (filter === 'meals') {
      const newRecipes = allRecipes.filter((recipe) => recipe.type === 'meals');
      return updateRecipes(newRecipes);
    } else if (filter === 'drinks') {
      const newRecipes = allRecipes.filter((recipe) => recipe.type === 'drinks');
      return updateRecipes(newRecipes);
    }
    updateRecipes(allRecipes);
  };

  return (
    <div id="filters-done">
      <div className="filter">
        <button onClick={() => filterRecipes('all')}>
          <img src={mealAndDrinkIcon} alt="icon" />
        </button>
        <span>All</span>
      </div>

      <div className="filter">
        <button onClick={() => filterRecipes('meals')}>
          <img src={mealIcon} alt="icon" />
        </button>
        <span>Food</span>
      </div>

      <div className="filter">
        <button onClick={() => filterRecipes('drinks')}>
          <img src={drinkIcon} alt="icon" />
        </button>
        <span>Drinks</span>
      </div>
    </div>
  );
}
