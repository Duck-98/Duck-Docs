import styled from 'styled-components';

export const ToolBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 12px;
  top: 50%;
  -webkit-transform: translateY(-50%) translateY(54px);
  -moz-transform: translateY(-50%) translateY(54px);
  -ms-transform: translateY(-50%) translateY(54px);
  -o-transform: translateY(-50%) translateY(54px);
  transform: translateY(-50%) translateY(54px);
  z-index: 10;
  background-color: #fff;
  width: 70px;
  -webkit-border-radius: 24px;
  -moz-border-radius: 24px;
  border-radius: 24px;
  padding: 0;
  border: 1px solid #dadce0;
  min-height: 38px;
  select {
    margin: 8px;
    border: none;
  }
`;

export const Button = styled.button`
  width: 50px;
  height: 50px;
  padding: 8px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: white;
  font-size: 13px;
  font-weight: bold;
  &:hover {
    background: #efefef;
  }
`;

export const Container = styled.div`
  canvas {
    background: red;
  }
`;
