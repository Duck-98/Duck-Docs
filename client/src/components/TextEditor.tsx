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
  }, []);

  // 받는 쪽
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any) => {
      quill.updateContents(delta);
    };
    socket.on('receive-change', handler);

    return () => {
      socket.off('receive-change', handler);
    };
  }, [socket, quill]);

  // 보내는 쪽
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any, oldDelta: any, source: any) => {
      if (source !== 'user') return;
      socket.emit('send-change', delta);
    };

    quill.on('text-change', handler);
    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);
  // quill을 작성할 때마다 socket 통신 작동

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    // q.disable();
    // q.setText('Loading...');
    setQuill(q);
  }, []);

  return <Styled.Container className="container" ref={wrapperRef}></Styled.Container>;
};
