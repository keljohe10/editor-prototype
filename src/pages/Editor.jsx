import React, { useState } from "react";
import Block from "../components/Block";
import { Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

const GlobalStyles = styled("div")`
  & .ql-tooltip {
    z-index: 1001;
  }
`;

const StyledTitle = styled(Typography)({
  textAlign: "center",
  zIndex: 1,
});

const Editor = () => {
  const [editors, setEditors] = useState([{ index: 0, value: "" }]);

  const addEditor = () => {
    setEditors((prevEditors) => [
      ...prevEditors,
      { index: prevEditors.length },
    ]);
  };

  const onContentChange = (index, content) => {
    setEditors((prevEditors) =>
      prevEditors.map((editor, idx) => {
        if (idx === index) {
          return { index, value: content };
        }
        return editor;
      })
    );
  };

  const moveEditor = (index, direction) => {
    const updatedEditors = [...editors];
    const targetIndex = index + direction;
    [updatedEditors[index], updatedEditors[targetIndex]] = [
      updatedEditors[targetIndex],
      updatedEditors[index],
    ];
    setEditors(updatedEditors);
  };

  return (
    <GlobalStyles>
      <StyledTitle variant="h1">Quill.js + Material-UI</StyledTitle>
      {editors.map((editor, index) => (
        <Block
          key={editor.index}
          index={index}
          onMoveUp={() => moveEditor(index, -1)}
          onMoveDown={() => moveEditor(index, 1)}
          isFirst={index === 0}
          isLast={index === editors.length - 1}
          onContentChange={onContentChange}
        />
      ))}
      <div style={{ textAlign: "center", margin: "10px" }}>
        <Button variant="contained" color="primary" onClick={addEditor}>
          <AddIcon />
        </Button>
      </div>
    </GlobalStyles>
  );
};

export default Editor;
