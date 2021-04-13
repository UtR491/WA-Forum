import React, { Component } from "react";
import { EditorState } from "draft-js";
import {
  Editor,
  toolbar,
  Controls,
  uploadCallback,
  controlProps,
} from "react-draft-wysiwyg";
import "./textEditor.css";
import { stateToHTML } from "draft-js-export-html";
class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onStateChange = this.onStateChange.bind(this);
  }

  onStateChange(editorState) {
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
      <div>
        <div
          id={this.wrapperId}
          className="rdw-editor-wrapper"
          onClick={this.modalHandler.onEditorClick}
          onBlur={this.onWrapperBlur}
          aria-label="rdw-wrapper"
        >
          <div
            className="rdw-editor-toolbar"
            onMouseDown={this.preventDefault}
            aria-label="rdw-toolbar"
            onFocus={this.onToolbarFocus}
          >
            {toolbar.options.map((opt, index) => {
              const Control = Controls[opt];
              const config = toolbar[opt];
              if (opt === "image" && uploadCallback) {
                config.uploadCallback = uploadCallback;
              }
              return <Control key={index} {...controlProps} config={config} />;
            })}
          </div>
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
        </div>
      </div>
    );
  }
}
export default EditorContainer;
