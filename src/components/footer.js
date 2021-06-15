import React from "react";
import Container from "react-bootstrap/Container";
import { FaPhoneAlt, FaEnvelope, FaHotel } from "react-icons/fa";
const Footer = (props) => {
  return (
    <>
      <footer className="border-top">
        <br />
        <Container>
          <div className="row">
            <div className="col-sm-4">
              <FaPhoneAlt size="1.5em" color="cornflowerblue" />: 94118858,
              95509797
            </div>
            <div className="col-sm-4">
              <FaEnvelope size="1.5em" color="cornflowerblue" />:
              smartnaizllc@gmail.com
            </div>
            <div className="col-sm-4">
              <FaHotel size="1.5em" color="cornflowerblue" />: Компьютер МОЛЛ,
              4002 тоот
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
