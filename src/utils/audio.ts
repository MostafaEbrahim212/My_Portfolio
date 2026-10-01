export function playPopSound() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // ignore
  }
}

export function playPaperSound() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    
    // Create white noise for paper crumple
    const bufferSize = ctx.sampleRate * 0.2; // 0.2 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    // Filter the noise to sound more like paper (high pass)
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start(ctx.currentTime);
  } catch (e) {
    // ignore
  }
}

// Global variables for continuous pencil glide sound
let chalkCtx: AudioContext | null = null;
let chalkNoise: AudioBufferSourceNode | null = null;
let chalkGain: GainNode | null = null;

export function startPencilSound() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    if (!chalkCtx) {
      chalkCtx = new AudioContext();
    }
    
    // Create white noise for a soft texture
    const bufferSize = chalkCtx.sampleRate * 2;
    const buffer = chalkCtx.createBuffer(1, bufferSize, chalkCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    chalkNoise = chalkCtx.createBufferSource();
    chalkNoise.buffer = buffer;
    chalkNoise.loop = true;
    
    // Lowpass filter to make it sound warm, soft, and completely non-annoying (like ASMR pencil shading)
    const filter = chalkCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400; // Removes all harsh frequencies
    filter.Q.value = 0.5;
    
    // Very gentle volume controller
    chalkGain = chalkCtx.createGain();
    chalkGain.gain.setValueAtTime(0, chalkCtx.currentTime);
    chalkGain.gain.linearRampToValueAtTime(0.08, chalkCtx.currentTime + 0.1); // Extremely quiet

    chalkNoise.connect(filter);
    filter.connect(chalkGain);
    chalkGain.connect(chalkCtx.destination);
    
    chalkNoise.start();
  } catch (e) {
    // ignore
  }
}

export function stopPencilSound() {
  try {
    if (chalkGain && chalkCtx) {
      chalkGain.gain.linearRampToValueAtTime(0, chalkCtx.currentTime + 0.05);
      if (chalkNoise) {
        chalkNoise.stop(chalkCtx.currentTime + 0.1);
      }
    }
  } catch (e) {
    // ignore
  }
}

export function playTypingSound() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const bufferSize = ctx.sampleRate * 0.05; // 50ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.01)); // decay
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    const gain = ctx.createGain();
    gain.gain.value = 0.05;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  } catch (e) {}
}
