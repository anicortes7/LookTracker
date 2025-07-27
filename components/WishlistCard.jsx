export default function WishlistCard({ item, onMove }) {
  const isPerfume = item.item_type === 'perfume';

  const cardBgClass = isPerfume ? 'bg-perfume' : 'bg-maquillaje';
  const buttonClass = isPerfume ? 'btn-perfume' : 'btn-makeup';

  // Mapeo para mostrar el tipo con su label legible
  const perfumeTypeLabels = {
    edp: 'Eau de Parfum',
    edt: 'Eau de Toilette',
    extrait: 'Extrait',
    oil: 'Perfume Oil',
    mist: 'Body Mist',
  };

  const displayType = isPerfume
    ? perfumeTypeLabels[item.type] || item.type
    : item.category;

  return (
    <div className={`card h-100 ${cardBgClass}`}>
      <div className="card-body d-flex flex-column">
        <h3 className="card-title py-2">{item.name}</h3>
        <h6 className="card-subtitle pt-1 mb-2 text-muted">{item.brand}</h6>
        <p className="card-text">
          {displayType}<br />
          {item.subcategory && <>{item.subcategory}<br /></>}
          {item.color && <>Color: {item.color}<br /></>}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="mb-2">
            {item.tags.map((tag) => (
              <span key={tag} className="badge bg-warning text-dark me-1">{tag}</span>
            ))}
          </div>
        )}
        <button
          className={`btn mt-auto ${buttonClass}`}
          onClick={() => onMove(item)}
        >
          Mover a colección
        </button>
      </div>
    </div>
  );
}
