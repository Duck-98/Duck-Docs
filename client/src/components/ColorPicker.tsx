import React, { useEffect, useRef } from 'react';
import { Group, Rect, Stage } from 'react-konva';

interface ColorSquareType {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  onClick: (color: string) => void;
}

interface ColorPickerType {
  x: number;
  y: number;
  width: number;
  height: number;
  colors: string[];
  onChange: any;
}

function ColorSquare({ x, y, width, height, color, onClick }: ColorSquareType) {
  const shapeRef = useRef<any>(null);
  const shape = shapeRef.current;

  const handleMouseEnter = () => {
    const stage = shape.getStage();
    stage.container().style.cursor = 'pointer';
  };

  const handleMouseLeave = () => {
    const stage = shape.getStage();
    stage.container().style.cursor = 'default';
  };

  const handleClick = () => {
    onClick(color);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleClick}
      onMouseMove={handleMouseEnter}
      onMouseUp={handleMouseLeave}
    >
      <Rect x={x} y={y} width={width} height={height} fill={color} ref={shapeRef} />
    </Stage>
  );
}

export default function ColorsPicker({ x, y, width, height, colors, onChange }: ColorPickerType) {
  return (
    <Group x={x} y={y}>
      {colors.map((color, idx) => (
        <ColorSquare
          key={colors[idx]}
          x={0}
          y={idx * height}
          width={width}
          height={height}
          color={colors[idx]}
          onClick={onChange}
        />
      ))}
    </Group>
  );
}
