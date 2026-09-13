import { useMemo } from 'react';

interface StarFieldProps {
  count?: number;
  className?: string;
}

interface Particle {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
}

export default function StarField({ count = 28, className = '' }: StarFieldProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.4 + 0.8,     // 0.8px to 2.2px — refined starry dots
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 4}s`,
      opacity: Math.random() * 0.35 + 0.2, // 0.2 to 0.55 opacity — visible yet atmospheric
    }));
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-lavender-300 animate-twinkle"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
