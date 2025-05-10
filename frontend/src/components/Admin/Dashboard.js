// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
// import Particle from "../Particle";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;

  const fetchRequests = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get(
        "https://portfolio-backend-njcj.onrender.com/api/requests/get-all-req",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(response.data);
      setFilteredRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const filtered = requests.filter((req) =>
      req.name.toLowerCase().includes(filterName.toLowerCase())
    );
    setFilteredRequests(filtered);
    setCurrentPage(1); // Reset to first page on filter
  }, [filterName, requests]);

  // Pagination calculations
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <div className="container py-5">
      {/* <Particle /> */}
      <h2 className="text-center mb-4 text-secondary">📋 All Requests</h2>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-outline-light btn-sm"
          onClick={handleLogout}
          style={{ fontSize: "0.85rem" }}
        >
          Logout
        </button>
      </div>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <input
          type="text"
          placeholder="Filter by name..."
          className="form-control w-25"
          style={{ fontSize: "0.85rem" }}
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <span className="text-white">
          Total Requests: {filteredRequests.length}
        </span>
      </div>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        <div className="table-responsive shadow-sm">
          <table
            className="table table-bordered text-xs align-middle"
            style={{ fontSize: "0.85rem" }}
          >
            <thead className="text-white bg-secondary">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {currentRequests.map((req) => (
                <tr key={req._id}>
                  <td>{req.name}</td>
                  <td>{req.email}</td>
                  <td>{req.phone}</td>
                  <td>{req.subject}</td>
                  <td>{req.message}</td>
                  <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div
        className="d-flex justify-content-center py-2"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <nav>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 && "active"}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
