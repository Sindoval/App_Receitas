import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Recipes from './Pages/Recipes';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="recipes" element={ <Recipes /> } />
      <Route path="recipes/meals" />
      <Route path="recipes/drinks" />
      <Route path="profile" />
    </Routes>
  );
}
