import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./Footer.css";
import githubFill from "@iconify-icons/akar-icons/github-fill";
import { Icon, InlineIcon } from "@iconify/react";

const FooterPage = () => {
  return (
    <MDBFooter className="font-small pt-4 mt-4 footerPage">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h3 className="title">WA-Forum</h3>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <Icon
            className="icon"
            icon={githubFill}
            color="#FFFFFF"
            width="30px"
            height="30px"
          />
          <a href="https://github.com/UtR491/WA-Forum"> Github </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
