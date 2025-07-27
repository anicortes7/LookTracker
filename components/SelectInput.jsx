import Select from 'react-select';

const chipColors = [
  '#EDAFB8', '#F7E1D7', '#CFE1CB', '#9DC296', '#324E2C',
  '#EFBFA9', '#F7D7D7', '#C1737F', '#E38C64',
];

const darkenHex = (hex, percent = 20) => {
  const num = parseInt(hex.replace('#', ''), 16);
  let r = (num >> 16) - percent;
  let g = ((num >> 8) & 0x00FF) - percent;
  let b = (num & 0x0000FF) - percent;
  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);
  return `rgb(${r},${g},${b})`;
};

export default function SelectInput({
  label,
  options,
  value,
  onChange,
  required = false,
  isMulti = false,
  className = '',
}) {
  const customStyles = {
    multiValue: (base, { index }) => ({
      ...base,
      backgroundColor: chipColors[index % chipColors.length],
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'black',
      fontWeight: '500',
    }),
    multiValueRemove: (base, { index }) => {
      const chipColor = chipColors[index % chipColors.length];
      return {
        ...base,
        color: 'black',
        ':hover': {
          backgroundColor: darkenHex(chipColor, 30),
          color: 'white',
        },
      };
    },
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#EDAFB8'   // color seleccionado
        : state.isFocused
        ? '#F7D7D7'   // hover
        : 'white',
      color: 'black',
      cursor: 'pointer',
      outline: 'none',  // QUITA el foco azul nativo
      boxShadow: 'none',
      userSelect: 'none', // evita flash raro al click
      transition: 'background-color 0.2s ease',
    }),
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#9DC296' : base.borderColor,
      boxShadow: state.isFocused ? '0 0 0 1px #9DC296' : base.boxShadow, // borde verde
      outline: 'none',
      '&:hover': {
        borderColor: '#9DC296',
      },
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  const getValue = () => {
    if (isMulti) {
      if (!Array.isArray(value)) return [];
      return options.filter((opt) => value.includes(opt.value));
    } else {
      return options.find((opt) => opt.value === value) || null;
    }
  };

  const handleChange = (selected) => {
    if (isMulti) {
      onChange(selected ? selected.map((s) => s.value) : []);
    } else {
      onChange(selected ? selected.value : '');
    }
  };

  return (
    <div className={className}>
      <label className="form-label">{label}</label>
      <Select
        options={options}
        value={getValue()}
        onChange={handleChange}
        isMulti={isMulti}
        styles={customStyles}
        placeholder={`Selecciona ${label.toLowerCase()}`}
        required={required}
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
        menuPosition="fixed"
      />
    </div>
  );
}
