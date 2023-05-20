import React, { useEffect, useContext } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { playAudioBuffer } from "../../../utils/audioHelper";
import { SocketContext } from "../../../context";

export function VoiceChatPage() {
  const { sendMessage, audioResponse } = useContext(SocketContext);

  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (audioResponse) {
      const binaryAudioBuffer = audioResponse.audio;

      playAudioBuffer(binaryAudioBuffer)
        .finally(() => {
          resetTranscript();
          SpeechRecognition.startListening();
        })
    }
  }, [audioResponse])

  useEffect(() => {
    if (finalTranscript && finalTranscript.length > 0) {
      sendMessage(finalTranscript);
    }
  }, [finalTranscript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="p-VoiceChatPage__container">
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{`Interim Transcript: ${transcript}`}</p>
      <p>{`Final Transcript: ${finalTranscript}`}</p>
    </div>
  );
}