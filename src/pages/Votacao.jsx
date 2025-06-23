//NOVO PROJETO SEM CHAT

import { useState } from "react";

export default function Votacao({ user }) {
  const musicas = ["Evidências", "Garota de Ipanema", "Ai Se Eu Te Pego"];
  const [voto, setVoto] = useState(null);

  const handleVotar = (musica) => {
    setVoto(musica);
    alert(`Você votou em: ${musica}`);
    // Aqui podemos salvar no Firebase depois
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">🎵 Votação de Música</h2>
      <p className="text-center text-gray-300">Escolha a próxima música!</p>

      <ul className="space-y-2">
        {musicas.map((musica) => (
          <li key={musica}>
            <button
              onClick={() => handleVotar(musica)}
              disabled={voto !== null}
              className={`w-full px-4 py-2 rounded ${
                voto === musica
                  ? "bg-green-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {musica}
            </button>
          </li>
        ))}
      </ul>

      {voto && (
        <p className="text-center text-green-400">
          Obrigado por votar, {user.name}!
        </p>
      )}
    </div>
  );
}


// export default function Votacao({ user }) {
//   return (
//     <div className="p-6 text-white">
//       <h1 className="text-2xl font-bold mb-4">🎵 Votação de Músicas</h1>
//       <p>Em breve, você poderá escolher a próxima música!</p>
//     </div>
//   );
// }
