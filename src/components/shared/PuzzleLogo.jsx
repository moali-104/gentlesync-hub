import { useState } from 'react'

export default function PuzzleLogo({ size = 64, animate = true, isLoading = false, className = '' }) {
  const [clickSpin, setClickSpin] = useState(false)

  const handleClick = () => {
    if (!clickSpin && !isLoading) {
      setClickSpin(true)
      setTimeout(() => setClickSpin(false), 2500) // Duration matches the animation time
    }
  }

  // Determine which CSS class to apply based on state
  let animationClass = 'drop-shadow-md'
  if (isLoading) {
    animationClass = 'puzzle-logo-loading'
  } else if (clickSpin) {
    animationClass = 'puzzle-logo-click-spin'
  } else if (animate) {
    animationClass = 'puzzle-logo-3d-animated'
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onClick={handleClick}
    >
      <style>{`
        @keyframes puzzle-spin-3d {
          0% { transform: perspective(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1); }
          25% { transform: perspective(400px) rotateX(15deg) rotateY(25deg) rotateZ(5deg) scale(1.05); }
          50% { transform: perspective(400px) rotateX(-10deg) rotateY(-20deg) rotateZ(-5deg) scale(0.95); }
          75% { transform: perspective(400px) rotateX(20deg) rotateY(-15deg) rotateZ(8deg) scale(1.02); }
          100% { transform: perspective(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1); }
        }
        
        @keyframes puzzle-click-spin {
          0% { transform: perspective(400px) rotateZ(0deg) scale(1); }
          50% { transform: perspective(400px) rotateZ(900deg) scale(1.2); }
          100% { transform: perspective(400px) rotateZ(1800deg) scale(1); }
        }

        @keyframes puzzle-loading-spin {
          0% { transform: perspective(400px) rotateY(0deg); }
          100% { transform: perspective(400px) rotateY(360deg); }
        }
        
        .puzzle-logo-3d-animated {
          animation: puzzle-spin-3d 8s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
        }
        
        .puzzle-logo-3d-animated:hover {
          animation-play-state: paused;
          transform: scale(1.1) rotateY(10deg);
          transition: transform 0.3s ease;
        }

        .puzzle-logo-click-spin {
          animation: puzzle-click-spin 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          transform-style: preserve-3d;
          will-change: transform;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.3));
        }

        .puzzle-logo-loading {
          animation: puzzle-loading-spin 1s linear infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
      `}</style>
      <div
        className={animationClass}
        style={{ width: '100%', height: '100%' }}
      >
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <g>
            {/* Top-Left (Light Blue) */}
            <path d="M 20 20 L 60 20 L 60 34 C 64 34, 72 32, 72 40 C 72 48, 64 46, 60 46 L 60 60 L 46 60 C 46 64, 48 72, 40 72 C 32 72, 34 64, 34 60 L 20 60 Z" fill="#5ce1e6" />
            {/* Top-Left Shine */}
            <path d="M 28 40 C 28 28, 30 28, 40 28" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8" />
            {/* Top-Right (Dark Teal) */}
            <path d="M 60 20 L 100 20 L 100 34 C 104 34, 112 32, 112 40 C 112 48, 104 46, 100 46 L 100 60 L 86 60 C 86 64, 88 72, 80 72 C 72 72, 74 64, 74 60 L 60 60 L 60 46 C 64 46, 72 48, 72 40 C 72 32, 64 34, 60 34 Z" fill="#0c8e9b" />
            {/* Bottom-Left (Red) */}
            <path d="M 20 60 L 34 60 C 34 64, 32 72, 40 72 C 48 72, 46 64, 46 60 L 60 60 L 60 74 C 64 74, 72 72, 72 80 C 72 88, 64 86, 60 86 L 60 100 L 46 100 C 46 104, 48 112, 40 112 C 32 112, 34 104, 34 100 L 20 100 L 20 86 C 16 86, 8 88, 8 80 C 8 72, 16 74, 20 74 Z" fill="#f94144" />
            {/* Bottom-Right (Yellow) */}
            <path d="M 60 60 L 74 60 C 74 64, 72 72, 80 72 C 88 72, 86 64, 86 60 L 100 60 L 100 100 L 60 100 L 60 86 C 64 86, 72 88, 72 80 C 72 72, 64 74, 60 74 Z" fill="#f9c74f" />
          </g>
        </svg>
      </div>
    </div>
  )
}
