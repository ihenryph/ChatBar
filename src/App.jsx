// import { useState } from "react";
// import ChatRoom from "./components/ChatRoom";
// import Entry from "./components/Entry";

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       {user ? (
//         <ChatRoom user={user} onLogout={() => setUser(null)} />
//       ) : (
//         <Entry onEnter={setUser} />
//       )}
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {user ? <ChatRoom user={user} /> : <Login onLogin={setUser} />}
    </div>
  );
}

export default App;
