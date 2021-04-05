import React from 'react';
// import ReactDOM from 'react-dom';
import "./homestyle.css";
import  QuestionCard from "./QuestionCard"
import NavbarComponent from "./NavbarComponent"
import "bootstrap/dist/css/bootstrap.min.css";
 import 'bootstrap-css-only/css/bootstrap.min.css'; 
 import 'mdbreact/dist/css/mdb.css';
import {Row,Container,Col} from 'react-bootstrap'

import questionService from '../services/QuestionService';



class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {
          _embedded : {
              postses : []
          }
      },
    };
  }

  componentDidMount() {
    console.log("Question service = ", questionService);
  questionService.getQuestions().then((response) => {
      console.log("The response was ", response)
      console.log("Resopnse.data = ", response.data)
    this.setState({
        questions : response.data,
        loaded : true
    });
    console.log("Question service = ", this.state.questions);
  });
}
   
render() {
	return (
		<div className="App">
  

  <NavbarComponent/>


<Container>
  <Row>
    <Col id="col1">1 of 3 There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with  </Col>
    <Col xs={8} id="col2">
    
         {
           this.state.questions._embedded.postses.map(
               question=><QuestionCard
                  key={question.id}
                  body={question.body}
                  ownerDisplayName={question.ownerDisplayName}
                  upvoteCount={question.upvoteCount}
                  creationDate={question.creationDate}
                  tags={question.tags}
               />
           )
         }
    
    
    
    
    
    
    </Col>
    <Col id="col3">3 of 3  a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,  a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, </Col>
  </Row>
  </Container>
			
		</div>
	);
}


}





export default HomePage;
