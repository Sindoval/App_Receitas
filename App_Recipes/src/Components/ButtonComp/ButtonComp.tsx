import copy from 'clipboard-copy';
import Swal from 'sweetalert2';
import compIcon from '../../images/compartilhar.png';

type ButtonCompProp = {
  recipeType: 'drinks' | 'meals',
  id: string,
};

export default function ButtonComp({buttonData} : {buttonData: ButtonCompProp}) {
  const { recipeType, id } = buttonData;

  const compButton = () => {
    const URL = `http://127.0.0.1:5173/${recipeType}/${id}`;
    copy(URL)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Link copied!',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <button
      onClick={compButton}
      style={{
        textDecoration: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <img src={compIcon} alt="icon" />
    </button>
  );
}
