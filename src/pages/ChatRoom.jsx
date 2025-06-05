// src/components/ChatRoom.jsx

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatRoom({ user, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      name: user.name,
      table: user.table,
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">💬 ChatBar - Mesa {user.table}</h1>
        <button
          onClick={onLogout}
          className="text-sm text-red-400 hover:underline"
        >
          Trocar usuário
        </button>
      </div>

      <div className="bg-white text-black rounded-lg shadow p-4 space-y-2 max-h-[60vh] overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhuma mensagem ainda.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-gray-100 rounded p-2">
              <strong>{msg.name} (Mesa {msg.table}):</strong> {msg.text}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 px-4 py-2 rounded border border-gray-300 text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

