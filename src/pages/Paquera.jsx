//NOVO PROJETO SEM CHAT

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function Paquera({ user }) {
  const [usuarios, setUsuarios] = useState([]);
  const [curtidasFeitas, setCurtidasFeitas] = useState([]);
  const [curtidasRecebidas, setCurtidasRecebidas] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Buscar perfis (exceto o próprio)
    async function fetchUsuarios() {
      const q = query(collection(db, "usuarios"));
      const snapshot = await getDocs(q);
      const outros = snapshot.docs
        .map((doc) => doc.data())
        .filter((u) => u.name !== user.name);
      setUsuarios(outros);
    }

    // Observar curtidas feitas por mim
    const unsubFeitas = onSnapshot(
      query(collection(db, "curtidas"), where("de", "==", user.name)),
      (snapshot) => {
        const feitas = snapshot.docs.map((doc) => doc.data().para);
        setCurtidasFeitas(feitas);
      }
    );

    // Observar curtidas que recebi
    const unsubRecebidas = onSnapshot(
      query(collection(db, "curtidas"), where("para", "==", user.name)),
      (snapshot) => {
        const recebidas = snapshot.docs.map((doc) => doc.data().de);
        setCurtidasRecebidas(recebidas);
      }
    );

    fetchUsuarios();

    return () => {
      unsubFeitas();
      unsubRecebidas();
    };
  }, [user.name]);

  // Match = pessoa que você curtiu e que também te curtiu
  useEffect(() => {
    const m = curtidasFeitas.filter((pessoa) =>
      curtidasRecebidas.includes(pessoa)
    );
    setMatches(m);
  }, [curtidasFeitas, curtidasRecebidas]);

  const handleCurtir = async (alvo) => {
    if (curtidasFeitas.includes(alvo)) return;

    await addDoc(collection(db, "curtidas"), {
      de: user.name,
      para: alvo,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-4 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold text-center">💘 Modo Paquera</h2>
      <p className="text-center text-gray-300">
        Curta perfis anonimamente e descubra se deu match!
      </p>

      {/* Matchs */}
      {matches.length > 0 && (
        <div className="bg-green-700 p-4 rounded text-center">
          <h3 className="text-xl font-bold mb-2">🔥 Deu Match!</h3>
          {matches.map((nome, idx) => (
            <p key={idx}>💑 Você combinou com {nome}!</p>
          ))}
        </div>
      )}

      {/* Lista de usuários */}
      <div className="space-y-3">
        {usuarios.length === 0 ? (
          <p className="text-gray-400 text-center">
            Nenhum outro usuário logado.
          </p>
        ) : (
          usuarios.map((u, idx) => (
            <div
              key={idx}
              className="p-3 rounded bg-gray-700 border border-gray-600 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">
                  {u.name} - Mesa {u.table}
                </div>
                <div className="text-sm text-gray-300">
                  {u.status || "Status não informado"}
                </div>
              </div>
              <button
                onClick={() => handleCurtir(u.name)}
                disabled={curtidasFeitas.includes(u.name)}
                className={`px-4 py-1 rounded ${
                  curtidasFeitas.includes(u.name)
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                {curtidasFeitas.includes(u.name) ? "Curtido" : "Curtir"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

