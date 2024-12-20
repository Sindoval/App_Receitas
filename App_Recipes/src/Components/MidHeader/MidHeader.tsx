import drinkLogo from '../../images/drinkIcon.svg';
import mealLogo from '../../images/mealIcon.svg';
import profileLogo from '../../images/profileIcon.svg';
import favoritesLogo from '../../images/blackHeartIcon.svg';
import doneLogo from '../../images/check-up.png';

type MidHeaderprop = {
  title: 'DRINKS' | 'MEALS' | 'PROFILE' | 'FAVORITES' | 'DONE RECIPES'
};

export default function MidHeader({ midProp }: { midProp: MidHeaderprop }) {
  const { title } = midProp;

  if (title === 'DRINKS') {
    return (
      <div className="mid-header">
        <img src={ drinkLogo } alt="drinks-icon" />
        <h3>{title}</h3>
      </div>
    );
  } else if (title === 'MEALS') {
    return (
      <div className="mid-header">
        <img src={ mealLogo } alt="meals-icon" />
        <h3>{title}</h3>
      </div>
    );
  } else if (title === 'PROFILE') {
    return (
      <div className="mid-header">
        <img src={ profileLogo } alt="profile-icon" />
        <h3>{title}</h3>
      </div>
    );
  } else if (title === 'FAVORITES') {
    return (
      <div className="mid-header">
        <img src={ favoritesLogo } alt="favorite-icon" />
        <h3>{title}</h3>
      </div>
    );
  } else {
    return (
      <div className="mid-header">
        <img src={ doneLogo } alt="done-icon" />
        <h3>{title}</h3>
      </div>
    );
  }
}
