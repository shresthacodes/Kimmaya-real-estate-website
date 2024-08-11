import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Chatbot.css"; // Import custom CSS

const Chatbot = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  useEffect(() => {
    if (isChatbotVisible) {
      const script = document.createElement("script");
      script.id = "artibot-script"; // Assign an ID for easy removal
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://app.artibot.ai/loader.js";

      script.onload = () => {
        if (window.ArtiBot) {
          new window.ArtiBot({
            i: "2999afd0-d495-41b5-b61c-5fb8e9f3f64c",
            em: { id: "1723316301102", w: "390", h: "390", sh: true, tb: true },
          });
        }
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script); // Clean up the script when the component is unmounted or visibility changes
      };
    }
  }, [isChatbotVisible]);

  return (
    <div>
      {isChatbotVisible && (
        <div className="chatbot-popup">
          <button
            className="btn-close"
            onClick={() => setChatbotVisible(false)}
          >
            &times; {/* Close icon */}
          </button>
          <div id="artibot-1723316301102"></div>
        </div>
      )}
      {!isChatbotVisible && (
        <button
          className="chatbot-toggle"
          onClick={() => setChatbotVisible(true)}
        >
          Chat
        </button>
      )}
    </div>
  );
};

export default Chatbot;
