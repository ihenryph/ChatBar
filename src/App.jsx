//NOVO PROJETO SEM CHAT


import { useState } from "react";
import ChatRoom from "./pages/ChatRoom";
import Votacao from "./pages/Votacao";
import Entry from "./pages/Entry";
import RadarSocial from "./pages/RadarSocial";
import Sorteio from "./pages/Sorteio";
import Profile from "./pages/Profile";
import Paquera from "./pages/Paquera";
import Notificacoes from "./pages/Notificacoes";
import PainelAdmin from "./pages/PainelAdmin";

function App() {
  const [user, setUser] = useState(null);
  const [telaAtual, setTelaAtual] = useState("chat"); // "chat" | "votacao" | outros no futuro

  if (!user) return <Entry onEnter={setUser} />;
 
  if (user?.isAdmin) {
  return <PainelAdmin />; }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header com navegação em ícones */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-xl font-bold">🍻 ChatBar</h1>
        </div>
        
        <div className="flex justify-center items-center gap-1 overflow-x-auto">
          <button
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              telaAtual === "chat" 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setTelaAtual("chat")}
          >
            <span className="text-2xl mb-1">💬</span>
            <span className="text-xs font-medium">Chat</span>
          </button>

          <button
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              telaAtual === "radar" 
                ? "bg-yellow-600 text-white shadow-lg" 
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setTelaAtual("radar")}
          >
            <span className="text-2xl mb-1">🔍</span>
            <span className="text-xs font-medium">Radar</span>
          </button>

          <button
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              telaAtual === "votacao" 
                ? "bg-green-600 text-white shadow-lg" 
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setTelaAtual("votacao")}
          >
            <span className="text-2xl mb-1">🎵</span>
            <span className="text-xs font-medium">Música</span>
          </button>

          <button
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              telaAtual === "paquera" 
                ? "bg-pink-600 text-white shadow-lg" 
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setTelaAtual("paquera")}
          >
            <span className="text-2xl mb-1">💘</span>
            <span className="text-xs font-medium">Paquera</span>
          </button>

          <button
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              telaAtual === "sorteio" 
                ? "bg-purple-600 text-white shadow-lg" 
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setTelaAtual("sorteio")}
          >
            <span className="text-2xl mb-1">🎁</span>
            <span className="text-xs font-medium">Sorteio</span>
          </button>

          <button
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              telaAtual === "perfil" 
                ? "bg-indigo-600 text-white shadow-lg" 
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setTelaAtual("perfil")}
          >
            <span className="text-2xl mb-1">👤</span>
            <span className="text-xs font-medium">Perfil</span>
          </button>

          <button
            className="flex flex-col items-center p-3 rounded-lg bg-red-700 text-gray-300 hover:bg-red-600 transition-all"
            onClick={() => setUser(null)}
          >
            <span className="text-2xl mb-1">🚪</span>
            <span className="text-xs font-medium">Sair</span>
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-4">
        {telaAtual === "chat" && <ChatRoom user={user} />}
        {telaAtual === "votacao" && <Votacao user={user} />}
        {telaAtual === "radar" && <RadarSocial user={user} />}
        {telaAtual === "sorteio" && <Sorteio user={user} />}
        {telaAtual === "perfil" && (<Profile user={user} onBack={() => setTelaAtual("chat")}/>)}
        {telaAtual === "paquera" && <Paquera user={user} />}
      </div>

      <Notificacoes user={user} />
    </div>
  );
}

export default App;