import { useState } from 'react';

export default function AddPerfumeModal({ onClose, onAdd, existingNotes = [], existingAccords = [], existingTags = [] }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [isDecant, setIsDecant] = useState(false);

  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  const [mainAccords, setMainAccords] = useState([]);
  const [accordInput, setAccordInput] = useState('');

  // Nuevo para tags
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

  // Nueva función para tags
  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      name,
      brand,
      type,
      size,
      notes,
      ["main accords"]: mainAccords,
      tags,
      is_decant: isDecant,
    });
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Agregar Perfume</h5>
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
                className="form-control mb-2"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Selecciona tipo</option>
                {perfumeTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Tamaño (ej. 50ml)"
                value={size}
                onChange={(e) => setSize(e.target.value)}
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

              {/* Main Accords */}
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

              {/* Tags (nuevo) */}
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

              {/* Decant */}
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="decantCheck"
                  checked={isDecant}
                  onChange={(e) => setIsDecant(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="decantCheck">
                  Decant
                </label>
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
