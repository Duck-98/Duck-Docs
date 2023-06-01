import React, { useEffect, useState, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { Quill } from 'react-quill';
import 'quill/dist/quill.snow.css';
import * as Styled from '@/styles/TextEditor.styles';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];

export const TextEditor = () => {
  const [socket, setSocket] = useState<any>();
  const [quill, setQuill] = useState<any>();
  // const wrapperRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = io('http://localhost:3095');
    setSocket(s);
    return () => {
      s.disconnect();
    };
  });

  useEffect(() => {
    quill.on('text-change', (delta: any, oldDelta: any, source: any) => {
      if (source !== 'user') return;
    });
  }, []);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText('Loading...');
    setQuill(q);
  }, []);

  return <Styled.Container className="container" ref={wrapperRef}></Styled.Container>;
};
