import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AddLookModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
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
    if (!error) setPerfumeOptions(data);
  };

  const fetchMakeup = async () => {
    const { data, error } = await supabase.from('makeup').select('id, name, category, subcategory');
    if (!error) setMakeupOptions(data);
  };

  const fetchTags = async () => {
    const { data, error } = await supabase.from('looks').select('tags');
    if (!error) {
      const all = data.flatMap(item => item.tags || []);
      setExistingTags([...new Set(all)]);
    }
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const look = {
      name,
      date,
      tags,
      perfumes: selectedPerfumes,
      makeup_items: selectedMakeup,
    };

    onAdd(look);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
                className="form-control mb-2"
                placeholder="Nombre del look"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="date"
                className="form-control mb-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              {/* Perfumes */}
              <label className="form-label fw-bold">Perfumes</label>
              <select
                multiple
                className="form-select mb-3"
                value={selectedPerfumes.map(p => p.id)}
                onChange={(e) => {
                  const selected = [...e.target.selectedOptions].map((opt) => {
                    const found = perfumeOptions.find((p) => p.id === parseInt(opt.value));
                    return found || null;
                  }).filter(Boolean);
                  setSelectedPerfumes(selected);
                }}
              >
                {perfumeOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {p.brand}
                  </option>
                ))}
              </select>

              {/* Makeup */}
              <label className="form-label fw-bold">Makeup</label>
              <select
                multiple
                className="form-select mb-3"
                value={selectedMakeup.map(m => m.id)}
                onChange={(e) => {
                  const selected = [...e.target.selectedOptions].map((opt) => {
                    const found = makeupOptions.find((m) => m.id === parseInt(opt.value));
                    return found || null;
                  }).filter(Boolean);
                  setSelectedMakeup(selected);
                }}
              >
                {makeupOptions.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.category}/{m.subcategory})
                  </option>
                ))}
              </select>

              {/* Tags */}
              <label className="form-label">Tags</label>
              <div className="d-flex mb-2">
                <input
                  type="text"
                  className="form-control me-2"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  list="tags-suggestions"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={addTag}>+</button>
                <datalist id="tags-suggestions">
                  {existingTags.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
              </div>

              <div className="d-flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t} className="badge bg-warning text-dark">{t}</span>
                ))}
              </div>
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
