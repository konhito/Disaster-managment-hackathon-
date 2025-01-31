import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const [location, setLocation] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const googleMapsLink = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
        setLocation(googleMapsLink);
        setInput(googleMapsLink);
      },
      () => alert("Failed to retrieve location.")
    );
  };
  const [messages, setMessages] = useState<{ userId: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const userId = useRef(Math.floor(Math.random() * 10000));

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      try {
        const { userId, text } = JSON.parse(event.data);
        setMessages((prev) => [...prev, { userId, text }]);
      } catch (error) {
        console.error("Invalid message format", error);
      }
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !ws.current) return;

    const msg = { userId: userId.current.toString(), text: input };
    ws.current.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, msg]);
    setInput("");
    setLocation("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-blue-600 text-white text-lg font-bold p-4 text-center">
        Emergency Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-3 rounded-lg bg-gray-300 text-black">
            <strong>User {msg.userId}:</strong> {msg.text}
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
          type="button"
          onClick={getLocation}
          className="bg-blue-600 ml-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          📍
        </button>
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2  bg-blue-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
