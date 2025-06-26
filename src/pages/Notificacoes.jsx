import { useEffect, useState, useRef } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs
} from "firebase/firestore";
import confetti from "canvas-confetti";

export default function Notificacoes({ user }) {
  const [match, setMatch] = useState(null);
  const [curtida, setCurtida] = useState(false);
  const curtidasRecebidasRef = useRef(new Set());

  useEffect(() => {
    if (!user?.name) return;

    const q = query(collection(db, "curtidas"), where("para", "==", user.name));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const { de } = change.doc.data();
          if (!curtidasRecebidasRef.current.has(de)) {
            curtidasRecebidasRef.current.add(de);
            tocarSom();
            dispararConfete();
            setCurtida(true);
            setTimeout(() => setCurtida(false), 5000); // some após 5s

            // Verifica match
            const q2 = query(
              collection(db, "curtidas"),
              where("de", "==", user.name),
              where("para", "==", de)
            );
            const resultado = await getDocs(q2);
            if (!resultado.empty) {
              setMatch(de);
            }
          }
        }
      });
    });

    return () => unsubscribe();
  }, [user]);

  const tocarSom = () => {
    const audio = new Audio("/sounds/curtida.mp3");
    audio.play().catch(() => {});
  };

  const dispararConfete = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <>
      {curtida && (
        <div className="fixed bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
          💖 Você recebeu uma curtida!
        </div>
      )}
      {match && (
        <div className="fixed bottom-4 right-4 bg-pink-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
          💘 Deu Match com {match}!
        </div>
      )}
    </>
  );
}
