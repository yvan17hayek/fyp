import React, { useState } from 'react';
import ChatbotInterface from './Chatbot';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  }

  return (
    <div>
      <head>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />

      </head>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
        <Button variant="primary" onClick={toggleChatbot} className="rounded-circle p-3">
          {showChatbot ? <i className="fas fa-times"></i> : <i className="fas fa-comment"></i>}
        </Button>
        {showChatbot && <Chatbot style={{ position: 'absolute', bottom: 'calc(100% + 20px)', right: '0', width: '300px', height: '400px', zIndex: '1000' }} />}
      </div>
    </div>
  );
}
*/

function App() {
  // const [showChatbot, setShowChatbot] = useState(false);

  // const toggleChatbot = () => {
  //   setShowChatbot(!showChatbot);
  // };

  const [isChatbotOpen, setChatbotOpen] = useState(false);

  function handleToggleChatbot() {
    setChatbotOpen(!isChatbotOpen);
  }

  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "1000",
        }}
      >
        <Button
          variant="primary"
          onClick={handleToggleChatbot}
          className="rounded-circle p-3"
        >
          {isChatbotOpen ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-comment"></i>
          )}
        </Button>
      </div>
      {isChatbotOpen &&(
        <div
          style={{
            position: "relative",
            bottom: "calc(100% + 20px)",
            right: "20px",
            left: "1120px",
            top: "195px",
            width: "300px",
            height: "400px",
            zIndex: "1000",
          }}
        >
          <ChatbotInterface onClose={handleToggleChatbot} />
        </div>
      )}
    </div>
  );
}


export default App;
