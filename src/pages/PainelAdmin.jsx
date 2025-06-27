//NOVO PROJETO SEM CHAT

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
//import { collection, onSnapshot } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";



export default function PainelAdmin() {
    const [usuarios, setUsuarios] = useState([]);
  const [tela, setTela] = useState("home");
//   const [tela, setTela] = useState("home");
//     const [usuarios, setUsuarios] = useState([]);

useEffect(() => {
  const fetchUsuarios = async () => {
    
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const lista = querySnapshot.docs.map(doc => doc.data());
    setUsuarios(lista);
  };

  fetchUsuarios();
}, []);
   
    return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Painel do Administrador</h1>
        <button
          className="bg-red-600 px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Sair
        </button>
      </header>

      <nav className="flex gap-2 mb-6 flex-wrap">
        <button
          className={`px-4 py-2 rounded ${tela === "home" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setTela("home")}
        >
          Visão Geral
        </button>
        <button
          className={`px-4 py-2 rounded ${tela === "votacao" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setTela("votacao")}
        >
          Votação
        </button>
        <button
          className={`px-4 py-2 rounded ${tela === "sorteio" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setTela("sorteio")}
        >
          Sorteio
        </button>
        <button
          className={`px-4 py-2 rounded ${tela === "radar" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setTela("radar")}
        >
          Radar Social
        </button>
      </nav>

      <section className="space-y-6">
        {tela === "home" && (
          <div className="grid gap-4 md:grid-cols-2">
            {/* 👥 Clientes Online (dados reais) */}
            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">👥 Clientes Online</h2>
              {usuarios.length === 0 ? (
                <p className="text-gray-400">Nenhum usuário logado.</p>
              ) : (
                <ul className="list-disc list-inside text-gray-300">
                                    
                  {usuarios.map((u, idx) => (
  <div key={idx} className="p-2 border-b border-gray-700">
    <p><strong>Nome:</strong> {u.name}</p>
    <p><strong>Mesa:</strong> {u.table}</p>
    <p><strong>Status:</strong> {u.status}</p>
    <p><strong>Hora:</strong> {u.timestamp}</p>
  </div>
))}
                </ul>
              )}
            </div>

            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">📊 Votação de Músicas</h2>
              <ul className="text-gray-300">
                <li>🔹 Evidências - 5 votos</li>
                <li>🔹 Asa Branca - 3 votos</li>
                <li>🔹 Whisky a Go Go - 2 votos</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">🎁 Sorteio</h2>
              <p className="text-gray-300">Participantes: 7</p>
              <button className="mt-2 bg-green-600 px-4 py-1 rounded">Sortear agora</button>
            </div>

            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">🔥 Radar Social</h2>
              <p className="text-gray-300">Solteiros: 5 | Comprometidos: 2</p>
              <p className="text-gray-300 mt-1">Mesa 3 parece estar animada 👀</p>
            </div>
          </div>
        )}

        {tela === "votacao" && (
          <div className="bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">📊 Controle de Votação</h2>
            <p>Implementaremos aqui o monitoramento de votos em tempo real.</p>
          </div>
        )}

        {tela === "sorteio" && (
          <div className="bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">🎁 Gerenciar Sorteios</h2>
            <p>Botão para sortear, mostrar ganhador e reiniciar sorteios.</p>
          </div>
        )}

        {tela === "radar" && (
          <div className="bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">🔥 Radar Social</h2>
            <p>Gráfico de calor das mesas mais movimentadas e perfis ativos.</p>
          </div>
        )}
      </section>
    </div>
  );
}