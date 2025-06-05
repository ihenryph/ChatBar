// src/components/Header.jsx
export default function Header({ nomeBar }) {
  return (
    <div className="bg-black text-white py-3 px-4 shadow-lg">
      <h1 className="text-xl font-bold">ChatBar 🍻</h1>
      <p className="text-sm opacity-80">{nomeBar}</p>
    </div>
  );
}
