//NOVO PROJETO SEM CHAT

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function PainelAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [tela, setTela] = useState("home");
  const [sorteioData, setSorteioData] = useState({ participantes: [], ganhador: null });

  useEffect(() => {
    const fetchUsuarios = async () => {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const lista = querySnapshot.docs.map(doc => doc.data());
      setUsuarios(lista);
    };

    const fetchSorteio = async () => {
      try {
        const sorteioDoc = await getDocs(collection(db, "sorteio"));
        if (!sorteioDoc.empty) {
          const data = sorteioDoc.docs[0].data();
          setSorteioData({
            participantes: data.participantes || [],
            ganhador: data.ganhador || null
          });
        }
      } catch (error) {
        console.log("Erro ao buscar dados do sorteio:", error);
      }
    };

    fetchUsuarios();
    fetchSorteio();
  }, []);

  const handleReiniciarSorteio = async () => {
    try {
      const sorteioRef = doc(db, "sorteio", "dados");
      await updateDoc(sorteioRef, {
        participantes: [],
        ganhador: null,
      });
      
      setSorteioData({ participantes: [], ganhador: null });
      alert("Sorteio reiniciado com sucesso!");
    } catch (error) {
      console.error("Erro ao reiniciar sorteio:", error);
      alert("Erro ao reiniciar sorteio. Tente novamente.");
    }
  };

  const handleSortear = async () => {
    if (sorteioData.participantes.length === 0) {
      alert("Não há participantes para sortear!");
      return;
    }

    try {
      const escolhido = sorteioData.participantes[Math.floor(Math.random() * sorteioData.participantes.length)];
      const sorteioRef = doc(db, "sorteio", "dados");
      
      await updateDoc(sorteioRef, {
        ganhador: escolhido,
      });
      
      setSorteioData(prev => ({ ...prev, ganhador: escolhido }));
      alert(`Ganhador sorteado: ${escolhido.name} da Mesa ${escolhido.table}!`);
    } catch (error) {
      console.error("Erro ao sortear:", error);
      alert("Erro ao realizar sorteio. Tente novamente.");
    }
  };

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
                      <p><strong>Hora:</strong> {u.timestamp?.toDate().toLocaleTimeString()}</p>
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
              <p className="text-gray-300">Participantes: {sorteioData.participantes.length}</p>
              {sorteioData.ganhador && (
                <p className="text-green-400 mt-1">
                  🏆 Ganhador: {sorteioData.ganhador.name} (Mesa {sorteioData.ganhador.table})
                </p>
              )}
              <div className="mt-2 space-x-2">
                <button 
                  className="bg-green-600 px-4 py-1 rounded hover:bg-green-700"
                  onClick={handleSortear}
                >
                  Sortear agora
                </button>
                <button 
                  className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
                  onClick={handleReiniciarSorteio}
                >
                  Reiniciar Sorteio
                </button>
              </div>
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
            
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Status do Sorteio</h3>
                <p className="text-gray-300">Participantes: {sorteioData.participantes.length}</p>
                
                {sorteioData.ganhador ? (
                  <div className="mt-2 p-3 bg-green-800 rounded">
                    <p className="text-green-200">
                      🏆 Ganhador: {sorteioData.ganhador.name} (Mesa {sorteioData.ganhador.table})
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400 mt-2">Nenhum ganhador ainda</p>
                )}
              </div>

              <div className="bg-gray-700 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Lista de Participantes</h3>
                {sorteioData.participantes.length === 0 ? (
                  <p className="text-gray-400">Nenhum participante ainda.</p>
                ) : (
                  <ul className="space-y-1">
                    {sorteioData.participantes.map((p, i) => (
                      <li key={i} className="text-gray-300">
                        🧑 {p.name} (Mesa {p.table})
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
                  onClick={handleSortear}
                  disabled={sorteioData.participantes.length === 0}
                >
                  Realizar Sorteio
                </button>
                <button 
                  className="bg-red-600 px-6 py-2 rounded hover:bg-red-700"
                  onClick={handleReiniciarSorteio}
                >
                  Reiniciar Sorteio
                </button>
              </div>
            </div>
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