import React from 'react';
import {Navbar,Nav,NavDropdown} from "react-bootstrap";
import {MDBCol,MDBIcon } from "mdbreact";



class NavbarComponent extends React.Component {

   render() {
        
      return(
          
        <Navbar bg="#364153" expand="lg">
  <Navbar.Brand href="#home"  style={{color:"white"}}>WA-Forum</Navbar.Brand>

     
      <MDBCol md="6" className="form mx-auto">
      
      <form className="form-inline mt-4 mb-4 active-pink-3 active-pink-4">
        <MDBIcon icon="search" />
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search here..." aria-label="Search" />
      </form>
      
      </MDBCol> 
  
      
    <Nav className="ml-auto">  
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">                  

      <NavDropdown title="Notifications" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>

      <img className="thumbnail-image" 
                            src="https://upload.wikimedia.org/wikipedia/en/a/a1/NafSadh_Profile.jpg" 
                            alt="user pic" width="40" height="40"
                        />
                         </Nav>
       </Navbar.Collapse> 
    </Nav>

    
</Navbar>

      )

   }

}

export default NavbarComponent;