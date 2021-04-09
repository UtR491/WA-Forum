import React, { Component } from "react";
import { render } from "react-dom";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./textEditor.css";
import { stateToHTML, RichUtils, AtomicBlockUtils } from "draft-js-export-html";
class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onStateChange = this.onStateChange.bind(this);
  }

  onStateChange(editorState) {
    console.log(editorState);
    this.setState({
      editorState,
    });
    this.props.onChange(
      stateToHTML(this.state.editorState.getCurrentContent())
    );
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </div>
    );
  }
}
export default EditorContainer;
