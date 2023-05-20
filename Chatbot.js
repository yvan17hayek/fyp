import React, { useState , useEffect} from "react";
import { Container, Row, Col, Form, Button, ToggleButton } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { isVisible } from "@testing-library/user-event/dist/utils";

function ChatbotInterface({ onClose }) {
  const [inputValue, setInputValue] = useState("");
  const [isChatbotOpen, setChatbotOpen] = useState(true);
  const [isChatbotMinimized, setChatbotMinimized] = useState(false);
  const [isChatbotDocked, setChatbotDocked] = useState(false);
  
  // const chatbotHeader = document.getElementById("chatbotHeader");
  // const chatbotContainer = document.getElementById("chatbotInterface");


  useEffect(() => {
    const chatbotHeader = document.getElementById("chatbotHeader");
    const chatbotContainer = document.getElementById("chatbotInterface");
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    function startDragging(event) {
      isDragging = true;
      prevX = event.clientX;
      prevY = event.clientY;
    }

    function stopDragging() {
      isDragging = false;
    }

    function drag(event) {
      if (isDragging) {
        const deltaX = event.clientX - prevX;
        const deltaY = event.clientY - prevY;

        const currentLeft = parseInt(chatbotContainer.style.left) || 0;
        const currentTop = parseInt(chatbotContainer.style.top) || 0;

        chatbotContainer.style.left = currentLeft + deltaX + "px";
        chatbotContainer.style.top = currentTop + deltaY + "px";

        prevX = event.clientX;
        prevY = event.clientY;
      }
    }

    chatbotHeader.addEventListener("mousedown", startDragging);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("mousemove", drag);

    return () => {
      chatbotHeader.removeEventListener("mousedown", startDragging);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("mousemove", drag);
    };
  }, []); // Empty dependency array to run the effect only once

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function handleToggleMinimize() {
    setChatbotMinimized(!isChatbotMinimized);
  }


  if (isChatbotMinimized) {
// Don't render the whole chatbot interface if it's minimized
    return(
      <div
        id="chatbotInterface"
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "400px",
          height: "15px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px #ccc",
          display: "flex",
          flexDirection: "column",
          position: isChatbotDocked ? "static" : "absolute",
          bottom: isChatbotDocked ? "20px" : "auto",
          right: isChatbotDocked ? "20px" : "auto",
        }}
      >

      <div
        id="chatbotHeader"
        style={{
          cursor: "move",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#b64902",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h4 style={{ color: "white" }}>Chatbot</h4>

        {/* buttons */}
        <div style={{float: "right"}}>
          {isChatbotDocked ? (
            <button onClick={handleToggleDock}>Undock</button>
          ) : (
            <button onClick={handleToggleDock}>Dock</button>
          )}
          <button style={{width:"25px"}} onClick={handleToggleMinimize}>
            {isChatbotMinimized ? "+" : "-"}
          </button>
          <button style={{width:"25px"}} onClick={onClose}>X</button>
          </div>
      </div>

      <div style={{ height:"0px", flex: 1, overflowY: "scroll", padding: "0px" }}>
          <Container fluid>
            <Row>
              <Col xs={12}>
                <div id="response-area">
                  <h6 style={{textAlign:"center"}}>Ask me anything!</h6>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

      <ToastContainer />

    </div>
      )
  }

  function handleToggleDock() {
    setChatbotDocked(!isChatbotDocked);
  }

  // function handleClose() {
  //   setChatbotOpen(false);
  // }

  if (!isChatbotOpen) {
    return null; // Don't render the chatbot interface if it's closed
  }

  async function handleMessageSubmit(event) {
    event.preventDefault();

    if (!inputValue) {
      toast.error("Please enter a valid question!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const responseArea = document.getElementById("response-area");

    // remove the "Ask me anything!" text when the first message is sent
    const isFirstMessage = responseArea.childElementCount === 1;

    if (isFirstMessage) {
      const askAnythingText = responseArea.querySelector("h6");
      askAnythingText.innerText = "";
    }


    try {
      // Send user's input to API endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/getChatbotResponse",
        {
          sentence: inputValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          //mode: "no-cors", // Add this line to enable no-cors mode
        }
      );
      
      let br = document.createElement("br");

// user message section
      let div1 = document.createElement("div")

      
      let div_user = document.createElement("div");
      div_user.style.padding = "5px 10px";
      div_user.style.borderRadius = "10px";
      div_user.style.backgroundColor = "#645846";
      div_user.style.color = "#fff";
      div_user.style.float = "right";
      div_user.style.clear = "both"; // Clear float
      div_user.style.marginTop = "10px";
      div_user.style.marginBottom = "10px";
      div_user.style.maxWidth = "80%";
      div_user.style.overflowWrap = "break-word";

      div_user.innerText = inputValue;

      let userTimestamp = document.createElement("span");
      
      userTimestamp.style.fontSize = "10px";
      userTimestamp.style.marginRight = "0px";
      userTimestamp.style.float = "right"
      userTimestamp.innerText = getCurrentTime();

      let userIcon = document.createElement("i");
      userIcon.className = "fas fa-user";
      userIcon.style.borderRadius = "10px";
      userIcon.style.float = "right";
      userIcon.style.clear = "both"; // Clear float
      userIcon.style.marginTop = "10px";
      userIcon.style.marginBottom = "10px";


      div_user.appendChild(document.createElement("br"));
      div_user.appendChild(userTimestamp);
      div1.appendChild(userIcon);
      div1.appendChild(div_user);
      responseArea.appendChild(div1);
     
      const chat_bot_response = await response.data.response;
      console.log(chat_bot_response);


//chatbot message section
      let div2 = document.createElement("div")

      let div_chat = document.createElement("div");
      div_chat.style.padding = "5px 10px";
      div_chat.style.borderRadius = "10px";
      div_chat.style.backgroundColor = "#e6e6e6";
      div_chat.style.color = "#333";
      div_chat.style.float = "left";
      div_chat.style.clear = "both"; // Clear float
      div_chat.style.marginTop = "10px";
      div_chat.style.marginBottom = "10px";
      div_chat.style.maxWidth = "80%";
      div_chat.style.overflowWrap = "break-word";

      div_chat.innerText = chat_bot_response;

      let chatTimeStamp = document.createElement("span");
      chatTimeStamp.style.fontSize = "10px";
      chatTimeStamp.style.marginLeft = "0px";

      let chatbotIcon = document.createElement("i");
      chatbotIcon.className = "fas fa-robot";
      chatbotIcon.style.borderRadius = "10px";
      chatbotIcon.style.float = "left";
      chatbotIcon.style.clear = "both"; // Clear float
      chatbotIcon.style.marginTop = "10px";
      chatbotIcon.style.marginBottom = "10px";

      chatTimeStamp.innerText = getCurrentTime();
      div_chat.appendChild(br);
      div_chat.appendChild(chatTimeStamp);
      div2.appendChild(chatbotIcon);
      div2.appendChild(div_chat);
      responseArea.appendChild(div2);


    } catch (error) {
      toast.error("ChatBot is currently unavailable!", {
        position: "top-center",
        autoClose: 2000,
      });
    }

    document.getElementById("input").value = "";
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div
      id="chatbotInterface"
      style={{
        //position: "absolute",
        top: "0px",
        left: "0px",
        width: "400px",
        height: "500px",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0px 0px 10px #ccc",
        display: "flex",
        flexDirection: "column",
        position: isChatbotDocked ? "static" : "absolute",
        bottom: isChatbotDocked ? "auto" : "auto",
        right: isChatbotDocked ? "auto" : "auto",
      }}
    >

      <div
        id="chatbotHeader"
        style={{
          cursor: "move",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#b64902",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h4 style={{ color: "white" }}>Chatbot</h4>
        {/* buttons */}
        <div style={{marginLeft:"auto", float: "right"}}>
          {isChatbotDocked ? (
            <button onClick={handleToggleDock}>Undock</button>
          ) : (
            <button onClick={handleToggleDock}>Dock</button>
          )}
          <button style={{width:"25px"}} onClick={handleToggleMinimize}>
            {isChatbotMinimized ? "+" : "-"}
          </button>
          <button style={{width:"25px"}} onClick={onClose}>X</button>
        </div>
      </div>

        <div style={{ flex: 1, overflowY: "scroll", padding: "10px" }}>
          <Container fluid>
            <Row>
              <Col xs={12}>
                <div id="response-area">
                  <h6 style={{textAlign:"center"}}>Ask me anything!</h6>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div
          style={{
            flex: "0 0 auto",
            borderTop: "1px solid #ccc",
            padding: "10px",
            backgroundColor: "#b64902",
          }}
        >
          <Container fluid>
            <Row>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  id="input"
                  placeholder="Type your message..."
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={3}>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleMessageSubmit}
                  style={{ backgroundColor: "white", color: "black", width: "70px" }}
                >
                  Send
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      <ToastContainer />
    </div>
  );
}

export default ChatbotInterface;
