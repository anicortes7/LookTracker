import { useState } from 'react';

export default function AddWishlistModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [itemType, setItemType] = useState('');

  // Makeup fields
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  // Perfume fields
  const [type, setType] = useState('');
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const [mainAccords, setMainAccords] = useState([]);
  const [accordInput, setAccordInput] = useState('');

  // Shared
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const addNote = () => {
    const trimmed = noteInput.trim();
    if (trimmed && !notes.includes(trimmed)) setNotes([...notes, trimmed]);
    setNoteInput('');
  };

  const addAccord = () => {
    const trimmed = accordInput.trim();
    if (trimmed && !mainAccords.includes(trimmed)) setMainAccords([...mainAccords, trimmed]);
    setAccordInput('');
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) setTags([...tags, trimmed]);
    setTagInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name,
      brand,
      item_type: itemType,
      tags,
    };

    if (itemType === 'makeup') {
      newItem.category = category;
      newItem.subcategory = subcategory;
    } else if (itemType === 'perfume') {
      newItem.type = type;
      newItem.notes = notes;
      newItem.main_accords = mainAccords;
    }

    onAdd(newItem);
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
                <option value="makeup">Maquillaje</option>
              </select>

              {itemType === 'makeup' && (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Categoría"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Subcategoría"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  />
                </>
              )}

              {itemType === 'perfume' && (
                <>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Tipo de perfume (EDP, EDT...)"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />

                  {/* Notes */}
                  <div className="mb-2">
                    <label className="form-label">Notas</label>
                    <div className="d-flex mb-2">
                      <input
                        type="text"
                        className="form-control me-2"
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addNote();
                          }
                        }}
                      />
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={addNote}>+</button>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {notes.map((n) => (
                        <span key={n} className="badge bg-secondary">{n}</span>
                      ))}
                    </div>
                  </div>

                  {/* Main Accords */}
                  <div className="mb-2">
                    <label className="form-label">Main Accords</label>
                    <div className="d-flex mb-2">
                      <input
                        type="text"
                        className="form-control me-2"
                        value={accordInput}
                        onChange={(e) => setAccordInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addAccord();
                          }
                        }}
                      />
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={addAccord}>+</button>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {mainAccords.map((a) => (
                        <span key={a} className="badge bg-info">{a}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Tags */}
              <div className="mb-2">
                <label className="form-label">Tags</label>
                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={addTag}>+</button>
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
