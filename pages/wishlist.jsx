import { useState } from 'react';
import Navbar from '../components/Navbar';
import AddWishlistModal from '../components/AddWishlistModal'; // ⬅️ Importamos el modal
import { supabase } from '../lib/supabaseClient';

export default function Wishlist({ wishlistItems }) {
  const [items, setItems] = useState(wishlistItems);
  const [showModal, setShowModal] = useState(false);

  const handleMoveToCollection = async (item) => {
    console.log('Mover a colección:', item);

    // Más adelante implementamos la lógica de mover
  };

  const handleAddToWishlist = async (newItem) => {
    const { data, error } = await supabase
      .from('wishlist')
      .insert([newItem]);

    if (error) {
      console.error('Error al agregar a wishlist:', error);
      return;
    }

    setItems((prev) => [...prev, data[0]]);
  };

  return (
    <>
      <Navbar />
      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="title-looktracker mb-0">Wishlist</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Agregar a wishlist
          </button>
        </div>

        <div className="row">
          {items.length === 0 ? (
            <p>No hay productos en wishlist.</p>
          ) : (
            items.map((item) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4" key={item.id}>
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.brand}</h6>
                    <p className="card-text">
                      Tipo: {item.item_type === 'perfume' ? item.type : item.category}<br />
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
                      onClick={() => handleMoveToCollection(item)}
                    >
                      Mover a colección
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {showModal && (
          <AddWishlistModal
            onClose={() => setShowModal(false)}
            onAdd={handleAddToWishlist}
          />
        )}
      </main>
    </>
  );
}

// Fetch inicial desde Supabase
export async function getServerSideProps() {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*');

  if (error) {
    console.error('Error cargando wishlist:', error);
    return { props: { wishlistItems: [] } };
  }

  return {
    props: {
      wishlistItems: data || [],
    },
  };
}
