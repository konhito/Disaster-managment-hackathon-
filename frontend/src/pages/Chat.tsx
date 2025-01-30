import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const ws = useRef<WebSocket | null>(null); // ✅ Explicitly define type

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080"); // Replace with actual WebSocket server URL

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prev) => [...prev, newMessage]);
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      if (ws.current) {
        ws.current.close(); // Close WebSocket connection properly
      }
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !ws.current) return;
    const msg = { type: "chat", payload: { message: input } };
    ws.current.send(JSON.stringify(msg)); // 📤 Send message
    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-bold p-4 text-center">
        Emergency Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-3 rounded-lg bg-gray-300 text-black">
            {msg}
          </div>
        ))}
      </div>

      <div className="p-4 bg-white flex items-center border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
