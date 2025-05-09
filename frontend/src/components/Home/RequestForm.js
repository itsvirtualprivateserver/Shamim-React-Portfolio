import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Home.css";
function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert("Request submitted successfully!");
      console.log(data);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      alert("Error submitting request.");
      console.error(err);
    }
  };

  return (
    <Container className="request-form-section">
      <h2 className="cr" style={{ color: "white" }}>
        Send Me a <span className="purple">Request</span>
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className="purple">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="purple">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label className="purple">Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label className="purple">Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label className="purple">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="purple-bg">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default RequestForm;
