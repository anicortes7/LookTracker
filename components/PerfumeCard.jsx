import React, { useState } from 'react';

const PerfumeCard = ({
  name,
  brand,
  type,
  size,
  notes = [],
  mainAccords = [],
  isDecant = false,
}) => {
  const [favorito, setFavorito] = useState(false);

  const toggleFavorito = () => {
    setFavorito((prev) => !prev);
  };

  // Para mostrar tipo con formato legible:
  const typeLabels = {
    parfum: 'Parfum',
    extrait: 'Extrait de Parfum',
    edp: 'Eau de Parfum (EDP)',
    edt: 'Eau de Toilette (EDT)',
    edc: 'Eau de Cologne (EDC)',
    'body mist': 'Body Mist',
  };
  const displayType = typeLabels[type] || type;

  return (
    <div className={`card perfume-card shadow-sm position-relative ${isDecant ? 'decant-bg' : ''}`}>
      <div className="category-tag">{displayType}</div>
      
      <div className="card-body pb-4">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{brand}</p>
        {size && (
          <p className="card-text">
            <strong>Tamaño:</strong> {size}
          </p>
        )}

        {notes.length > 0 && (
          <div className="mb-2">
            <strong>Notas: </strong>
            {notes.map((note) => (
              <span key={note} className="badge bg-secondary me-1">{note}</span>
            ))}
          </div>
        )}

        {mainAccords.length > 0 && (
          <div>
            <strong>Main Accords: </strong>
            {mainAccords.map((accord) => (
              <span key={accord} className="badge bg-info me-1">{accord}</span>
            ))}
          </div>
        )}
      </div>

      <button
        className="favorite-btn"
        aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        onClick={toggleFavorito}
        type="button"
      >
        <img
          src={favorito ? '/icons/fav-filled.svg' : '/icons/fav.svg'}
          alt={favorito ? 'Favorito activado' : 'Favorito desactivado'}
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default PerfumeCard;
