const playAudioBuffer = async (binaryAudioBuffer) => {
  const audioContext = new AudioContext();
  const audio = await audioContext.decodeAudioData(binaryAudioBuffer);
  const source = audioContext.createBufferSource();
  source.buffer = audio;
  source.connect(audioContext.destination);
  source.start(0)
}

export { playAudioBuffer }