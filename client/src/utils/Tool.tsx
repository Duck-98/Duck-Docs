interface ToolSettings {
  lineCap: 'round' | 'butt' | 'square';
  lineJoin: 'round' | 'bevel' | 'miter';
  shadowBlur: number;
  lineWidth: number;
  globalCompositeOperation: 'source-over' | 'destination-out';
}

export const changeTool = (tool: string): ToolSettings => {
  switch (tool) {
    case 'felt-tip':
      return {
        lineCap: 'round',
        lineJoin: 'round',
        lineWidth: 5,
        shadowBlur: 1,
        globalCompositeOperation: 'source-over',
      };
    case 'brush':
      return {
        lineCap: 'round',
        lineJoin: 'round',
        lineWidth: 8,
        shadowBlur: 7,
        globalCompositeOperation: 'source-over',
      };
    case 'pencil':
      return {
        lineCap: 'butt',
        lineJoin: 'miter',
        lineWidth: 1,
        shadowBlur: 0,
        globalCompositeOperation: 'source-over',
      };
    case 'eraser':
      return {
        lineCap: 'round',
        lineJoin: 'round',
        lineWidth: 10,
        shadowBlur: 0,
        globalCompositeOperation: 'destination-out',
      };
    default:
      return {
        lineCap: 'round',
        lineJoin: 'round',
        lineWidth: 1,
        shadowBlur: 0,
        globalCompositeOperation: 'source-over',
      };
  }
};
