import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

const SketchBoard: React.FC = () => {
  const [lines, setLines] = useState<any[]>([]);
  const [tool, setTool] = React.useState('pen');
  const [currentColor, setCurrentColor] = useState<string>('black');
  const isDrawing = useRef<boolean>(false);
  const linesRef = useRef<any[]>([]);

  const handleMouseDown = (event: any) => {
    isDrawing.current = true;
    const { x, y } = event.target.getStage().getPointerPosition();
    linesRef.current.push({
      points: [x, y],
      color: currentColor,
      tool,
    });
  };

  const handleMouseMove = (event: any) => {
    if (!isDrawing.current) return;
    const { x, y } = event.target.getStage().getPointerPosition();
    console.log(x, y);
    const newLines = [...linesRef.current];
    const lastLine = newLines[newLines.length - 1];

    lastLine.points = lastLine.points.concat([x, y]);
    newLines.splice(newLines.length - 1, 1, lastLine);
    setLines(newLines);
    linesRef.current = newLines;
    console.log(lines);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleColorChange = (color: string) => {
    setTool('pen');
    setCurrentColor(color);
  };

  const handleCleanAll = () => {
    linesRef.current = [];
    setLines([]);
  };

  const handleCleanSelect = () => {
    // setIsErasing(true);
    // lines[0].mode = 'erase';
    // console.log(lines);
    setTool('eraser');
  };

  useEffect(() => {
    return () => {
      isDrawing.current = false;
    };
  }, []);

  return (
    <div>
      <div>
        <button onClick={handleCleanSelect}>지우개</button>
        <button onClick={handleCleanAll}>초기화</button>
        <button onClick={() => handleColorChange('black')}>Black</button>
        <button onClick={() => handleColorChange('red')}>Red</button>
        <button onClick={() => handleColorChange('blue')}>Blue</button>
        <button onClick={() => handleColorChange('green')}>Green</button>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {lines.map((line: any, i: number) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default SketchBoard;
