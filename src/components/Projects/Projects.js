import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
// import nexage from "../../Assets/Projects/Nexage.png";
import text2qr from "../../Assets/Projects/text-2-qr.png";
import portfolio from "../../Assets/Projects/portfolio.png";
import bgremove from "../../Assets/Projects/bg-remover.png";
import gemini from "../../Assets/Projects/gemini-clone.png";
// import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={text2qr}
              isBlog={false}
              title="Text to QR code"
              description="Convert any text to QR in one second"
              ghLink="https://github.com/iamshamimimran/Text-2-QR-Generator"
              demoLink="https://text2qr-generate.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={portfolio}
              isBlog={false}
              title="Portfolio"
              description="A portfolio website is a unique way to showcase your work and let others know about yourself. It is like an evergreen platform for your projects, case studies, and information about you. It is one of the best ways to express your personality, experience, and capabilities"
              ghLink="https://github.com/iamshamimimran/portfolio2.0"
              demoLink="https://shamimimran.netlify.app/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bgremove}
              isBlog={false}
              title="Background Remover"
              description="Remove your photo background in one click"
              ghLink="https://github.com/iamshamimimran/Background-Remover"
              demoLink="https://removeback.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={gemini}
              isBlog={false}
              title="Gemini Clone"
              description="Using 'Natural Launguage Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace  and thus helping in sucide prevention."
              ghLink="https://github.com/iamshamimimran/Gemini-Clone"
              demoLink="https://gemini-clone-01.vercel.app/"
            />
          </Col>

         
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
