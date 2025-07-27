import { useState } from 'react';
import styles from './TagListInput.module.css';

const palette = [
  '#EDAFB8', '#F7E1D7', '#CFE1CB', '#9DC296', '#324E2C',
  '#EFBFA9', '#F7D7D7', '#C1737F', '#E38C64'
];

function darken(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return `rgb(${Math.max(R, 0)}, ${Math.max(G, 0)}, ${Math.max(B, 0)})`;
}

export default function TagInput({
  label = 'Tags',
  tags,
  setTags,
  existingTags = [],
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

  const datalistId = `${label.toLowerCase().replace(/\s/g, '-')}-suggestions`;

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="d-flex mb-2">
        <input
          type="text"
          className={`form-control me-2 ${styles['tag-input']}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          list={datalistId}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={addTag}
        >
          +
        </button>
        <datalist id={datalistId}>
          {existingTags.map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
      </div>

      <div className="d-flex flex-wrap gap-2">
        {tags.map((tag, index) => {
          const color = palette[index % palette.length];
          const hoverColor = darken(color, 20);

          return (
            <span
              key={tag}
              className={styles['tag-chip']}
              style={{ backgroundColor: color }}
            >
              {tag}
              <button
                type="button"
                className={styles['tag-remove']}
                onClick={() => removeTag(tag)}
                onMouseEnter={(e) => {
                  e.target.style.color = hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '';
                }}
              >
                &times;
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
