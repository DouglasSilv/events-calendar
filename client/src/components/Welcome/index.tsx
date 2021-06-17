import React from 'react';
import { MONTHS } from '../../constants';
import styles from '../../styles/components/Welcome.module.css';

const Welcome: React.FC = () => {
  const now = new Date();
  const dayOfTheMonth = now.getDate();
  const monthOfTheYear = MONTHS[now.getMonth()];
  const year = now.getFullYear();

  return (
    <div className={styles.appWelcome}>
      Olá! Hoje é dia {dayOfTheMonth} de {monthOfTheYear} de {year}. Seja bem vindo(a)!
    </div>
  );
};

export default Welcome;
