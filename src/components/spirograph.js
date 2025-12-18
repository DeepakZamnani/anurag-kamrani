import React, { useEffect, useRef, useState } from 'react';

const LetterADrawer = () => {
  const movingCanvasRef = useRef(null);
  const plottingCanvasRef = useRef(null);
  const imageCanvasRef = useRef(null);
  const isMountedRef = useRef(true);
  const animationRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    const movingCanvas = movingCanvasRef.current;
    const plottingCanvas = plottingCanvasRef.current;
    const imageCanvas = imageCanvasRef.current;
    
    if (!movingCanvas || !plottingCanvas || !imageCanvas) return;

    const mctx = movingCanvas.getContext('2d');
    const pctx = plottingCanvas.getContext('2d');
    const ictx = imageCanvas.getContext('2d');

    // Config
    const dotSize = 8;
    const drawColor = '#1F2937';
    const circleColor = '#9CA3AF';
    const lowSpeed = 0.018;
    const highSpeed = 0.08;
    const lineWidth = 2.5;
    let speed = lowSpeed;

    // Animation state
    let progress = 0;
    let currentSegment = 0;
    let lastX = 0;
    let lastY = 0;

    const setCanvasSize = () => {
      const canvasSize = Math.min(1000, window.innerWidth / 1.4 + 2, window.innerHeight / 1.4 + 2);
      movingCanvas.width = canvasSize;
      movingCanvas.height = canvasSize;
      plottingCanvas.width = canvasSize;
      plottingCanvas.height = canvasSize;
      imageCanvas.width = canvasSize;
      imageCanvas.height = canvasSize;
    };

    const getLetterPath = (canvas) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = Math.min(498, Math.min(window.innerWidth / 2.8, window.innerHeight / 2.8));
      const scale = size * 0.65;
      const offsetY = size * 0.05;

      return {
        centerX,
        centerY,
        size,
        segments: [
          [
            { x: centerX - scale * 0.45, y: centerY + scale * 0.55 - offsetY },
            { x: centerX, y: centerY - scale * 0.55 - offsetY }
          ],
          [
            { x: centerX, y: centerY - scale * 0.55 - offsetY },
            { x: centerX + scale * 0.45, y: centerY + scale * 0.55 - offsetY }
          ],
          [
            { x: centerX - scale * 0.28, y: centerY + scale * 0.05 - offsetY },
            { x: centerX + scale * 0.28, y: centerY + scale * 0.05 - offsetY }
          ]
        ]
      };
    };

    const initDrawing = () => {
      const { centerX, centerY, size, segments } = getLetterPath(movingCanvas);
      
      setShowImage(false);
      mctx.clearRect(0, 0, movingCanvas.width, movingCanvas.height);
      pctx.clearRect(0, 0, plottingCanvas.width, plottingCanvas.height);
      ictx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

      // Draw outer circle
      pctx.strokeStyle = circleColor;
      pctx.lineWidth = lineWidth;
      pctx.beginPath();
      pctx.arc(centerX, centerY, size, 0, 2 * Math.PI);
      pctx.stroke();

      mctx.lineWidth = lineWidth;
      mctx.strokeStyle = circleColor;
      pctx.strokeStyle = drawColor;
      pctx.lineCap = 'round';
      pctx.lineJoin = 'round';

      progress = 0;
      currentSegment = 0;
      
      // Initialize last position
      const [start] = segments[0];
      lastX = start.x;
      lastY = start.y;
    };

    const draw = () => {
      if (!isMountedRef.current) return;

      const { segments } = getLetterPath(movingCanvas);

      // Clear moving canvas
      mctx.clearRect(0, 0, movingCanvas.width, movingCanvas.height);

      if (currentSegment >= segments.length) {
        // Drawing complete - draw person image
        const { centerX, centerY, size } = getLetterPath(imageCanvas);
        
        ictx.save();
        ictx.beginPath();
        ictx.arc(centerX, centerY, size, 0, 2 * Math.PI);
        ictx.clip();
        
        // ============================================
        // 🎯 ADD YOUR IMAGE URL HERE:
        // ============================================
        const YOUR_IMAGE_URL = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800';
        // Replace the URL above with your own image URL
        // ============================================
        
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          // Draw image filling the circle
          const imgSize = size * 2;
          const imgX = centerX - size;
          const imgY = centerY - size;
          ictx.drawImage(img, imgX, imgY, imgSize, imgSize);
          ictx.restore();
          
          // Show the image canvas
          setShowImage(true);
          
          // Wait and restart
          setTimeout(() => {
            if (isMountedRef.current) {
              initDrawing();
              animationRef.current = requestAnimationFrame(draw);
            }
          }, 4000);
        };
        
        img.onerror = () => {
          // Fallback: Draw person silhouette if image fails
          ictx.fillStyle = '#E5E7EB';
          ictx.fillRect(centerX - size, centerY - size, size * 2, size * 2);
          
          ictx.fillStyle = '#9CA3AF';
          ictx.beginPath();
          ictx.arc(centerX, centerY - size * 0.25, size * 0.15, 0, 2 * Math.PI);
          ictx.fill();
          
          ictx.beginPath();
          ictx.ellipse(centerX, centerY + size * 0.15, size * 0.4, size * 0.5, 0, 0, 2 * Math.PI);
          ictx.fill();
          
          ictx.restore();
          setShowImage(true);
          
          setTimeout(() => {
            if (isMountedRef.current) {
              initDrawing();
              animationRef.current = requestAnimationFrame(draw);
            }
          }, 4000);
        };
        
        img.src = YOUR_IMAGE_URL;
        
        return;
      }

      // Calculate current position
      const [start, end] = segments[currentSegment];
      const currentX = start.x + (end.x - start.x) * progress;
      const currentY = start.y + (end.y - start.y) * progress;

      // Draw the line incrementally on plotting canvas
      pctx.beginPath();
      pctx.moveTo(lastX, lastY);
      pctx.lineTo(currentX, currentY);
      pctx.stroke();

      // Update last position
      lastX = currentX;
      lastY = currentY;

      // Draw moving dot
      mctx.fillStyle = drawColor;
      mctx.beginPath();
      mctx.arc(currentX, currentY, dotSize, 0, 2 * Math.PI);
      mctx.fill();

      // Draw guide circle around dot
      mctx.strokeStyle = circleColor;
      mctx.lineWidth = 1.5;
      mctx.beginPath();
      mctx.arc(currentX, currentY, dotSize * 2.2, 0, 2 * Math.PI);
      mctx.stroke();

      // Update progress
      progress += speed;
      if (progress >= 1) {
        progress = 0;
        currentSegment++;
        if (currentSegment < segments.length) {
          const [nextStart] = segments[currentSegment];
          lastX = nextStart.x;
          lastY = nextStart.y;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const speedUp = () => { 
      speed = highSpeed;
      setIsPressed(true);
    };
    const speedDown = () => { 
      speed = lowSpeed;
      setIsPressed(false);
    };

    const handleResize = () => {
      setCanvasSize();
      initDrawing();
    };

    setCanvasSize();
    initDrawing();
    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', handleResize);
    const movingCanvasElement = movingCanvas;
    movingCanvasElement.addEventListener('mousedown', speedUp);
    movingCanvasElement.addEventListener('mouseup', speedDown);
    movingCanvasElement.addEventListener('mouseleave', speedDown);
    movingCanvasElement.addEventListener('touchstart', speedUp);
    movingCanvasElement.addEventListener('touchend', speedDown);

    return () => {
      isMountedRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      movingCanvasElement.removeEventListener('mousedown', speedUp);
      movingCanvasElement.removeEventListener('mouseup', speedDown);
      movingCanvasElement.removeEventListener('mouseleave', speedDown);
      movingCanvasElement.removeEventListener('touchstart', speedUp);
      movingCanvasElement.removeEventListener('touchend', speedDown);
    };
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#F9FAFB'
    }}>
      <div style={{
        cursor: isPressed ? 'grabbing' : 'grab',
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.1s ease',
        transform: isPressed ? 'scale(0.98)' : 'scale(1)'
      }}>
        <canvas ref={plottingCanvasRef} />
      </div>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: showImage ? 1 : 0,
        transition: 'opacity 1.5s ease-in',
        pointerEvents: 'none'
      }}>
        <canvas ref={imageCanvasRef} />
      </div>
      <div style={{
        cursor: isPressed ? 'grabbing' : 'grab',
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.1s ease',
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        pointerEvents: 'auto'
      }}>
        <canvas ref={movingCanvasRef} />
      </div>
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#6B7280',
        fontSize: '14px',
        fontWeight: '500',
        letterSpacing: '0.5px',
        opacity: isPressed ? 0.5 : 1,
        transition: 'opacity 0.3s ease',
        userSelect: 'none'
      }}>
        {isPressed ? '' : 'Click & Hold to Speed Up'}
      </div>
    </div>
  );
};

export default LetterADrawer;