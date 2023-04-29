import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { sendMessage } from "../../../api";
import { playAudioBuffer } from "../../../utils";
import { receiveMessage, sendMessage } from "../../../service/socketService";
import "./HomePage.css";

export function HomePage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    receiveMessage((aiAudioResponse) => {
      const binaryAudioBuffer = aiAudioResponse.audioData;
      playAudioBuffer(binaryAudioBuffer)
        .finally(() => {
          setInputText("")
        })
    })
  }, [])

  const onTextChange = (e) => {
    setInputText(e.target.value)
  }

  const onSpeakClick = () => {
    sendMessage(inputText)
  }

  return (
    <div className="p-HomePage__container">
      <input type="text" value={inputText} onChange={onTextChange} />
      <button onClick={onSpeakClick}>speak</button>
      <button onClick={() => navigate("/voice")}>Voice Chat</button>
    </div>
  )
}