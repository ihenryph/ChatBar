//NOVO PROJETO SEM CHAT

export default function RadarSocial({ user }) {
  const mesas = [
    { numero: 1, pessoas: 2, status: "casal" },
    { numero: 2, pessoas: 4, status: "grupo" },
    { numero: 3, pessoas: 1, status: "solteiro" },
    { numero: 14, pessoas: 3, status: "grupo" }, // Sua mesa
    { numero: 7, pessoas: 2, status: "casal" },
    { numero: 9, pessoas: 0, status: "vazia" }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">📡 Radar Social</h2>
      <p className="text-center text-gray-300">Veja o movimento e perfil das mesas</p>

      <div className="grid grid-cols-3 gap-4">
        {mesas.map((mesa) => {
          const isUser = mesa.numero === user.table;
          const cor =
            mesa.pessoas === 0
              ? "bg-gray-700"
              : mesa.status === "solteiro"
              ? "bg-pink-600"
              : mesa.status === "casal"
              ? "bg-purple-600"
              : "bg-green-600";

          return (
            <div
              key={mesa.numero}
              className={`p-4 rounded text-center text-white ${cor} ${
                isUser ? "ring-4 ring-yellow-300" : ""
              }`}
            >
              <div className="text-xl font-bold">Mesa {mesa.numero}</div>
              <div>{mesa.pessoas} pessoa(s)</div>
              <div className="text-sm capitalize">{mesa.status}</div>
              {isUser && <div className="text-yellow-200 mt-1">👈 Você</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}



// // src/components/RadarSocial.jsx
// export default function RadarSocial({ onBack }) {
//   const mesas = [
//     { numero: 1, status: "solteiro" },
//     { numero: 2, status: "relacionamento" },
//     { numero: 3, status: "complicado" },
//     { numero: 4, status: "solteiro" },
//     { numero: 5, status: "solteiro" },
//     { numero: 6, status: "relacionamento" },
//     { numero: 7, status: "complicado" },
//     { numero: 8, status: "solteiro" },
//   ];

//   const getColor = (status) => {
//     switch (status) {
//       case "solteiro":
//         return "bg-green-500";
//       case "relacionamento":
//         return "bg-blue-500";
//       case "complicado":
//         return "bg-yellow-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   return (
//     <div className="p-4 text-white max-w-xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold text-center">📍 Radar Social</h2>
//       <p className="text-center text-gray-300">
//         Veja a distribuição de perfis no bar:
//       </p>

//       <div className="grid grid-cols-4 gap-4">
//         {mesas.map((mesa) => (
//           <div
//             key={mesa.numero}
//             className={`rounded-lg h-16 flex items-center justify-center text-lg font-bold ${getColor(mesa.status)}`}
//           >
//             {mesa.numero}
//           </div>
//         ))}
//       </div>

//       <div className="text-sm text-gray-300 flex justify-between mt-4">
//         <div><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>Solteiro</div>
//         <div><span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Relacionamento</div>
//         <div><span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Complicado</div>
//       </div>

//       <button
//         onClick={onBack}
//         className="block mx-auto mt-6 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
//       >
//         Voltar
//       </button>
//     </div>
//   );
// }
