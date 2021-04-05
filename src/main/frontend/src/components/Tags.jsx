import React from 'react';
import {ListGroup,Row,Col,Container} from "react-bootstrap";


class Tags extends React.Component {

       render(){
             
        return(
            <Container>
 
            <Row sm>
              <Col sm></Col>
              <Col sm></Col>
              <Col xs={6} sm>
            
              <ListGroup horizontal id="tags">
                {
                    // eslint-disable-next-line array-callback-return
                    this.props.tags.map((tag) =>
                    
                      <ListGroup.Item variant="primary" sm>{tag}</ListGroup.Item>
                     
                    
                    )

                }
            
           
           
             </ListGroup>
          
              </Col>
            </Row>
          
          </Container>
            

        );
    }

}

export default Tags;