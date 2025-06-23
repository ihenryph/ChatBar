// src/components/Entry.jsx
import { useState } from "react";

export default function Entry({ onEnter }) {
  const [name, setName] = useState("");
  const [table, setTable] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !table) return;
    onEnter({ name, table });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🍻 Bem-vindo ao ChatBar</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Seu nome"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número da mesa"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
        >
          Entrar no Chat
        </button>
      </form>
    </div>
  );
}
