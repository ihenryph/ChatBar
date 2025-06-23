//NOVO PROJETO SEM CHAT

export default function Perfil({ user, onLogout }) {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">👤 Meu Perfil</h1>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Mesa:</strong> {user.table}</p>

      <button
        onClick={onLogout}
        className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Trocar Usuário
      </button>
    </div>
  );
}
