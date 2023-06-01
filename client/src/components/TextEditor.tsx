import React, { useEffect, useRef } from 'react';
import { Quill } from 'react-quill';
import 'quill/dist/quill.snow.css';
import * as Styled from '@/styles/TextEditor.styles';

export const TextEditor = () => {
  const wrapperRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = document.createElement('div');
    if (wrapperRef.current) {
      wrapperRef.current.append(editor);
      new Quill('.container', { theme: 'snow' });
    }
  }, []);

  return <Styled.Container className="container" ref={wrapperRef}></Styled.Container>;
};
