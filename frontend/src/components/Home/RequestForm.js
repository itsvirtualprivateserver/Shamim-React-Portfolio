import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import "./Home.css";

function RequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      setLoadingOtp(true);
      await axios.post(
        "https://portfolio-backend-njcj.onrender.com/api/otp/send",
        {
          email: formData.email,
        }
      );
      setOtpSent(true);
      alert("OTP sent to your email.");
    } catch (err) {
      alert("Failed to send OTP. Try again.");
      console.error(err);
    } finally {
      setLoadingOtp(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "https://portfolio-backend-njcj.onrender.com/api/otp/verify",
        {
          email: formData.email,
          otp,
        }
      );

      if (res.status === 200) {
        setVerified(true);
        alert("Email verified successfully!");
      }
    } catch (err) {
      alert("Invalid or expired OTP. Please try again.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verified) {
      alert("Please verify your email first.");
      return;
    }

    try {
      await axios.post(
        "https://portfolio-backend-njcj.onrender.com/api/requests",
        formData
      );
      alert("Request submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setOtp("");
      setOtpSent(false);
      setVerified(false);
    } catch (err) {
      alert("Error submitting request.");
      console.error(err);
    }
  };

  return (
    <Container
      className="request-form-section"
      style={{ maxWidth: "900px", margin: "0 auto" }}
    >
      <div
        className="form-header"
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "2.5rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          Send Me a <span style={{ color: "#9c27b0" }}>Request</span>
        </h2>
        <p style={{ color: "#aaa", fontSize: "1rem" }}>
          Fill out the form below and I'll get back to you soon
        </p>
      </div>

      <Form
        onSubmit={handleSubmit}
        style={{ padding: "2rem", borderRadius: "12px" }}
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="formName">
              <Form.Label style={{ color: "#9c27b0", fontWeight: "500" }}>
                Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  background: "#333",
                  border: "1px solid #444",
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "8px",
                }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Label style={{ color: "#9c27b0", fontWeight: "500" }}>
                Email
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    background: "#333",
                    border: "1px solid #444",
                    color: "white",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    flex: 1,
                  }}
                />
                <Button
                  variant="outline-light"
                  style={{
                    marginLeft: "0.75rem",
                    background: "#9c27b0",
                    border: "none",
                    padding: "0.75rem 1.25rem",
                    borderRadius: "8px",
                    fontWeight: "500",
                  }}
                  onClick={sendOtp}
                  disabled={loadingOtp}
                >
                  {loadingOtp ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Sending...</span>
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </div>
              {!otpSent && !loadingOtp && (
                <small
                  className="text-muted"
                  style={{ display: "block", marginTop: "0.5rem" }}
                >
                  We'll send a verification code to this email
                </small>
              )}
            </Form.Group>
          </Col>
        </Row>

        {otpSent && !verified && (
          <Form.Group className="mb-4" controlId="formOtp">
            <Form.Label style={{ color: "#9c27b0", fontWeight: "500" }}>
              Verification Code
            </Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Enter the 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                style={{
                  background: "#333",
                  border: "1px solid #444",
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "8px",
                }}
              />
              <Button
                variant="outline-light"
                style={{
                  marginLeft: "0.75rem",
                  background: "#9c27b0",
                  border: "none",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "8px",
                  fontWeight: "500",
                }}
                onClick={verifyOtp}
              >
                Verify
              </Button>
            </div>
            <small
              className="text-muted"
              style={{ display: "block", marginTop: "0.5rem" }}
            >
              Check your email for the verification code
            </small>
          </Form.Group>
        )}

        {verified && (
          <Alert
            variant="success"
            style={{ background: "rgba(40, 167, 69, 0.2)", color: "#28a745" }}
          >
            <span style={{ marginRight: "0.5rem", fontSize: "1.25rem" }}>
              ✓
            </span>
            Email successfully verified!
          </Alert>
        )}

        <Row>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="formPhone">
              <Form.Label style={{ color: "#9c27b0", fontWeight: "500" }}>
                Phone
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  background: "#333",
                  border: "1px solid #444",
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "8px",
                }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="formSubject">
              <Form.Label style={{ color: "#9c27b0", fontWeight: "500" }}>
                Subject
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="What's this about?"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={{
                  background: "#333",
                  border: "1px solid #444",
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "8px",
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4" controlId="formMessage">
          <Form.Label style={{ color: "#9c27b0", fontWeight: "500" }}>
            Your Message
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Type your message here..."
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{
              background: "#333",
              border: "1px solid #444",
              color: "white",
              padding: "0.75rem",
              borderRadius: "8px",
              resize: "vertical",
              minHeight: "120px",
            }}
          />
        </Form.Group>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Button
            type="submit"
            style={{
              background: "#9c27b0",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "1.1rem",
              width: "100%",
              maxWidth: "300px",
            }}
            disabled={!verified}
          >
            {!verified ? "Verify Email to Continue" : "Send Message"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default RequestForm;
