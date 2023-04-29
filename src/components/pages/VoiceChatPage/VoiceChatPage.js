import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { playAudioBuffer } from "../../../utils";
import { receiveMessage, sendMessage } from "../../../service/socketService";

export function VoiceChatPage() {
  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    receiveMessage((aiAudioResponse) => {
      const binaryAudioBuffer = aiAudioResponse.audioData;

      playAudioBuffer(binaryAudioBuffer)
        .finally(() => {
          resetTranscript();
          SpeechRecognition.startListening();
        })
    })
  }, [])

  useEffect(() => {
    if (finalTranscript && finalTranscript.length > 0) {
      //
      console.log(`Sending message to AI: ${finalTranscript}`)
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