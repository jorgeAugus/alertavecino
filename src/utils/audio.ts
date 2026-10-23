// Web Audio API Synthesizer for tactile emergency feedback and radio tones

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playTone = (freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.15) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.debug('Audio not allowed yet:', err);
  }
};

export const playRadioChirp = () => {
  // Police radio squelch/beep
  playTone(880, 0.08, 'sine', 0.2);
  setTimeout(() => playTone(1200, 0.08, 'sine', 0.2), 80);
  setTimeout(() => playTone(1760, 0.12, 'square', 0.1), 160);
};

export const playTick = () => {
  playTone(600, 0.05, 'triangle', 0.1);
};

export const playSuccessChime = () => {
  playTone(523.25, 0.1, 'sine', 0.2);
  setTimeout(() => playTone(659.25, 0.1, 'sine', 0.2), 100);
  setTimeout(() => playTone(783.99, 0.2, 'sine', 0.2), 200);
};

export const playWarningBeep = () => {
  playTone(440, 0.15, 'sawtooth', 0.2);
  setTimeout(() => playTone(440, 0.15, 'sawtooth', 0.2), 200);
};

export const playCameraSnap = () => {
  playTone(1800, 0.04, 'highpass' as unknown as OscillatorType, 0.3);
  setTimeout(() => playTone(800, 0.06, 'triangle', 0.2), 50);
};

// Siren loop controller
let sirenInterval: NodeJS.Timeout | null = null;

export const startSiren = () => {
  if (sirenInterval) return;
  let high = true;
  sirenInterval = setInterval(() => {
    playTone(high ? 960 : 770, 0.25, 'sawtooth', 0.25);
    high = !high;
  }, 280);
};

export const stopSiren = () => {
  if (sirenInterval) {
    clearInterval(sirenInterval);
    sirenInterval = null;
  }
};
