import React from "react";
import {  Row, Col, Container } from "react-bootstrap";
import "./Tags.css";

class Tags extends React.Component {
  render() {
    return (
      <Container>
        <Row sm>
          <Col sm></Col>
          <Col sm></Col>
          <Col xs={6} sm>
            <Row>
              {this.props.tags !== null ? (
                this.props.tags.map((tag) => (
                  <div className="individualTag">
                    <text className="tagText ">{tag}</text>
                  </div>
                ))
              ) : (
                <br />
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tags;
