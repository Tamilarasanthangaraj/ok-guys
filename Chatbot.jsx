import React, { useState } from "react";
import img1 from './Img1/H.jpg'; 
import { BsFillSendFill } from "react-icons/bs";
import { FaRobot } from "react-icons/fa"; 

const Chatbot = () => {
  const [messages, setMessages] = useState([]); 
  const [inputMessage, setInputMessage] = useState(""); 
  const [showChatbot, setShowChatbot] = useState(false);
  const [showIcon, setShowIcon] = useState(true); 

 
  const getResponse = (message) => {
    if (message.toLowerCase().includes("hi")) {
      return { icon: <FaRobot />, text: "Hello! How can I assist you today?" }; 
    } else if (message.toLowerCase().includes("how are you")) {
      return { icon: <FaRobot />, text: "I'm doing great, thank you for asking!" };
    } else if (message.toLowerCase().includes("good morning")) {
      return { icon: <FaRobot />, text: "Good morning! Hope you have a great day ahead!" };
    } else if (message.toLowerCase().includes("google")) {
      return { icon: <FaRobot />, text: "Here is the link to Google: https://www.google.com" };
    } else {
      return { icon: <FaRobot />, text: "Sorry, I didn't understand that. Please ask something else!" };
    }
  };


  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, sender: "user" }, 
      ]);
      setInputMessage("");

      const reply = getResponse(inputMessage); 

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: reply.text, sender: "bot", icon: reply.icon }, 
        ]);
      }, 1000); 
    }
  };


  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    setShowIcon(!showIcon);
  };

  return (
    <div>
      {/* Floating chatbot icon at bottom-right  */}
      {showIcon && (
        <div className="chatbot-icon" onClick={toggleChatbot}>
          <img src={img1} alt="Chatbot Icon" className="chatbot-icon-img" />
        </div>
      )}

      {/* Conditionally render chatbot*/}
      {showChatbot && (
        <div className="chatbot">
          <div className="header">
            <div className="logo">
              <img src={img1} alt="logo" className="logo-img" />
            </div>
            <div className="heading">MODV</div>
          </div>

          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === "user" ? "user" : "bot"}`}
              >
               
                {message.sender === "bot" && (
                  <span className="message-icon">
                    {/* Render bot icon */}
                    <span className="bot-icon">{message.icon}</span>
                    {/* Render bot's message */}
                    <span className="bot-message">{message.text}</span>
                  </span>
                )}

            
                {message.sender === "user" && (
                  <span className="user-message">{message.text}</span>
                )}
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={handleSendMessage}><BsFillSendFill /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
