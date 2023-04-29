const playAudioBuffer = async (binaryAudioBuffer) => {
  const audioContext = new AudioContext();
  const buffer = await audioContext.decodeAudioData(binaryAudioBuffer);
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);

  await new Promise((resolve) => {
    source.addEventListener('ended', resolve);
    source.start();
  });

}

export { playAudioBuffer }