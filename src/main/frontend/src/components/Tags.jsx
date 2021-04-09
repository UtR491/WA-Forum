import React from "react";
import { ListGroup, Row, Col, Container, Button } from "react-bootstrap";
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
              {
                // eslint-disable-next-line array-callback-return
                this.props.tags.map((tag) => (
                  <div className="individualTag">
                    <text className="tagText ">{tag}</text>
                  </div>
                ))
              }
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tags;
