import { useState } from 'react';
import styles from './TagListInput.module.css';

const colorPalette = [
  '#EDAFB8', '#F7E1D7', '#CFE1CB', '#9DC296', '#324E2C',
  '#EFBFA9', '#F7D7D7', '#C1737F', '#E38C64'
];

function darkenHex(hex, percent = 15) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;

  return `rgb(${Math.max(R, 0)}, ${Math.max(G, 0)}, ${Math.max(B, 0)})`;
}

export default function TagListInput({
  label,
  tags,
  setTags,
  existingOptions = [],
}) {
  const [input, setInput] = useState('');

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInput('');
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const inputId = label ? `${label.toLowerCase().replace(/\s/g, '-')}-suggestions` : undefined;

  return (
    <div className="">
      {label && <label className="form-label">{label}</label>}
      <div className="d-flex">
        <input
          type="text"
          className={`form-control  ${styles['tag-input']}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          list={inputId}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <button type="button" className="btn btn-sm btn-outline-primary" onClick={addTag}>
          +
        </button>
        {inputId && (
          <datalist id={inputId}>
            {existingOptions.map((opt) => (
              <option key={opt} value={opt} />
            ))}
          </datalist>
        )}
      </div>

      <div className="d-flex flex-wrap gap-2">
        {tags.map((t, idx) => {
          const chipColor = colorPalette[idx % colorPalette.length];
          const hoverColor = darkenHex(chipColor, 20);

          return (
            <span
              key={t}
              className={styles['tag-chip']}
              style={{ backgroundColor: chipColor }}
            >
              {t}
              <button
                className={styles['tag-remove']}
                onClick={() => removeTag(t)}
                onMouseEnter={(e) => {
                  e.target.style.color = hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '';
                }}
              >
                ×
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
