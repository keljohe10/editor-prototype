import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { Box, Button } from '@mui/material';
import Collaboration from '@tiptap/extension-collaboration';
import * as Y from 'yjs';
import { TiptapCollabProvider } from '@hocuspocus/provider';

const { 
  REACT_APP_TIP_TAP_APP_ID = '', 
  REACT_APP_TIP_TAP_JWT 
} = process.env;

const TipTap = () => {
  const doc = new Y.Doc(); 

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
        Collaboration.configure({
          document: doc,
        }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: '<p>Hello World!</p>',
  });

  useEffect(() => {
    const provider = new TiptapCollabProvider({
        name: 'name', // Unique document identifier for syncing. This is your document name.
        appId: REACT_APP_TIP_TAP_APP_ID, // Your Cloud Dashboard AppID or `baseURL` for on-premises
        token: REACT_APP_TIP_TAP_JWT, // Your JWT token
        document: doc,
    });
    
      provider.on('connect', () => {
        console.log('Server Connected')
      });
  }, []);


  if (!editor) return <></>;
      
  return (
    <Box sx={{
      margin: '1rem',
    }}>
      <Button
        variant={editor.isActive('heading', { level: 1 }) ? 'contained' : 'outlined'}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </Button>
      <EditorContent 
        editor={editor}
      />
    </Box>
  );
};

export default TipTap;