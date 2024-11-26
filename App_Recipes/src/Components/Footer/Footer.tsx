import { useNavigate } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <button onClick={() => navigate('/meals')}>
        <img src={mealIcon} alt="meal-icon" />
      </button>

      <button onClick={() => navigate('/drinks')}>
        <img src={drinkIcon} alt="drink-icon" />
      </button>
    </div>
  );
}
