import { useEffect, useRef, useState } from "react";
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
  const messagesEndRef = useRef(null);

useEffect(() => {
  const q = query(collection(db, "messages"), orderBy("timestamp"));
  let previousLength = 0;

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastMsg = msgs[msgs.length - 1];
    const isMine =
      lastMsg?.name?.toLowerCase() === user.name.toLowerCase() &&
      lastMsg?.table === user.table;

    if (previousLength && msgs.length > previousLength && !isMine) {
      const audio = new Audio("/notify.mp3");
      audio.play();
    }

    previousLength = msgs.length;
    setMessages(msgs);
  });

  return () => unsubscribe();
}, [user]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-center">
          💬 ChatBar - Mesa {user.table}
        </h1>
        <button
          onClick={onLogout}
          className="text-sm text-blue-400 hover:underline"
        >
          Trocar usuário
        </button>
      </div>

      <div className="bg-white text-black rounded-lg shadow p-4 max-h-[60vh] overflow-y-auto space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhuma mensagem ainda.</p>
        ) : (
          messages.map((msg) => {
            const isMine =
              msg.name.toLowerCase() === user.name.toLowerCase() &&
              msg.table === user.table;
            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                {!isMine && (
                  <div className="w-8 h-8 bg-gray-400 text-white text-xs flex items-center justify-center rounded-full">
                    {msg.table}
                  </div>
                )}
                <div
                  className={`relative p-3 rounded-xl max-w-[70%] text-base leading-snug ${
                    isMine
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  {!isMine && (
                    <div className="text-xs font-semibold mb-1">
                      {msg.name} (Mesa {msg.table})
                    </div>
                  )}
                  <div>{msg.text}</div>

                  {/* Cauda do balão */}
                  <div
                    className={`absolute bottom-0 ${
                      isMine
                        ? "right-0 translate-x-full border-t-[8px] border-t-transparent border-l-[8px] border-l-blue-600 border-b-[8px] border-b-transparent"
                        : "left-0 -translate-x-full border-t-[8px] border-t-transparent border-r-[8px] border-r-gray-200 border-b-[8px] border-b-transparent"
                    }`}
                  ></div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
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
