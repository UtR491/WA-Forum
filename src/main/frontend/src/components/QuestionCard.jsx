import React from 'react';
// import ReactDOM from 'react-dom';
import "./questionstyle.css";
//import questionService from '../services/QuestionService';
import {Card,Row,Col,Container, ListGroup} from "react-bootstrap"

import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import Tags from "./Tags"



class QuestionCard extends React.Component {
   
render(){

  
	return (
    

		<div id="questioncard">
			<Card className="customCard" text={'white'} style={{height: '10rem'}}>
  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
  <div className="shadow-box-example z-depth-1-half">
  <Card.Body id="cardbody">
 <Row>
  <Col md="auto"><img className="asker" src="https://upload.wikimedia.org/wikipedia/en/a/a1/NafSadh_Profile.jpg" 
                            alt="user pic" width="25" height="25"/></Col>
   <Col> <Card.Subtitle style={{textAlign:'left',marginTop:'-1px',marginBottom:'10px',marginLeft:'-20px'}}>{this.props.body}</Card.Subtitle></Col>

   </Row>
             <Tags
                
                tags={this.props.tags}
             />    

    
        <hr/>
         <Container>
    <Row>
    <Col md="auto"> 


       <p>Posted by {this.props.ownerDisplayName}</p>  
       
       </Col> 

      
    
    
   
    <Col>5 Days ago</Col>
      <Col><ChatBubbleOutlineOutlinedIcon/>50+</Col>
  </Row>
</Container>
  </Card.Body>
  </div>
    </Card>
    
  
   


		</div>
     
   
	);
}

}



// ReactDOM.render(<App/>, document.getElementById("root"));

export default QuestionCard;
