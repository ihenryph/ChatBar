// NOVO PROJETO SEM CHAT

import { Link } from "react-router-dom";

export default function Home({ user }) {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">🍻 Bem-vindo, {user.name}!</h1>
      <p className="mb-4">Mesa: {user.table}</p>

      <div className="space-y-3">
        <Link to="/votacao" className="block bg-blue-600 p-3 rounded text-center">🎵 Votar em Música</Link>
        <Link to="/radar" className="block bg-green-600 p-3 rounded text-center">📡 Radar Social</Link>
        <Link to="/sorteio" className="block bg-yellow-500 p-3 rounded text-center">🎁 Participar de Sorteio</Link>
        <Link to="/perfil" className="block bg-gray-700 p-3 rounded text-center">👤 Meu Perfil</Link>
      </div>
    </div>
  );
}

