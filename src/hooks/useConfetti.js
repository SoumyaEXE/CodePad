import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export function useConfetti() {
  const fire = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.3 },
      colors: ["#4F46E5", "#818CF8", "#C7D2FE", "#A5B4FC"],
      scalar: 0.9
    });
  }, []);

  return fire;
}
