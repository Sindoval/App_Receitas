import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks/Drinks';
import Profile from './Pages/Profile';
import ContextProviders from './context/ContextProviders';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails';

export default function App() {
  return (
    <ContextProviders>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/meals/:id" element={<RecipeDetails />} />
        <Route path="/drinks/:id" element={<RecipeDetails />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </ContextProviders>
  );
}
