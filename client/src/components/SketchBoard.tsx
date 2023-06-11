import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import 'react-toastify/dist/ReactToastify.css';
import { changeTool } from '@utils/Tool';
import ColorPicker from './ColorPicker';
import * as Styled from '@/styles/SketchBoard.styles';

const SketchBoard: React.FC = () => {
  const [lines, setLines] = useState<any[]>([]);
  const [tool, setTool] = useState<string>('pencil');
  const [currentColor, setCurrentColor] = useState<string>('#000000');
  const [size, setSize] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenPicker = () => {
    setOpen((prev) => !prev);
  };

  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (event: any) => {
    setOpen(false);
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
    setCurrentColor(color);
  };

  const handleCleanAll = () => {
    setLines([]);
  };

  const handleSizeUp = () => {
    setSize((prevSize) => prevSize + 1);
  };
  const handleSizeDown = () => {
    setSize((prevSize) => prevSize - 1);
  };

  const handleChangeTool = (e: any) => {
    setTool(e.target.value);
  };
  useEffect(() => {
    changeTool(tool);
  }, [tool]);
  return (
    <Styled.Container>
      {/* <ToastContainer />  */}
      <Styled.ToolBar>
        <Styled.Button onClick={handleCleanAll}>초기화</Styled.Button>
        <Styled.Button onClick={() => handleColorChange('black')}>Black</Styled.Button>
        <Styled.Button onClick={() => handleColorChange('red')}>Red</Styled.Button>
        <Styled.Button onClick={() => handleColorChange('blue')}>Blue</Styled.Button>
        <Styled.Button onClick={() => handleColorChange('green')}>Green</Styled.Button>
        <Styled.Button onClick={handleSizeUp}>+</Styled.Button>
        <Styled.Button onClick={handleSizeDown}>-</Styled.Button>
        <select value={tool} onChange={(e) => handleChangeTool(e)}>
          <option value="felt-tip">Felt-Tip</option>
          <option value="brush">Brush</option>
          <option value="pencil">Pencil</option>
          <option value="eraser">Eraser</option>
        </select>
        <ColorPicker
          setCurrentColor={setCurrentColor}
          currentColor={currentColor}
          handleColorChange={handleColorChange}
          open={open}
          handleOpenPicker={handleOpenPicker}
        />
      </Styled.ToolBar>
      <Stage
        className="board"
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
                strokeWidth={toolSettings.lineWidth + line.size}
                tension={0.5}
                shadowBlur={toolSettings.shadowBlur}
                lineCap={toolSettings.lineCap}
                lineJoin={toolSettings.lineJoin}
                globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                fill="red"
              />
            );
          })}
        </Layer>
      </Stage>
    </Styled.Container>
  );
};

export default SketchBoard;
