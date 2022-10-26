import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
const ImageGallery = ({ pictures, toggleModal }) => {
  return (
    <ul className={css.imageGallery}>
      <ImageGalleryItem pictures={pictures} toggleModal={toggleModal} />
    </ul>
  );
};
export default ImageGallery;
