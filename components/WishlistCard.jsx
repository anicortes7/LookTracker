export default function WishlistCard({ item, onMove }) {
  const isPerfume = item.item_type === 'perfume';

  const cardBgClass = isPerfume ? 'bg-light' : 'bg-lightpink';

  return (
    <div className={`card h-100 ${cardBgClass}`}>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{item.brand}</h6>
        <p className="card-text">
          Tipo: {isPerfume ? item.type : item.category}<br />
          {item.size && <>Tamaño: {item.size}<br /></>}
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
          className="btn btn-success mt-auto"
          onClick={() => onMove(item)}
        >
          Mover a colección
        </button>
      </div>
    </div>
  );
}
