import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoIcon from '../../images/livro-de-receitas.png';
import './Login.css';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(true);

  const { email, password } = user;
  const navigate = useNavigate();

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const test = regex.test(email);
    const min = 6;

    if (test && password.length >= min) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const buttonClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    navigate('/meals');
  };

  return (
    <div id="login">
      <header>
        <h1>RECIPES app</h1>
      </header>
      <div id="logo">
        <img src={ logoIcon } alt="livro de receitas" />
      </div>
      <h2>Login</h2>
      <div id="inputs">
        <input
          type="text"
          placeholder="Email"
          value={ email }
          name="email"
          onChange={ (e) => handleChange(e) }
        />
        <input
          type="password"
          placeholder="Senha"
          value={ password }
          name="password"
          onChange={ (e) => handleChange(e) }
        />
        <button
          disabled={ disabled }
          onClick={ buttonClick }
        >
          Enter
        </button>
      </div>
    </div>
  );
}
