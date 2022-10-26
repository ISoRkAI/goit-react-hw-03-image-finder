import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ pictures, toggleModal }) => {
  return (
    <ul className={css.imageGallery}>
      <ImageGalleryItem pictures={pictures} toggleModal={toggleModal} />
    </ul>
  );
};

ImageGallery.prototype = {
  pictures: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGallery;
