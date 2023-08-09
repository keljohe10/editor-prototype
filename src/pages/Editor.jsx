import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Block from "../components/Block";
import { Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

const GlobalStyles = styled(Box)`
  & .ql-tooltip {
    z-index: 1001;
  }
`;

const StyledTitle = styled(Typography)({
  textAlign: "center",
  zIndex: 1,
});

const Editor = () => {
  const [editors, setEditors] = useState([]);

  const addEditor = () => {
    setEditors((prevEditors) => [...prevEditors, { id: uuidv4() }]);
  };

  const onContentChange = (index, content) => {
    setEditors((prevEditors) =>
      prevEditors.map((editor, idx) => {
        if (idx === index) {
          return { ...editor, value: content };
        }
        return editor;
      })
    );
  };

  const moveEditor = (currentIndex, direction) => {
    // Clone the existing editors array
    const updatedEditors = [...editors];

    // Calculate the target index based on the direction
    const targetIndex = currentIndex + direction;

    // Check that the target index is within bounds
    if (targetIndex >= 0 && targetIndex < updatedEditors.length) {
      // Swap the elements at the current and target indexes
      const tempEditor = updatedEditors[currentIndex];
      updatedEditors[currentIndex] = updatedEditors[targetIndex];
      updatedEditors[targetIndex] = tempEditor;

      // Update the state with the rearranged editors
      setEditors(updatedEditors);
    }
  };

  const handleRemove = (index) => {
    const updatedEditors = [...editors];
    updatedEditors.splice(index, 1);
    setEditors(updatedEditors);
  };

  return (
    <GlobalStyles>
      <StyledTitle variant="h1">Quill.js + Material-UI</StyledTitle>
      {editors.map((editor, index) => (
        <Block
          key={editor.id}
          index={index}
          onMoveUp={() => moveEditor(index, -1)}
          onMoveDown={() => moveEditor(index, 1)}
          onRemove={() => handleRemove(index)}
          isFirst={index === 0}
          isLast={index === editors.length - 1}
          onContentChange={onContentChange}
        />
      ))}
      <Box style={{ textAlign: "center", margin: "10px" }}>
        <Button variant="contained" color="primary" onClick={addEditor}>
          <AddIcon />
        </Button>
      </Box>
    </GlobalStyles>
  );
};

export default Editor;
