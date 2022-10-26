import React from 'react';
import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ pictures, toggleModal }) => {
  return (
    <>
      {pictures &&
        pictures.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <li key={id} className={css.imageGalleryItem}>
              <img
                className={css.imageGalleryItemImage}
                src={webformatURL}
                alt=""
                onClick={() => toggleModal(largeImageURL)}
              />
            </li>
          );
        })}
    </>
  );
};
export default ImageGalleryItem;
