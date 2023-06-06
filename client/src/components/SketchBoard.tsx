import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changeTool } from '@utils/Tool';

const SketchBoard: React.FC = () => {
  const [lines, setLines] = useState<any[]>([]);
  const [tool, setTool] = useState<string>('pencil');
  const [currentColor, setCurrentColor] = useState<string>('black');
  const [size, setSize] = useState<number>(3);

  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (event: any) => {
    isDrawing.current = true;
    const { x, y } = event.target.getStage().getPointerPosition();
    setLines([...lines, { tool, color: currentColor, points: [x, y], size }]);
  };

  const handleMouseMove = (event: any) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = event.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleColorChange = (color: string) => {
    setTool('pen');
    setCurrentColor(color);
  };

  const handleCleanAll = () => {
    setLines([]);
  };

  const handleSizeUp = () => {
    setSize((prevSize) => prevSize + 1);
  };
  const handleSizeDown = () => {
    if (size === 1) {
      toast('더 이상 작게 할 수 없습니다.');
    } else {
      setSize((prevSize) => prevSize - 1);
    }
  };

  const handleChangeTool = (e: any) => {
    setTool(e.target.value);
  };
  useEffect(() => {
    changeTool(tool);
  }, [tool]);
  return (
    <div>
      <ToastContainer />
      <div>
        <button onClick={handleCleanAll}>초기화</button>
        <button onClick={() => handleColorChange('black')}>Black</button>
        <button onClick={() => handleColorChange('red')}>Red</button>
        <button onClick={() => handleColorChange('blue')}>Blue</button>
        <button onClick={() => handleColorChange('green')}>Green</button>
        <button onClick={handleSizeUp}>+</button>
        <button onClick={handleSizeDown}>-</button>
        <select value={tool} onChange={(e) => handleChangeTool(e)}>
          <option value="felt-tip">Felt-Tip</option>
          <option value="brush">Brush</option>
          <option value="pencil">Pencil</option>
          <option value="eraser">Eraser</option>
        </select>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {lines.map((line: any, i: number) => {
            const toolSettings = changeTool(line?.tool);
            return (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.size}
                tension={0.5}
                shadowBlur={toolSettings.shadowBlur}
                lineCap={toolSettings.lineCap}
                lineJoin={toolSettings.lineJoin}
                globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default SketchBoard;
