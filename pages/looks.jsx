import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import AddLookModal from '../components/AddLookModal';

export default function Looks() {
  const [looks, setLooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLooks();
  }, []);

  const fetchLooks = async () => {
    const { data, error } = await supabase
      .from('looks')
      .select('*')
      .order('date', { ascending: false });

    if (!error) setLooks(data);
    else console.error('Error al cargar looks:', error);
  };

  const handleAddLook = async (newLook) => {
    const { error } = await supabase.from('looks').insert([newLook]);

    if (!error) {
      setShowModal(false);
      fetchLooks();
    } else {
      console.error('Error al agregar look:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Mis Looks</h2>
        <div className="d-flex justify-content-center mb-4">
          <button className="btn btn-looktracker" onClick={() => setShowModal(true)}>
            Agregar Look
          </button>
        </div>

        {looks.length === 0 ? (
          <p className="text-center">Todavía no registraste ningún look.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {looks.map((look) => (
              <div className="col" key={look.id}>
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{look.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{look.date}</h6>

                    {look.tags?.length > 0 && (
                      <div className="mb-2">
                        {look.tags.map((tag) => (
                          <span key={tag} className="badge bg-warning text-dark me-1">{tag}</span>
                        ))}
                      </div>
                    )}

                    {look.makeup_items?.length > 0 && (
                      <>
                        <p className="fw-bold mb-1 mt-2">Makeup:</p>
                        <ul className="mb-2">
                          {look.makeup_items.map((item, idx) => (
                            <li key={idx}>{item.name} ({item.category}/{item.subcategory})</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {look.perfumes?.length > 0 && (
                      <>
                        <p className="fw-bold mb-1 mt-2">Perfumes:</p>
                        <ul className="mb-0">
                          {look.perfumes.map((p, idx) => (
                            <li key={idx}>{p.name} - {p.brand}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <AddLookModal
            onClose={() => setShowModal(false)}
            onAdd={handleAddLook}
          />
        )}
      </div>
    </>
  );
}
