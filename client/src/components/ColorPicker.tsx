import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ChromePicker } from 'react-color';

interface ColorPickerProps {
  open: boolean;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  currentColor: string;
  handleColorChange: (color: string) => void;
  handleOpenPicker: () => void;
}

const ColorPicker = ({
  setCurrentColor,
  currentColor,
  handleColorChange,
  open,
  handleOpenPicker,
}: ColorPickerProps) => {
  //   const [open, setOpen] = useState<boolean>(false);

  //   const handleOpenPicker = () => {
  //     setOpen((prev) => !prev);
  //     console.log(open);
  //   };

  useEffect(() => {
    if (!currentColor) {
      setCurrentColor('');
    }
    setCurrentColor(currentColor);
  }, [currentColor]);

  return (
    <>
      <Box>
        {/* <Input value={currentColor} onChange={(e) => handleColorChange(e.target.value)} /> */}
        <Color color={currentColor} onClick={handleOpenPicker}></Color>
        <PickerContainer open={open}>
          <ChromePicker
            className="picker"
            color={currentColor}
            onChange={(currentColor) => handleColorChange(currentColor.hex)}
          />
        </PickerContainer>
      </Box>
    </>
  );
};

export default ColorPicker;

const Color = styled.div`
  background: ${(props) => props.color || 'black'};
  height: 40px;
  width: 40px;
  border-radius: 6px;
`;

const PickerContainer = styled.div<{ open: boolean }>`
  position: absolute;
  top: 60%;
  left: 80px;
  z-index: 100;

  ${({ open }) =>
    open
      ? css`
          display: block;
          opacity: 1;
          transition: all 0.1s ease-in-out;
        `
      : css`
          display: none;
          opacity: 0;
          transition: all 0.3s ease-in-out;
        `};
`;

const Box = styled.div`
  padding: 8px;
`;

const Input = styled.input`
  border-radius: 14px;
  height: 58px;
  padding: 0 21px;
  font-size: 16px;
  transition: box-shadow 0.1s;
  box-shadow: inset #d8d8da 0 0 0 1px, inset white 0 0 0 100px !important;
  border: none;
  width: 100%;
  color: black !important;
  font-family: 'Inter', sans-serif;
`;
