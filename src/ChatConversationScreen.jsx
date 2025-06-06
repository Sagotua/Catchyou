import { useParams } from "react-router-dom";

export default function ChatConversationScreen() {
  const { userId } = useParams();

  return (
    <div className="w-[360px] h-[800px] bg-black text-white mx-auto p-4 rounded-2xl shadow-xl flex flex-col">
      <h2 className="text-lg font-bold mb-4">Чат з користувачем #{userId}</h2>
      {/* Тут буде історія повідомлень */}
      <div className="flex-1 bg-zinc-800 rounded-lg p-4 overflow-y-auto">
        <p className="text-sm text-gray-400">– Привіт! Як справи?</p>
        <p className="text-sm text-right text-purple-300">– Все супер, а в тебе?</p>
      </div>

      {/* Ввід повідомлення */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Напишіть повідомлення..."
          className="flex-1 bg-zinc-900 text-white px-4 py-2 rounded-lg focus:outline-none"
        />
        <button className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition">
          Надіслати
        </button>
      </div>
    </div>
  );
}
