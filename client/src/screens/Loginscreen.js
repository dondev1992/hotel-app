import React, { useState } from "react";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function login() {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const result = (await axios.post("/api/users/login", user)).data;

      setLoading(false);
      setError(false);
      const resultObj = JSON.stringify(result);
      localStorage.setItem("currentUser", resultObj);

      window.location.href = "/home";
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      {loading && <Loader />}
      {error && <Error message="Invalid username or password" />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <h2>Login</h2>

            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="bottom-row">
              <button className="btn btn-primary mt-3" onClick={login}>
                Login
              </button>
              <div className="mt-3 bottom-row">
                <div className="px-2 mt-2">
                  <p style={{ fontSize: 10, fontWeight: 700 }}>
                    Don't have an account?{" "}
                  </p>
                </div>
                <div className="m-1">
                  <a href="/register" className="register-link">
                    Register here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
