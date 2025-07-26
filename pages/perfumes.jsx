import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/PerfumeCard'; 
import AddPerfumeModal from '../components/AddPerfumeModal'; 
import { supabase } from '../lib/supabaseClient';

export default function Perfumes({ perfumes }) {
  const [showModal, setShowModal] = useState(false);

  const handleAdd = async (newPerfume) => {
    console.log('Insertando perfume:', newPerfume); // 👈 Log del objeto antes del insert

    const { data, error } = await supabase
      .from('perfumes')
      .insert([newPerfume]);

    if (error) {
      console.error('Error al agregar perfume:', error);
    } else {
      console.log('Perfume agregado:', data);
    }

    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="title-looktracker mb-0">Perfume Collection</h1>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Agregar perfume
          </button>
        </div>

        <div className="row">
          {perfumes.length === 0 ? (
            <p>No hay perfumes cargados todavía.</p>
          ) : (
            perfumes.map(({ id, name, brand, type, size, notes, main_accords }) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4" key={id}>
                <ProductCard
                  name={name}
                  brand={brand}
                  category={type}
                  subcategory={size}
                  notes={notes}
                  mainAccords={main_accords}
                />
              </div>
            ))
          )}
        </div>

        {showModal && (
          <AddPerfumeModal
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
    .from('perfumes')
    .select('*');

  if (error) {
    console.error(error);
    return { props: { perfumes: [] } };
  }

  return {
    props: { perfumes: data || [] },
  };
}
