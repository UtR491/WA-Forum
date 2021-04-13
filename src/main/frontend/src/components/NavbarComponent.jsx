import React from "react";
import { Form, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import { Redirect } from "react-router-dom";
import logofinal from "./logofinal.png";
import questionService from "../services/QuestionService";

class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
      searchByTags: false,
    };
    this.goToHome = this.goToHome.bind(this);
    this.logout = this.logout.bind(this);
    this.myProfile = this.myProfile.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.searchInput = "";
  }

  onSearchClick(event) {
    this.props.history.push("/home/search", {
      data: this.searchInput,
      searchByTags: this.state.searchByTags,
    });
  }
  onSearch(event) {
    this.searchInput = event.target.value;
  }
  goToHome(event) {
    if (this.props.isHome) this.props.history.go(0);
    else this.props.history.push("/home");
  }

  myProfile(event) {
    this.props.history.push("/profile/my", {
      //history: this.props.history
      getOwnerProfile: sessionStorage.getItem("getOwnerProfile"),
    });
  }

  logout() {
    this.setState({
      logout: true,
    });
  }

  render() {
    if (this.state.logout) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              loggedOut: true,
            },
          }}
        />
      );
    }
    return (
      <Navbar bg="#364153" expand="lg">
        <Navbar.Brand
          onClick={this.goToHome}
          id="brandText"
          style={{ color: "white" }}
        >
          <img src={logofinal} width="80px"></img>
        </Navbar.Brand>

        <MDBCol md="6" className="form mx-auto">
          <form className="form-inline mt-4 mb-4 active-pink-3 active-pink-4">
            <MDBIcon icon="search" />
            <input
              onChange={this.onSearch}
              className="form-control form-control-sm ml-3 w-75"
              type="text"
              placeholder={
                this.state.searchByTags
                  ? "Enter space separated list of tags. Use - for multiword tags."
                  : "Search here..."
              }
              aria-label="Search"
            />
            <button className="submitButton" onClick={this.onSearchClick}>
              Search
            </button>
          </form>
          <Form.Check
            custom
            type="checkbox"
            id={"custom-checkbox"}
            style={{
              color: "white",
            }}
            onChange={() => {
              this.setState({
                searchByTags: !this.state.searchByTags,
              });
            }}
            label={"Search by tags?"}
          />
        </MDBCol>
        <Nav className="ml-auto">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.myProfile}>
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.logout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>

              <img
                src="https://icon-library.net/images/code-icon-png/code-icon-png-5.jpg"
                alt="user pic"
                width="50"
                height="50"
              />
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Navbar>
    );
  }
}

export default NavbarComponent;
