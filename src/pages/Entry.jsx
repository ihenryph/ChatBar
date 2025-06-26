// src/components/Entry.jsx
import { useState } from "react";
import { db } from "../lib/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";


export default function Entry({ onEnter }) {
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [status, setStatus] = useState("");
  const [adminCode, setAdminCode] = useState("");

const handleAdminLogin = () => {
  if (adminCode === "admin123") {
    onEnter({ name: "Administrador", table: "admin", isAdmin: true });
  } else {
    alert("Código incorreto");
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !table || !status) return;

  // Salvar no Firestore
  await setDoc(doc(db, "usuarios", name), {
    name,
    table,
    status,
    timestamp: serverTimestamp(),
  });

  onEnter({ name, table, status });
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
        <select
  className="w-full p-3 rounded bg-gray-800 border border-gray-700"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="">Seu status</option>
  <option value="Solteiro">Solteiro</option>
  <option value="Comprometido">Comprometido</option>
  <option value="Casado">Casado</option>
</select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
        >
          Entrar no Chat
        </button>
        <div className="pt-4 border-t border-gray-700">
  <input
    type="password"
    placeholder="Código do administrador"
    className="w-full p-2 mt-2 rounded bg-gray-800 border border-gray-600"
    value={adminCode}
    onChange={(e) => setAdminCode(e.target.value)}
  />
  <button
    type="button"
    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 mt-2 rounded"
    onClick={handleAdminLogin}
  >
    Acessar Painel Admin
  </button>
</div>

      </form>
    </div>
  );
}
