// src/components/MessageBubble.jsx
export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-2 rounded-2xl max-w-xs ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
        <p className="text-xs opacity-80 mb-1">{!isOwn && message.nome}</p>
        <p>{message.texto}</p>
      </div>
    </div>
  );
}
