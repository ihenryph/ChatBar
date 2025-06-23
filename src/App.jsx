// NOVO PROJEOTO - SEM CHAT 

import { useState } from "react";
import ChatRoom from "./pages/ChatRoom";
import Votacao from "./pages/Votacao";
import Entry from "./pages/Entry";
import RadarSocial from "./pages/RadarSocial";
import Sorteio from "./pages/Sorteio";

function App() {
  const [user, setUser] = useState(null);
  const [telaAtual, setTelaAtual] = useState("chat"); // "chat" | "votacao" | outros no futuro

  if (!user) return <Entry onEnter={setUser} />;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">ChatBar - Mesa {user.table}</h1>
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
            className="bg-red-600 px-3 py-1 rounded"
            onClick={() => setUser(null)}
          >
            Trocar Usuário
          </button>
          <button
  className="bg-pink-600 px-3 py-1 rounded"
  onClick={() => setTelaAtual("sorteio")}
>
  Sorteio
</button>

        </div>
      </div>

      {/* Exibe a tela selecionada */}
      {telaAtual === "chat" && <ChatRoom user={user} />}
      {telaAtual === "votacao" && <Votacao user={user} />}
      {telaAtual === "radar" && <RadarSocial user={user} />}
      {telaAtual === "sorteio" && <Sorteio user={user} />}

    </div>
  );
}

export default App;
