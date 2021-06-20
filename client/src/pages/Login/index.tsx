import React, { useState } from 'react';
import { history } from '../../App';
import { login } from '../../services/auth';
import styles from '../../styles/pages/Login.module.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await login({
      username,
      password,
    });
    if (response instanceof Error) {
      setErrorMessage(response.message);
    } else {
      localStorage.setItem('token', response);
      history.push('/');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input required placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
        <input required placeholder="Senha" type="password" onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Login</button>
        <div className={styles.loginErrorMessage}>{errorMessage}</div>
      </form>
    </div>
  );
};

export default Login;
