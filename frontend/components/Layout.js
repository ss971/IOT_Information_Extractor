import { useEffect, useRef } from 'react';
import { teamInfoStyle, canvasStyle } from '../constants/styles';

export const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const rainDrops = Array(columns).fill(1);
    const katakana = 'アァカサタナハマヤャラワガザダバパ';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    }

    const intervalId = setInterval(draw, 30);
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={canvasStyle} />;
};

export const TeamInfo = ({ teamText }) => (
  <div style={teamInfoStyle}>
    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
      {teamText}
      <span style={{
        animation: 'blink 1s infinite',
        opacity: 1,
        marginLeft: '2px',
        borderLeft: '2px solid #0f0'
      }}></span>
    </pre>
  </div>
);