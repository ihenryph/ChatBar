import { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import Entry from "./components/Entry";
import RadarSocial from "./components/RadarSocial";

function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("entry");

  if (!user) return <Entry onEnter={(u) => { setUser(u); setScreen("chat"); }} />;

  if (screen === "radar") {
    return <RadarSocial onBack={() => setScreen("chat")} />;
  }

  return (
    <ChatRoom
  user={user}
  onLogout={() => {
    setUser(null);
    setScreen("entry");
  }}
  onChangeScreen={(screen) => setScreen(screen)} // ← aqui!
/>

    // <div className="bg-gray-900 min-h-screen text-white">
    //   <ChatRoom user={user} onLogout={() => { setUser(null); setScreen("entry"); }} />
    //   <div className="fixed bottom-4 right-4">
    //     <button
    //       onClick={() => setScreen("radar")}
    //       className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
    //     >
    //       Ver Radar
    //     </button>
    //   </div>
    // </div>
  );
}

export default App;







// import { useState } from "react";
// import ChatRoom from "./components/ChatRoom";
// import Entry from "./components/Entry";
// import Profile from "./pages/Profile";

// function App() {
//   const [user, setUser] = useState(null);
//   const [showProfile, setShowProfile] = useState(false);

//   if (!user) return <Entry onEnter={setUser} />;

//   return (
//     <div className="bg-gray-900 min-h-screen text-white flex flex-col">
//       <div className="flex-1">
//         {showProfile ? (
//           <Profile
//             user={user}
//             onSave={(updatedUser) => {
//               setUser(updatedUser);
//               setShowProfile(false);
//             }}
//           />
//         ) : (
//           <ChatRoom user={user} onLogout={() => setUser(null)} />
//         )}
//       </div>

//       {/* Rodapé com botão para abrir o perfil */}
//       <footer className="bg-gray-800 text-center p-2 border-t border-gray-700">
//         <button
//           onClick={() => setShowProfile(true)}
//           className="text-white underline"
//         >
//           Meu Perfil
//         </button>
//       </footer>
//     </div>
//   );
// }

// export default App;


//-----------------------------------------------



// import { useState } from "react";
// import Login from "./components/Login";
// import ChatRoom from "./components/ChatRoom";

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       {user ? <ChatRoom user={user} /> : <Login onLogin={setUser} />}
//     </div>
//   );
// }

// export default App;
// src/App.jsx


//---------------------------------------------------------

// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import ChatRoom from "./components/ChatRoom";
// import Entry from "./components/Entry";
// import Profile from "./pages/Profile";

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       <Routes>
//         <Route
//           path="/"
//           element={
//             user ? (
//               <Navigate to="/chat" />
//             ) : (
//               <Entry onEnter={setUser} />
//             )
//           }
//         />
//         <Route
//           path="/chat"
//           element={
//             user ? (
//               <ChatRoom user={user} onLogout={() => setUser(null)} />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//         <Route
//           path="/perfil"
//           element={
//             user ? (
//               <Profile user={user} setUser={setUser} />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;

//---------------------------------------------------------