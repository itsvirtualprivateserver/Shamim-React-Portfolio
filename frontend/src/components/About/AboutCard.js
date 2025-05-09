import React from "react";
import Card from "react-bootstrap/Card";
// import { ImPointRight } from "react-icons/im";
import AgeCounter from "./Age";
import Component1 from "./AboutScramble";
import Component2 from "./AboutScramble1";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" , fontFamily: "IBM Plex Mono" , fontSize:"large" }}>
          <Component1/>
            <br/>
            <br/>
          <AgeCounter/>
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
               <Component2/>
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Sometime you WIN, Sometime You LEARN"{" "}
          </p>
          <footer className="blockquote-footer">Shamim Imran</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
