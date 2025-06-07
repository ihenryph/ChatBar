// // src/pages/Profile.jsx

// src/pages/Profile.jsx
import { useState } from "react";

export default function Profile({ user, onSave }) {
  const [name, setName] = useState(user.name || "");
  const [table, setTable] = useState(user.table || "");
  const [status, setStatus] = useState(user.status || "solteiro");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, name, table, status });
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">👤 Meu Perfil</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Seu nome</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Número da mesa</label>
          <input
            type="number"
            className="w-full px-4 py-2 rounded text-black"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            className="w-full px-4 py-2 rounded text-black"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="solteiro">Solteiro(a)</option>
            <option value="relacionamento">Em um relacionamento</option>
            <option value="complicado">É complicado</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Profile({ user, setUser }) {
//   const [name, setName] = useState(user.name || "");
//   const [table, setTable] = useState(user.table || "");
//   const [status, setStatus] = useState(user.status || "solteiro");
//   const [visible, setVisible] = useState(user.visible ?? true);
//   const navigate = useNavigate();

//   const handleSave = () => {
//     const updatedUser = { ...user, name, table, status, visible };
//     setUser(updatedUser);
//     navigate("/chat"); // voltar para o chat
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 text-white">
//       <h1 className="text-2xl font-bold mb-4">👤 Perfil</h1>

//       <div className="space-y-4">
//         <div>
//           <label className="block mb-1">Nome:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 text-black rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Número da mesa:</label>
//           <input
//             type="text"
//             value={table}
//             onChange={(e) => setTable(e.target.value)}
//             className="w-full px-4 py-2 text-black rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Status:</label>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="w-full px-4 py-2 text-black rounded"
//           >
//             <option value="solteiro">Solteiro(a)</option>
//             <option value="complicado">Complicado</option>
//             <option value="namorando">Namorando</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={visible}
//             onChange={(e) => setVisible(e.target.checked)}
//           />
//           <label>Mostrar no Radar Social</label>
//         </div>

//         <button
//           onClick={handleSave}
//           className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-full"
//         >
//           Salvar
//         </button>
//       </div>
//     </div>
//   );
// }
