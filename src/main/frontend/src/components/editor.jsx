import React, { useState } from "react";
import { ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./editor.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form } from "react-bootstrap";

const Rich = () => {
  let _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);
  return (
    <div className="App">
      <Form.Group>
        <Editor
          defaultContentState={contentState}
          onContentStateChange={setContentState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </Form.Group>
    </div>
  );
};
export default Rich;
