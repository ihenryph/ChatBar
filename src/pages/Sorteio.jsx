//NOVO PROEJETO SEM CHAT

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Sorteio({ user }) {
  const [participantes, setParticipantes] = useState([]);
  const [ganhador, setGanhador] = useState(null);

  useEffect(() => {
    const unsub1 = onSnapshot(doc(db, "sorteio", "dados"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setParticipantes(data.participantes || []);
        setGanhador(data.ganhador || null);
      }
    });

    return () => unsub1();
  }, []);

  const handleParticipar = async () => {
    const ref = doc(db, "sorteio", "dados");
    await updateDoc(ref, {
      participantes: arrayUnion({ name: user.name, table: user.table }),
    });
  };

  const handleSortear = async () => {
    if (participantes.length === 0) return;
    const escolhido =
      participantes[Math.floor(Math.random() * participantes.length)];
    await updateDoc(doc(db, "sorteio", "dados"), {
      ganhador: escolhido,
    });
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center">🎁 Sorteio de Bebidas</h2>

      <div className="text-center">
        <button
          onClick={handleParticipar}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
        >
          Participar
        </button>
        <button
          onClick={handleSortear}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sortear
        </button>
      </div>

      <div className="text-center mt-6">
        <h3 className="text-lg font-semibold mb-2">Participantes:</h3>
        {participantes.length === 0 ? (
          <p className="text-gray-400">Nenhum participante ainda.</p>
        ) : (
          <ul className="space-y-1">
            {participantes.map((p, i) => (
              <li key={i}>
                🧑 {p.name} (Mesa {p.table})
              </li>
            ))}
          </ul>
        )}
      </div>

      {ganhador && (
        <div className="mt-6 p-4 bg-yellow-200 text-black rounded text-center">
          🥳 Parabéns {ganhador.name} (Mesa {ganhador.table})! Você ganhou o sorteio!
        </div>
      )}
    </div>
  );
}


