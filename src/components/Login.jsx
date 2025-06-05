import { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [table, setTable] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && table.trim()) {
      onLogin({ name, table });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Bem-vindo ao ChatBar</h2>

        <input
          type="text"
          placeholder="Seu nome"
          className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Número da mesa"
          className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Entrar no Chat
        </button>
      </form>
    </div>
  );
}
