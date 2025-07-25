import React, { useState } from 'react';

export default function AddProductModal({ onAdd }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👇 Llama a la función para guardar en Supabase
    onAdd({
      name,
      brand,
      category,
      subcategory,
      color,
    });
    // Limpia formulario
    setName('');
    setBrand('');
    setCategory('');
    setSubcategory('');
    setColor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Marca"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Selecciona categoría</option>
        <option value="Face">Face</option>
        <option value="Eyes">Eyes</option>
        <option value="Lips">Lips</option>
      </select>

      {/* Subcategoría podría depender de categoría con un filtro dinámico */}

      <select
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
      >
        <option value="">Selecciona subcategoría</option>
        <option value="Base">Base</option>
        <option value="Rubor">Rubor</option>
        <option value="Lipstick">Lipstick</option>
        {/* Y así... */}
      </select>

      {/* 🔥 Dropdown de color */}
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="">Selecciona color</option>
        <option value="Rojo">Rojo</option>
        <option value="Nude">Nude</option>
        <option value="Rosa">Rosa</option>
        <option value="Coral">Coral</option>
        {/* Los que tengas */}
      </select>

      <button type="submit">Agregar producto</button>
    </form>
  );
}
