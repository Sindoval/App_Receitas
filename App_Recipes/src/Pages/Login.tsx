import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    localStorage.setItem('user', `{ email: ${email} }`);
    navigate('/recipes');
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
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
