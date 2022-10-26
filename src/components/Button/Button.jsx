import React from 'react';
import css from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <div className={css.conteiner}>
      <button className={css.button} type="button" onClick={onLoadMore}>
        Load More
      </button>
    </div>
  );
};
export default Button;
