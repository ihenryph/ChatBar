//NOVO PROJETO SEM CHAT
// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Profile({ user, onBack }) {
  const [status, setStatus] = useState("");
  const [interesses, setInteresses] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  const userRef = doc(db, "usuarios", `${user.name}-mesa${user.table}`);

  // Carrega os dados do Firestore
  useEffect(() => {
    async function fetchData() {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStatus(data.status || "");
        setInteresses(data.interesses || "");
        setBio(data.bio || "");
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const salvarPerfil = async () => {
    await setDoc(userRef, {
      name: user.name,
      table: user.table,
      status,
      interesses,
      bio,
    });

    alert("Perfil salvo com sucesso!");
    onBack();
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="bg-gray-800 p-4 rounded shadow max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-center">Meu Perfil</h2>

      <div className="space-y-2">
        <label className="block">
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 rounded text-black"
          >
            <option value="">Selecione...</option>
            <option value="Solteiro(a)">Solteiro(a)</option>
            <option value="Namorando">Namorando</option>
            <option value="Casado(a)">Casado(a)</option>
            <option value="Prefiro não dizer">Prefiro não dizer</option>
          </select>
        </label>

        <label className="block">
          Interesses:
          <input
            type="text"
            value={interesses}
            onChange={(e) => setInteresses(e.target.value)}
            placeholder="Ex: conhecer pessoas, dançar, beber"
            className="w-full p-2 rounded text-black"
          />
        </label>

        <label className="block">
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Fale um pouco sobre você..."
            className="w-full p-2 rounded text-black"
          />
        </label>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
        >
          Voltar
        </button>
        <button
          onClick={salvarPerfil}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import { db } from "../lib/firebase";
// import {
//   doc,
//   setDoc,
//   getDoc
// } from "firebase/firestore";

// export default function Profile({ user, onBack }) {
//   const [form, setForm] = useState({
//     name: user.name || "",
//     table: user.table || "",
//     status: "",
//     music: [],
//     mood: "",
//     bio: ""
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const ref = doc(db, "usuarios", user.name);
//       const snap = await getDoc(ref);
//       if (snap.exists()) {
//         setForm(prev => ({
//           ...prev,
//           ...snap.data()
//         }));
//       }
//     };
//     fetchData();
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       const newMusic = checked
//         ? [...form.music, value]
//         : form.music.filter(m => m !== value);
//       setForm(prev => ({ ...prev, music: newMusic }));
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const ref = doc(db, "usuarios", user.name);
//     await setDoc(ref, form);
//     alert("Perfil salvo com sucesso!");
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 text-white">
//       <h2 className="text-2xl font-bold text-center mb-4">🎯 Meu Perfil</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1">Nome:</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
//             disabled
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Mesa:</label>
//           <input
//             type="text"
//             name="table"
//             value={form.table}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
//             disabled
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Status de Relacionamento:</label>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
//           >
//             <option value="">Selecione...</option>
//             <option value="solteiro">Solteiro(a)</option>
//             <option value="casado">Casado(a)</option>
//             <option value="enrolado">Enrolado(a)</option>
//             <option value="aberto">Aberto(a) a conhecer pessoas</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1">Gêneros Musicais:</label>
//           <div className="flex flex-wrap gap-2">
//             {["Rock", "Pagode", "Sertanejo", "Eletrônica", "Funk", "Samba", "MPB"].map((genre) => (
//               <label key={genre} className="flex items-center gap-1">
//                 <input
//                   type="checkbox"
//                   value={genre}
//                   checked={form.music.includes(genre)}
//                   onChange={handleChange}
//                 />
//                 {genre}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="block mb-1">Seu clima no rolê:</label>
//           <input
//             type="text"
//             name="mood"
//             value={form.mood}
//             onChange={handleChange}
//             placeholder="Ex: Curtindo tudo, só observando..."
//             className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Bio / Recado:</label>
//           <textarea
//             name="bio"
//             value={form.bio}
//             onChange={handleChange}
//             rows="3"
//             className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
//             placeholder="Conte um pouco sobre você..."
//           />
//         </div>

//         <div className="flex justify-between mt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
//           >
//             Voltar
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
//           >
//             Salvar
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

