import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AddProductModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [color, setColor] = useState('');
  const [colors, setColors] = useState([]);

  // NUEVO: estado tags y tagInput
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [existingTags, setExistingTags] = useState([]);

  const subcategoryOptions = {
    Face: ['Base', 'Corrector', 'Rubor', 'Highlight', 'Spray'],
    Eyes: ['Sombra', 'Paleta', 'Delineador', 'Rimmel', 'Pigmento'],
    Lips: ['Labial', 'Gloss', 'Tint', 'Liner'],
  };

  useEffect(() => {
    const fetchColors = async () => {
      const { data, error } = await supabase
        .from('makeup')
        .select('color')
        .not('color', 'is', null);

      if (!error && data) {
        const uniqueColors = [...new Set(data.map((item) => item.color))];
        setColors(uniqueColors);
      }
    };

    // NUEVO: fetch tags únicos desde Supabase (suponiendo columna 'tags' jsonb o text[])
    const fetchTags = async () => {
      const { data, error } = await supabase
        .from('makeup')
        .select('tags')
        .not('tags', 'is', null);

      if (!error && data) {
        // aplanar arrays y sacar únicos
        const allTags = data.flatMap(item => item.tags || []);
        const uniqueTags = [...new Set(allTags)];
        setExistingTags(uniqueTags);
      }
    };

    fetchColors();
    fetchTags();
  }, []);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, brand, category, subcategory, color, tags });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">

          <div className="modal-header position-relative">
            <h5 className="modal-title">Agregar Producto</h5>
            <button
              type="button"
              className="close-modal-btn"
              onClick={onClose}
              aria-label="Cerrar"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Marca"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />

              <select
                className="form-control mb-2"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory('');
                }}
                required
              >
                <option value="">Selecciona categoría</option>
                <option value="Face">Face</option>
                <option value="Eyes">Eyes</option>
                <option value="Lips">Lips</option>
              </select>

              {category && (
                <select
                  className="form-control mb-2"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  required
                >
                  <option value="">Selecciona subcategoría</option>
                  {subcategoryOptions[category].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {/* Color input dinámico */}
              <input
                list="color-options"
                className="form-control mb-2"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <datalist id="color-options">
                {colors.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>

              {/* NUEVO: Tags input */}
              <div className="mb-2">
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

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-looktracker">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
