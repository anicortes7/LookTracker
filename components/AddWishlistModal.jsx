import { useState, useEffect } from 'react';

export default function AddWishlistModal({ onClose, onAdd, existingNotes = [], existingAccords = [], existingTags = [] }) {
  const [itemType, setItemType] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');

  // Campos perfumes
  const [type, setType] = useState('');
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const [mainAccords, setMainAccords] = useState([]);
  const [accordInput, setAccordInput] = useState('');

  // Campos makeup
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  // Campos comunes
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const perfumeTypes = [
    { label: 'Parfum', value: 'parfum' },
    { label: 'Extrait de Parfum', value: 'extrait' },
    { label: 'Eau de Parfum (EDP)', value: 'edp' },
    { label: 'Eau de Toilette (EDT)', value: 'edt' },
    { label: 'Eau de Cologne (EDC)', value: 'edc' },
    { label: 'Body Mist', value: 'body mist' },
  ];

  const addNote = () => {
    const trimmed = noteInput.trim();
    if (trimmed && !notes.includes(trimmed)) {
      setNotes([...notes, trimmed]);
    }
    setNoteInput('');
  };

  const addAccord = () => {
    const trimmed = accordInput.trim();
    if (trimmed && !mainAccords.includes(trimmed)) {
      setMainAccords([...mainAccords, trimmed]);
    }
    setAccordInput('');
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
  };

  useEffect(() => {
    setType('');
    setNotes([]);
    setNoteInput('');
    setMainAccords([]);
    setAccordInput('');

    setCategory('');
    setSubcategory('');
  }, [itemType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemType) {
      alert('Por favor selecciona un tipo de producto.');
      return;
    }

    const baseData = {
      item_type: itemType,
      name,
      brand,
      tags,
    };

    let finalData = {};

    if (itemType === 'perfume') {
      if (!type) {
        alert('Por favor selecciona un tipo de perfume.');
        return;
      }
      finalData = {
        ...baseData,
        type,
        notes,
        main_accords: mainAccords,
      };
    } else if (itemType === 'makeup') {
      if (!category || !subcategory) {
        alert('Por favor completa categoría y subcategoría para makeup.');
        return;
      }
      finalData = {
        ...baseData,
        category,
        subcategory,
      };
    }

    onAdd(finalData);
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Agregar a Wishlist</h5>
            <button type="button" className="close-modal-btn" onClick={onClose}>
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
                className="form-control mb-3"
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                required
              >
                <option value="">Selecciona tipo de producto</option>
                <option value="perfume">Perfume</option>
                <option value="makeup">Makeup</option>
              </select>

              {itemType === 'perfume' && (
                <>
                  <select
                    className="form-control mb-2"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Selecciona tipo de perfume</option>
                    {perfumeTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>

                  <div className="mb-2">
                    <label className="form-label">Notas</label>
                    <div className="d-flex mb-2">
                      <input
                        type="text"
                        className="form-control me-2"
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        list="notes-suggestions"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addNote();
                          }
                        }}
                      />
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={addNote}>+</button>
                      <datalist id="notes-suggestions">
                        {existingNotes.map((n) => <option key={n} value={n} />)}
                      </datalist>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {notes.map((n) => (
                        <span key={n} className="badge bg-secondary">{n}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Main Accords</label>
                    <div className="d-flex mb-2">
                      <input
                        type="text"
                        className="form-control me-2"
                        value={accordInput}
                        onChange={(e) => setAccordInput(e.target.value)}
                        list="accords-suggestions"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addAccord();
                          }
                        }}
                      />
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={addAccord}>+</button>
                      <datalist id="accords-suggestions">
                        {existingAccords.map((a) => <option key={a} value={a} />)}
                      </datalist>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {mainAccords.map((a) => (
                        <span key={a} className="badge bg-info">{a}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {itemType === 'makeup' && (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Categoría"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Subcategoría"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    required
                  />
                </>
              )}

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
                    {existingTags.map((t) => <option key={t} value={t} />)}
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
