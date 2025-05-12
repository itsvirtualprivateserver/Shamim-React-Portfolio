import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert as BootstrapAlert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import "./Home.css";

// Custom Alert Component
const CustomAlert = ({ variant, message, onClose }) => {
  const colors = {
    success: "#28a745",
    danger: "#dc3545",
    info: "#17a2b8",
    warning: "#ffc107",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        minWidth: "300px",
        maxWidth: "400px",
      }}
    >
      <BootstrapAlert
        variant={variant}
        onClose={onClose}
        dismissible
        style={{
          backgroundColor: `rgba(${parseInt(
            colors[variant].slice(1, 3),
            16
          )}, ${parseInt(colors[variant].slice(3, 5), 16)}, ${parseInt(
            colors[variant].slice(5, 7),
            16
          )}, 0.9)`,
          color: "white",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <strong>{variant === "success" ? "Success!" : "Oops!"}</strong>{" "}
          {message}
        </div>
      </BootstrapAlert>
    </div>
  );
};

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
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const showCustomAlert = (variant, message) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendOtp = async () => {
    if (!formData.email) {
      showCustomAlert("danger", "Please enter your email first.");
      return;
    }

    try {
      setLoadingOtp(true);
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/otp/send`, {
        email: formData.email,
      });
      setOtpSent(true);
      showCustomAlert("success", "OTP sent to your email.");
    } catch (err) {
      showCustomAlert("danger", "Failed to send OTP. Please try again later.");
      console.error(err);
    } finally {
      setLoadingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      showCustomAlert("danger", "Please enter the OTP.");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/otp/verify`,
        {
          email: formData.email,
          otp,
        }
      );

      if (res.status === 200) {
        setVerified(true);
        showCustomAlert("success", "Email verified successfully!");
      }
    } catch (err) {
      showCustomAlert("danger", "Invalid or expired OTP. Please try again.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verified) {
      showCustomAlert("danger", "Please verify your email first.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/requests/create`,
        formData
      );
      showCustomAlert("success", "Request submitted successfully!");

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
      showCustomAlert("danger", "Error submitting request. Please try again.");
      console.error(err);
    }
  };

  return (
    <Container
      className="request-form-section"
      style={{ maxWidth: "900px", margin: "0 auto" }}
    >
      {/* Custom Alert */}
      {showAlert && (
        <CustomAlert
          variant={alertVariant}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}

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
        {/* Rest of your form remains the same */}
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
          <BootstrapAlert
            variant="success"
            style={{ background: "rgba(40, 167, 69, 0.2)", color: "#28a745" }}
          >
            <span style={{ marginRight: "0.5rem", fontSize: "1.25rem" }}>
              ✓
            </span>
            Email successfully verified!
          </BootstrapAlert>
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
