import { useNavigate } from 'react-router-dom';

type FooterButtonProp = {
  type: 'meals' | 'drinks',
  id?: string,
  done: boolean,
  inProgress: boolean,
};

export default function FooterButton({ buttonData } : { buttonData: FooterButtonProp }) {
  const { type, id, done, inProgress } = buttonData;
  const navigate = useNavigate();

  if (!done) {
    return (
      <footer>
        <button onClick={ () => navigate(`/${type}/${id}/in-progress`) }>
          { inProgress ? 'CONTINUE RECIPE' : 'START RECIPE' }
        </button>
      </footer>
    );
  }
  return null;
}
