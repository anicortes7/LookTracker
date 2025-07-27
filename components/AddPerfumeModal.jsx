import { useState } from 'react';
import TagListInput from './TagListInput';
import SelectInput from './SelectInput';
import TagInput from './TagInput';
import styles from '../styles/FormInputs.module.css';

export default function AddPerfumeModal({ onClose, onAdd, existingNotes = [], existingAccords = [], existingTags = [] }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [isDecant, setIsDecant] = useState(false);

  const [notes, setNotes] = useState([]);
  const [mainAccords, setMainAccords] = useState([]);
  const [tags, setTags] = useState([]);

  const perfumeTypes = [
    { label: 'Parfum', value: 'parfum' },
    { label: 'Extrait de Parfum', value: 'extrait' },
    { label: 'Eau de Parfum (EDP)', value: 'edp' },
    { label: 'Eau de Toilette (EDT)', value: 'edt' },
    { label: 'Eau de Cologne (EDC)', value: 'edc' },
    { label: 'Body Mist', value: 'body mist' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      name,
      brand,
      type,
      size,
      notes,
      main_accords: mainAccords,
      tags,
      is_decant: isDecant,
    });
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
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
                className={`form-control mb-2 ${styles.inputGreen}`}
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                className={`form-control mb-2 ${styles.inputGreen}`}
                placeholder="Marca"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />

              <SelectInput
                label="Tipo"
                options={perfumeTypes}
                value={type}
                onChange={setType}
                required
              />

              <input
                type="text"
                className={`form-control mt-2 ${styles.inputGreen}`}
                placeholder="Tamaño (ej. 50ml)"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />

              <TagListInput
                label="Notas"
                tags={notes}
                setTags={setNotes}
                existingOptions={existingNotes}
              />

              <TagListInput
                label="Main Accords"
                tags={mainAccords}
                setTags={setMainAccords}
                existingOptions={existingAccords}
              />

              <TagInput
                tags={tags}
                setTags={setTags}
                existingTags={existingTags}
              />
            </div>
            <div className="modal-footer d-flex align-items-center justify-content-between">
              <label htmlFor="decantCheck" className="checkbox-label mt-3">
                <input
                  type="checkbox"
                  id="decantCheck"
                  checked={isDecant}
                  onChange={(e) => setIsDecant(e.target.checked)}
                />
                Decant
              </label>

              <div>
                <button type="button" className="btn btn-secondary mr-3" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-looktracker">
                  Agregar
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
