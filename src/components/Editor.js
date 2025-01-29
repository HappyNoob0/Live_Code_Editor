import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
    const editorRef = useRef(null); // Stores the CodeMirror instance
    const textareaRef = useRef(null); // Ref for the textarea

    useEffect(() => {
        if (editorRef.current) {
            return; // Prevent reinitialization if already exists
        }

        if (textareaRef.current) {
            editorRef.current = Codemirror.fromTextArea(textareaRef.current, {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            });
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea(); // Properly destroy editor instance
                editorRef.current = null; // Reset reference
            }
        };
    }, []);

    return <textarea ref={textareaRef} id="realtimeEditor"></textarea>;
};

export default Editor;
