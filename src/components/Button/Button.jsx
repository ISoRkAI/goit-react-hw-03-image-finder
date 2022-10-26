import React from 'react';
import PropTypes from 'prop-types';
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

Button.prototype = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
