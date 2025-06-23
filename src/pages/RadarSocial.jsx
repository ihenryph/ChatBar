//NOVO PROJETO SEM CHAT

// src/pages/RadarSocial.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function RadarSocial({ user }) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const lista = querySnapshot.docs.map(doc => doc.data());
      setUsuarios(lista);
    }

    fetchUsuarios();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-4 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">📡 Radar Social</h2>

      {usuarios.length === 0 ? (
        <p className="text-center text-gray-400">Nenhum usuário logado no momento.</p>
      ) : (
        <ul className="space-y-3">
          {usuarios.map((u, idx) => (
            <li
              key={idx}
              className={`p-3 rounded border ${
                u.status === "Solteiro(a)"
                  ? "border-green-500"
                  : u.status === "Casado(a)"
                  ? "border-red-500"
                  : "border-gray-500"
              }`}
            >
              <div className="font-semibold text-lg">
                {u.name} - Mesa {u.table}
              </div>
              <div>Status: {u.status || "Não informado"}</div>
              {u.interesses && <div>🎯 Interesses: {u.interesses}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

