import { useState, useRef } from "react";

const ChatApp = () => {
  // const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  // const ws = useRef(null);

  // useEffect(() => {

  //   ws.current = new WebSocket("wss://your-websocket-server.com");

  //   ws.current.onmessage = (event) => {
  //     const newMessage = JSON.parse(event.data);
  //     setMessages((prev) => [...prev, newMessage]);
  //   };

  //   return () => ws.current.close();
  // }, []);

  // const sendMessage = () => {
  //   if (!input.trim()) return;
  //   const msg = { text: input, sender: "You", type: "text" };
  //   ws.current.send(JSON.stringify(msg));
  //   setMessages((prev) => [...prev, msg]);
  //   setInput("");
  // };

  const sendLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationMsg = {
          text: `📍 Location: https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`,
          sender: "You",
          type: "location",
        };
        console.log(locationMsg);
        // ws.current.send(JSON.stringify(locationMsg));
        // setMessages((prev) => [...prev, locationMsg]);
      },
      () => alert("Failed to retrieve location.")
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-600 text-white text-lg font-bold p-4 text-center">
        Emergency Chat
      </div>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "You"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-black"
            }`}
          >
            {msg.text.startsWith("📍 Location") ? (
              <a
                href={msg.text.split(": ")[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline"
              >
                {msg.text}
              </a>
            ) : (
              msg.text
            )}
          </div>
        ))} */}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-inherit flex items-center border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter"}
        />
        <button
          onClick={sendLocation}
          className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          📍
        </button>
        <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
