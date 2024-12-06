import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks/Drinks';
import Profile from './Pages/Profile';
import ContextProviders from './context/ContextProviders';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress/RecipeInProgress';
import DoneRecipes from './Pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes/FavoriteRecipes';

export default function App() {
  return (
    <ContextProviders>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="profile" element={ <Profile /> } />
      </Routes>
    </ContextProviders>
  );
}
