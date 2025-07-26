import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import { supabase } from '../lib/supabaseClient';

export default function Makeup({ products }) {
  const [showModal, setShowModal] = useState(false);

  const handleAdd = async (newProduct) => {
    // Inserta en Supabase
    const { data, error } = await supabase
      .from('makeup')
      .insert([newProduct]);

    if (error) {
      console.error('Error al agregar producto:', error);
    } else {
      console.log('Producto agregado:', data);
      // ⚠️ Esto no recarga la página.
      // Para recargar los datos podrías:
      //  - Usar SWR
      //  - Hacer router.reload()
      //  - O simplemente refrescar manual por ahora.
    }
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="title-looktracker mb-0">Makeup Collection</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Agregar producto
          </button>
        </div>

        <div className="row">
          {products.length === 0 ? (
            <p>No hay productos cargados todavía.</p>
          ) : (
            products.map(({ id, name, brand, category, subcategory, image, color }) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4" key={id}>
                <ProductCard
                  name={name}
                  brand={brand}
                  category={category}
                  subcategory={subcategory}
                  image={image}
                  color={color}
                />
              </div>
            ))
          )}
        </div>

        {showModal && (
          <AddProductModal
            onClose={() => setShowModal(false)}
            onAdd={handleAdd}
          />
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from('makeup')
    .select('*');

  if (error) {
    console.error(error);
    return { props: { products: [] } };
  }

  return {
    props: { products: data || [] },
  };
}
