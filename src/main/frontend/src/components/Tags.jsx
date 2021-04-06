import React from "react";
import { ListGroup, Row, Col, Container } from "react-bootstrap";
import "./Tags.css";

class Tags extends React.Component {
  render() {
    return (
      <Row sm>
        <Col xs={6} align-items-end sm>
          <ListGroup horizontal id="tags">
            {
              // eslint-disable-next-line array-callback-return
              this.props.tags.map((tag) => (
                <ListGroup.Item
                  id="tag"
                  type="button"
                  variant="primary"
                  className="list-group-item list-group-item-action"
                >
                  {tag}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default Tags;
