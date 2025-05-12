import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dragProgress, setDragProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const dragContainerRef = useRef(null);
  const navigate = useNavigate();

  // Handle drag movement
  const handleDragMove = (e) => {
    if (!isDragging) return;

    const container = dragContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const dragPosition = e.clientX - containerRect.left;
    const maxDrag = containerRect.width - 60; // Account for slider width

    const progress = Math.min(Math.max((dragPosition / maxDrag) * 100, 0), 100);
    setDragProgress(progress);
  };

  // Handle drag end
  const handleDragEnd = async () => {
    setIsDragging(false);

    // Only submit if dragged more than 80%
    if (dragProgress >= 80) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/admin/login`,
          {
            email,
            password,
          }
        );
        sessionStorage.setItem("authToken", response.data.token);
        navigate("/admin/dashboard");
      } catch (err) {
        setError(err.response?.data?.message || "Authentication failed");
        setDragProgress(0); // Reset slider on error
      }
    } else {
      setDragProgress(0); // Snap back if not fully dragged
    }
  };

  return (
    <div className="innovative-login-container">
      <div className="login-glass-card">
        <div className="input-group">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="input-decoration"></div>
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="input-decoration"></div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div
          className="drag-container"
          ref={dragContainerRef}
          onMouseMove={handleDragMove}
          onTouchMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="drag-slider"
            style={{ left: `${dragProgress}%` }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <span>→</span>
          </div>
          <div
            className="drag-progress"
            style={{ width: `${dragProgress}%` }}
          ></div>
          <div className="drag-text">
            {dragProgress < 80 ? "Slide to login" : "Release to authenticate"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
