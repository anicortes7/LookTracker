import { useState } from 'react';
import Navbar from '../components/Navbar';
import AddWishlistModal from '../components/AddWishlistModal';
import WishlistCard from '../components/WishlistCard'; // Importamos el nuevo componente
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
        const { id, item_type, ...rest } = item;
        insertData = rest;
      } else if (item.item_type === 'makeup') {
        insertTable = 'makeup';
        const { id, item_type, ...rest } = item;
        insertData = rest;
      } else {
        console.warn('Tipo de ítem desconocido:', item.item_type);
        return;
      }

      const { data: inserted, error: insertError } = await supabase
        .from(insertTable)
        .insert([insertData]);

      if (insertError) {
        console.error('Error al mover a colección:', insertError);
        return;
      }

      const { error: deleteError } = await supabase
        .from('wishlist')
        .delete()
        .eq('id', item.id);

      if (deleteError) {
        console.error('Error al eliminar de wishlist:', deleteError);
        return;
      }

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
                <WishlistCard item={item} onMove={handleMoveToCollection} />
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
