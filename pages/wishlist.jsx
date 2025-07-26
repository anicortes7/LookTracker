import { useState } from 'react';
import Navbar from '../components/Navbar';
import AddWishlistModal from '../components/AddWishlistModal';
import { supabase } from '../lib/supabaseClient';

export default function Wishlist({ wishlistItems }) {
  const [items, setItems] = useState(wishlistItems);
  const [showModal, setShowModal] = useState(false);

  const handleMoveToCollection = async (item) => {
    try {
      let insertTable = '';
      let insertData = {};

      if (item.item_type === 'perfume') {
        insertTable = 'perfumes';
        // Para perfumes: elimina id y item_type, conserva resto
        const { id, item_type, size, notes, main_accords, tags, name, brand, type, is_decant } = item;
        insertData = {
          name,
          brand,
          type,
          size,
          notes,
          main_accords,
          tags,
          is_decant,
        };
      } else if (item.item_type === 'makeup') {
        insertTable = 'makeup';
        // Para makeup: elimina id y item_type, conserva resto
        const { id, item_type, name, brand, category, subcategory, color, tono, tags } = item;
        insertData = {
          name,
          brand,
          category,
          subcategory,
          color,
          tono,
          tags,
        };
      } else {
        console.warn('Tipo de ítem desconocido:', item.item_type);
        return;
      }

      // Insertar en la colección correspondiente
      const { data: inserted, error: insertError } = await supabase
        .from(insertTable)
        .insert([insertData]);

      if (insertError) {
        console.error('Error al mover a colección:', insertError);
        return;
      }

      // Si insert exitoso, eliminar de wishlist
      const { error: deleteError } = await supabase
        .from('wishlist')
        .delete()
        .eq('id', item.id);

      if (deleteError) {
        console.error('Error al eliminar de wishlist:', deleteError);
        return;
      }

      // Actualizar estado local
      setItems((prev) => prev.filter(i => i.id !== item.id));
      alert(`Ítem movido a ${insertTable} exitosamente.`);
    } catch (err) {
      console.error('Error inesperado:', err);
    }
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
