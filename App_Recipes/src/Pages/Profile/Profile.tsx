import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { User } from '../../types';
import doneIcon from '../../images/check-up.png';
import haertIcon from '../../images/yellow-heart.png';
import logoutIcon from '../../images/logout.png';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const emailStorage = localStorage.getItem('user');
    if (emailStorage) {
      const parseStorage: User = JSON.parse(emailStorage);
      setUser(parseStorage);
    }
  }, []);

  const logoutButton = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    navigate('/');
  };

  return (
    <div id="profile">
      <Header
        headerData={ { title: 'PROFILE', boolProfile: true, boolSearch: false } }
      />
      <div id="user-info">
        { user?.email }
      </div>
      <section id="profile-icons">

        <div className="info-icon">
          <button onClick={ () => navigate('/done-recipes') }>
            <img src={ doneIcon } alt="done-icon" />
          </button>
          <span>Done Recipes</span>
        </div>

          <hr />

        <div className="info-icon">
          <button onClick={ () => navigate('/favorite-recipes') }>
            <img src={ haertIcon } alt="heart-icon" />
          </button>
          <span>Favorite Recipes</span>
        </div>

        <hr />

        <div className="info-icon">
          <button onClick={ logoutButton }>
            <img src={ logoutIcon } alt="logout-icon" />
          </button>
          <span>Logout</span>
        </div>

      </section>
      <Footer />
    </div>
  );
}
