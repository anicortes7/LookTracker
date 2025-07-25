import React, { useState } from 'react';
import Image from 'next/image';

const ProductCard = ({
  name,
  brand,
  category,
  subcategory,
  image,
}) => {
  const [favorito, setFavorito] = useState(false);

  const toggleFavorito = () => {
    setFavorito((prev) => !prev);
  };

  return (
    <div className="card product-card shadow-sm position-relative">
      <div className="category-tag">{category}</div>

      <div className="product-image-container">
        <Image
          src={image || '/placeholder.jpg'}
          alt={name}
          width={300}
          height={200}
          className="card-img-top product-image"
        />
      </div>

      <div className="card-body pb-5">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{brand}</p>
        {subcategory && (
          <p className="card-text">
            <strong>Subcategoría:</strong> {subcategory}
          </p>
        )}
      </div>

      <button
        className="favorite-btn"
        aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        onClick={toggleFavorito}
        type="button"
      >
        <Image
          src={favorito ? '/icons/fav-filled.svg' : '/icons/fav.svg'}
          alt={favorito ? 'Favorito activado' : 'Favorito desactivado'}
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default ProductCard;
