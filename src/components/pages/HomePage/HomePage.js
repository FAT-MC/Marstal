import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { sendMessage } from "../../../api";
import { playAudioBuffer } from "../../../utils";
import { SocketContext } from "../../../context"
import "./HomePage.css";

export function HomePage() {
  const navigate = useNavigate();
  const { sendMessage, audioResponse } = useContext(SocketContext);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (audioResponse) {
      const binaryAudioBuffer = audioResponse.audioData;
      playAudioBuffer(binaryAudioBuffer)
        .finally(() => {
          setInputText("")
        })
    }
  }, [audioResponse])

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