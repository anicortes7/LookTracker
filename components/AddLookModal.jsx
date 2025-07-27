import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import SelectInput from './SelectInput';  // Cambio aquí
import TagInput from './TagInput';
import styles from '../styles/FormInputs.module.css';

export default function AddLookModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState([]);
  const [existingTags, setExistingTags] = useState([]);

  const [perfumeOptions, setPerfumeOptions] = useState([]);
  const [selectedPerfumes, setSelectedPerfumes] = useState([]);

  const [makeupOptions, setMakeupOptions] = useState([]);
  const [selectedMakeup, setSelectedMakeup] = useState([]);

  useEffect(() => {
    fetchPerfumes();
    fetchMakeup();
    fetchTags();
  }, []);

  const fetchPerfumes = async () => {
    const { data, error } = await supabase.from('perfumes').select('id, name, brand');
    if (!error) {
      const formatted = data.map((p) => ({ value: p.id, label: `${p.name} - ${p.brand}` }));
      setPerfumeOptions(formatted);
    }
  };

  const fetchMakeup = async () => {
    const { data, error } = await supabase.from('makeup').select('id, name, category, subcategory');
    if (!error) {
      const formatted = data.map((m) => ({
        value: m.id,
        label: `${m.name} (${m.category}/${m.subcategory})`,
      }));
      setMakeupOptions(formatted);
    }
  };

  const fetchTags = async () => {
    const { data, error } = await supabase.from('looks').select('tags');
    if (!error) {
      const all = data.flatMap((item) => item.tags || []);
      setExistingTags([...new Set(all)]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const look = {
      name,
      date,
      tags,
      perfumes: selectedPerfumes.map((p) => ({ id: p.value, name: p.label })),
      makeup_items: selectedMakeup.map((m) => ({ id: m.value, name: m.label })),
    };

    onAdd(look);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header position-relative">
            <h5 className="modal-title">Agregar Look</h5>
            <button type="button" className="close-modal-btn" onClick={onClose} aria-label="Cerrar">
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                type="text"
                className={`form-control mb-2 ${styles.inputGreen}`}
                placeholder="Nombre del look"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="date"
                className={`form-control mb-2 ${styles.inputGreen}`}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <SelectInput
                label="Perfumes"
                options={perfumeOptions}
                value={selectedPerfumes}
                onChange={setSelectedPerfumes}
                className="mb-3"
                isMulti
              />

              <SelectInput
                label="Makeup"
                options={makeupOptions}
                value={selectedMakeup}
                onChange={setSelectedMakeup}
                className="mb-3"
                isMulti
              />

              <TagInput tags={tags} setTags={setTags} existingTags={existingTags} />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-looktracker">
                Guardar Look
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
