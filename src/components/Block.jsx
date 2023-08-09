import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.core.css";
import { Paper, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)({
  position: "relative",
  width: "50%",
  margin: "20px auto",
  padding: "20px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  "& .quill": {
    position: "relative",
    paddingTop: "50px",
  },
});

const ControlPanel = styled("div")({
  position: "absolute",
  top: "0",
  right: "0",
  padding: "20px",
  zIndex: 1,
});

function Editor({
  index,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onContentChange,
  readOnly = false,
  content,
}) {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  useEffect(() => {
    if (editorRef.current) {
      const quillInstance = new Quill(editorRef.current, {
        theme: "bubble",
        placeholder: readOnly ? null : "Write something...",
        readOnly: readOnly,
        modules: {
          toolbar: readOnly
            ? null
            : [
                [{ font: [] }],
                [{ header: [1, 2, false] }],
                [{ align: [] }],
                ["bold", "italic", "underline"],
                ["link"],
                ["image", "code-block"],
              ],
        },
      });

      if (content) {
        quillInstance.root.innerHTML = content; // Inicializar con contenido
      }
      setEditor(quillInstance);
    }
  }, [content, readOnly]);

  useEffect(() => {
    if (editor) {
      editor.on("text-change", () => {
        const content = editor.root.innerHTML;
        onContentChange(index, content);
      });
    }
  }, [editor, index, onContentChange]);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <StyledPaper>
      {!readOnly && (
        <ControlPanel>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                onMoveUp(index);
                handleMenuClose();
              }}
              disabled={isFirst}
            >
              Move Up
            </MenuItem>
            <MenuItem
              onClick={() => {
                onMoveDown(index);
                handleMenuClose();
              }}
              disabled={isLast}
            >
              Move Down
            </MenuItem>
          </Menu>
        </ControlPanel>
      )}

      <div ref={editorRef} />
    </StyledPaper>
  );
}

export default Editor;
