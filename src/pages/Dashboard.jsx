import React from "react";
import Block from "../components/Block";

const editors = [
    {
        "index": 0,
        "value": "<h2>Where can I get some?</h2><p class=\"ql-align-justify\">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p><p><br></p><ol><li>Test</li><li>hernandez cabrera</li><li>developer</li></ol>"
    },
    {
        "index": 1,
        "value": "<h1><strong>Test - Material UI</strong></h1>"
    },
    {
        "index": 2,
        "value": "<pre class=\"ql-syntax\" spellcheck=\"false\">function Dashboard() {\n  return (\n    &lt;&gt;\n      {editors.map((editor, index) =&gt; (\n        &lt;Block\n          key={editor.index}\n          index={index}\n          readOnly={true}\n          content={editor.value}\n        /&gt;\n      ))}\n    &lt;/&gt;\n  );\n}\n</pre>"
    }
]

function Dashboard() {
  return (
    <>
      {editors.map((editor, index) => (
        <Block
          key={editor.index}
          index={index}
          readOnly={true}
          content={editor.value}
        />
      ))}
    </>
  );
}

export default Dashboard;
