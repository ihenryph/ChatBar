//NOVO PROJETO SEM CHAT

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, doc, updateDoc, onSnapshot, query, orderBy } from "firebase/firestore";

export default function PainelAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [tela, setTela] = useState("home");
  const [sorteioData, setSorteioData] = useState({ participantes: [], ganhador: null });
  const [messages, setMessages] = useState([]);
  const [curtidas, setCurtidas] = useState([]);

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

    // Observar mensagens em tempo real
    const unsubMessages = onSnapshot(
      query(collection(db, "messages"), orderBy("timestamp")),
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
      }
    );

    // Observar curtidas em tempo real
    const unsubCurtidas = onSnapshot(
      collection(db, "curtidas"),
      (snapshot) => {
        const curtidasList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCurtidas(curtidasList);
      }
    );

    fetchUsuarios();
    fetchSorteio();

    return () => {
      unsubMessages();
      unsubCurtidas();
    };
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

  // Calcular atividade das mesas
  const calcularAtividadeMesas = () => {
    const atividadePorMesa = {};
    
    // Contar mensagens por mesa
    messages.forEach(msg => {
      if (msg.table) {
        atividadePorMesa[msg.table] = (atividadePorMesa[msg.table] || 0) + 1;
      }
    });

    // Contar curtidas por mesa
    curtidas.forEach(curtida => {
      const usuarioDe = usuarios.find(u => u.name === curtida.de);
      const usuarioPara = usuarios.find(u => u.name === curtida.para);
      
      if (usuarioDe) {
        atividadePorMesa[usuarioDe.table] = (atividadePorMesa[usuarioDe.table] || 0) + 0.5;
      }
      if (usuarioPara) {
        atividadePorMesa[usuarioPara.table] = (atividadePorMesa[usuarioPara.table] || 0) + 0.5;
      }
    });

    return Object.entries(atividadePorMesa)
      .map(([mesa, atividade]) => ({ mesa, atividade }))
      .sort((a, b) => b.atividade - a.atividade);
  };

  // Calcular perfis mais ativos
  const calcularPerfisAtivos = () => {
    const atividadePorUsuario = {};
    
    // Contar mensagens por usuário
    messages.forEach(msg => {
      if (msg.name) {
        atividadePorUsuario[msg.name] = (atividadePorUsuario[msg.name] || 0) + 1;
      }
    });

    // Contar curtidas enviadas
    curtidas.forEach(curtida => {
      atividadePorUsuario[curtida.de] = (atividadePorUsuario[curtida.de] || 0) + 1;
    });

    return Object.entries(atividadePorUsuario)
      .map(([nome, atividade]) => {
        const usuario = usuarios.find(u => u.name === nome);
        return { 
          nome, 
          atividade, 
          mesa: usuario?.table || 'N/A',
          status: usuario?.status || 'N/A'
        };
      })
      .sort((a, b) => b.atividade - a.atividade)
      .slice(0, 10); // Top 10
  };

  const mesasAtivas = calcularAtividadeMesas();
  const perfisAtivos = calcularPerfisAtivos();
  const maxAtividade = Math.max(...mesasAtivas.map(m => m.atividade), 1);

  // Calcular estatísticas gerais
  const totalMensagens = messages.length;
  const totalCurtidas = curtidas.length;
  const usuariosSolteiros = usuarios.filter(u => u.status === "Solteiro").length;
  const usuariosComprometidos = usuarios.filter(u => u.status === "Comprometido" || u.status === "Casado").length;

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
                      <p><strong>Hora:</strong> {u.timestamp?.toDate?.().toLocaleTimeString() || 'N/A'}</p>
                    </div>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">📊 Estatísticas Gerais</h2>
              <div className="space-y-2 text-gray-300">
                <p>💬 Total de mensagens: {totalMensagens}</p>
                <p>💖 Total de curtidas: {totalCurtidas}</p>
                <p>💚 Solteiros: {usuariosSolteiros}</p>
                <p>💙 Comprometidos: {usuariosComprometidos}</p>
              </div>
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
              <h2 className="text-xl font-bold mb-2">🔥 Top 3 Mesas Ativas</h2>
              {mesasAtivas.length === 0 ? (
                <p className="text-gray-400">Nenhuma atividade registrada.</p>
              ) : (
                <div className="space-y-2">
                  {mesasAtivas.slice(0, 3).map((mesa, idx) => (
                    <div key={mesa.mesa} className="flex items-center justify-between">
                      <span className="text-gray-300">
                        {idx === 0 && "🥇"} {idx === 1 && "🥈"} {idx === 2 && "🥉"} Mesa {mesa.mesa}
                      </span>
                      <span className="text-yellow-400 font-bold">{mesa.atividade} pts</span>
                    </div>
                  ))}
                </div>
              )}
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
          <div className="space-y-6">
            {/* Gráfico de Mesas Mais Movimentadas */}
            <div className="bg-gray-800 p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">🔥 Mesas Mais Movimentadas</h2>
              
              {mesasAtivas.length === 0 ? (
                <p className="text-gray-400">Nenhuma atividade registrada ainda.</p>
              ) : (
                <div className="space-y-3">
                  {mesasAtivas.map((mesa, idx) => (
                    <div key={mesa.mesa} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Mesa {mesa.mesa}</span>
                        <span className="text-yellow-400">{mesa.atividade} pontos</span>
                      </div>
                      
                      {/* Barra de progresso visual */}
                      <div className="w-full bg-gray-700 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full transition-all duration-500 ${
                            idx === 0 ? 'bg-red-500' : 
                            idx === 1 ? 'bg-orange-500' : 
                            idx === 2 ? 'bg-yellow-500' : 
                            'bg-blue-500'
                          }`}
                          style={{ 
                            width: `${(mesa.atividade / maxAtividade) * 100}%` 
                          }}
                        ></div>
                      </div>
                      
                      {/* Indicador de calor */}
                      <div className="flex items-center gap-2 text-sm">
                        <span>🌡️ Nível de atividade:</span>
                        <span className={`font-bold ${
                          mesa.atividade >= maxAtividade * 0.8 ? 'text-red-400' :
                          mesa.atividade >= maxAtividade * 0.5 ? 'text-orange-400' :
                          mesa.atividade >= maxAtividade * 0.3 ? 'text-yellow-400' :
                          'text-blue-400'
                        }`}>
                          {mesa.atividade >= maxAtividade * 0.8 ? 'MUITO QUENTE 🔥' :
                           mesa.atividade >= maxAtividade * 0.5 ? 'QUENTE 🌶️' :
                           mesa.atividade >= maxAtividade * 0.3 ? 'MORNO 🌤️' :
                           'FRIO ❄️'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Perfis Mais Ativos */}
            <div className="bg-gray-800 p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">👑 Perfis Mais Ativos</h2>
              
              {perfisAtivos.length === 0 ? (
                <p className="text-gray-400">Nenhuma atividade registrada ainda.</p>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {perfisAtivos.map((perfil, idx) => (
                    <div key={perfil.nome} className="bg-gray-700 p-4 rounded border-l-4 border-blue-500">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {idx < 3 && (
                            <span className="text-lg">
                              {idx === 0 && "👑"} {idx === 1 && "🥈"} {idx === 2 && "🥉"}
                            </span>
                          )}
                          <span className="font-semibold">{perfil.nome}</span>
                        </div>
                        <span className="bg-blue-600 px-2 py-1 rounded text-sm">
                          {perfil.atividade} pts
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>📍 Mesa: {perfil.mesa}</p>
                        <p>💝 Status: {perfil.status}</p>
                        <div className="flex items-center gap-1">
                          <span>⚡ Atividade:</span>
                          <div className="flex-1 bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${Math.min((perfil.atividade / Math.max(...perfisAtivos.map(p => p.atividade))) * 100, 100)}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resumo da Atividade Social */}
            <div className="bg-gray-800 p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">📊 Resumo da Atividade Social</h2>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-blue-900 p-4 rounded text-center">
                  <div className="text-2xl font-bold text-blue-300">{totalMensagens}</div>
                  <div className="text-sm text-blue-200">Mensagens Enviadas</div>
                </div>
                
                <div className="bg-pink-900 p-4 rounded text-center">
                  <div className="text-2xl font-bold text-pink-300">{totalCurtidas}</div>
                  <div className="text-sm text-pink-200">Curtidas Trocadas</div>
                </div>
                
                <div className="bg-green-900 p-4 rounded text-center">
                  <div className="text-2xl font-bold text-green-300">{usuarios.length}</div>
                  <div className="text-sm text-green-200">Usuários Ativos</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-700 rounded">
                <h3 className="font-semibold mb-2">🎯 Insights do Ambiente</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  {mesasAtivas.length > 0 && (
                    <li>🔥 Mesa {mesasAtivas[0].mesa} está dominando as conversas!</li>
                  )}
                  {perfisAtivos.length > 0 && (
                    <li>👑 {perfisAtivos[0].nome} é o usuário mais ativo da noite</li>
                  )}
                  {usuariosSolteiros > usuariosComprometidos && (
                    <li>💚 Ambiente com mais solteiros - clima de paquera!</li>
                  )}
                  {totalCurtidas > totalMensagens * 0.3 && (
                    <li>💖 Muita interação romântica rolando!</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}