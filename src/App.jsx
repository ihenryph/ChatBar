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
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <div className="flex justify-center items-center mb-4">
        <div className="space-x-2">
          <button
            className="bg-blue-600 px-3 py-1 rounded"
            onClick={() => setTelaAtual("chat")}
                     >
            Bate-Papo
          </button>
        <button
              className="bg-yellow-600 px-3 py-1 rounded"
              onClick={() => setTelaAtual("radar")}
            >
              Radar Social
            </button>

          <button
            className="bg-green-600 px-3 py-1 rounded"
            onClick={() => setTelaAtual("votacao")}
          >
            Votação
          </button>
          <button
  className="bg-purple-600 px-3 py-1 rounded"
  onClick={() => setTelaAtual("perfil")}
>
  Meu Perfil
</button>

          
          <button
  className="bg-pink-600 px-3 py-1 rounded"
  onClick={() => setTelaAtual("sorteio")}
>
  Sorteio
</button>
<button
  className="bg-pink-400 px-3 py-1 rounded"
  onClick={() => setTelaAtual("paquera")}
>
  Paquera
</button>

<button
            className="bg-red-600 px-3 py-1 rounded"
            onClick={() => setUser(null)}
          >
            Trocar Usuário
          </button>
        </div>
      </div>

      {/* Exibe a tela selecionada */}
      
      {telaAtual === "chat" && <ChatRoom user={user} />}
      {telaAtual === "votacao" && <Votacao user={user} />}
      {telaAtual === "radar" && <RadarSocial user={user} />}
      {telaAtual === "sorteio" && <Sorteio user={user} />}
      {telaAtual === "perfil" && (<Profile user={user} onBack={() => setTelaAtual("chat")}/>)}
      {telaAtual === "paquera" && <Paquera user={user} />}
      <Notificacoes user={user} />
      
    </div>
      );
}

export default App;