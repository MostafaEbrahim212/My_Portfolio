import React, { useRef, useState, useEffect } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Eraser, Download } from 'lucide-react';
import { startPencilSound, stopPencilSound, playPopSound } from '../../utils/audio';

export function DoodlePad({ title, subtitle, clearText }: { title: string, subtitle: string, clearText: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 4;
        setCtx(context);
      }
    }
    
    const handleResize = () => {
      if (canvas && ctx) {
        // Save current canvas content
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        // Restore context settings and image data
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 4;
        ctx.putImageData(imageData, 0, 0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      stopPencilSound(); // Cleanup sound
    };
  }, [ctx]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    startPencilSound();
    draw(e);
  };

  const endDrawing = () => {
    if (isDrawing) {
      stopPencilSound();
    }
    setIsDrawing(false);
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Use current pencil color from CSS variable
    const computedStyle = getComputedStyle(document.body);
    ctx.strokeStyle = computedStyle.getPropertyValue('--text-primary').trim() || '#2d2d2d';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    playPopSound();
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.beginPath();
    }
  };

  const downloadCanvas = () => {
    playPopSound();
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    // Fill background with current paper color
    const computedStyle = getComputedStyle(document.body);
    const paperColor = computedStyle.getPropertyValue('--bg-primary').trim() || '#fdfbf7';
    tempCtx.fillStyle = paperColor;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    // Draw the doodle on top
    tempCtx.drawImage(canvas, 0, 0);
    
    const dataUrl = tempCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'my-vibe-doodle.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="flex flex-col h-[400px] relative overflow-hidden bg-paper" decoration="tape">
      <div className="absolute top-4 left-6 z-10 pointer-events-none">
        <h3 className="text-2xl font-kalam text-pencil mb-1">{title}</h3>
        <p className="text-sm text-pencil/60">{subtitle}</p>
      </div>
      
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={endDrawing}
        onTouchCancel={endDrawing}
        onTouchMove={draw}
        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
      />
      
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <Button 
          variant="secondary" 
          onClick={downloadCanvas}
          className="flex items-center gap-2 text-sm px-3 py-1 bg-paper"
          title="Download Doodle"
        >
          <Download size={16} /> 
        </Button>
        <Button 
          variant="secondary" 
          onClick={clearCanvas}
          className="flex items-center gap-2 text-sm px-3 py-1 bg-paper"
        >
          <Eraser size={16} /> <span className="hidden sm:inline">{clearText}</span>
        </Button>
      </div>
    </Card>
  );
}
