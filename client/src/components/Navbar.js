import React from "react";

function Navbar() {
  const getUser = localStorage.getItem("currentUser");

  const user = JSON.parse(getUser);

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid px-5">
          {!user ? (
            <a className="navbar-brand" href="/" style={{ fontSize: "30px" }}>
              Luxury Collection Hotel
            </a>
          ) : (
            <a
              className="navbar-brand"
              href="/home"
              style={{ fontSize: "30px" }}
            >
              Luxury Collection Hotel
            </a>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars" style={{ color: "white" }}></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav 
            "
            >
              {user ? (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i
                        className="fas fa-user-alt mx-2"
                        style={{ color: "white" }}
                      ></i>
                      {user.name}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" href="/profile">
                          Profile
                        </a>
                      </li>
                      {user.isAdmin && (
                        <li>
                          <a className="dropdown-item" href="/admin">
                            Admin
                          </a>
                        </li>
                      )}
                      <li>
                        <button className="dropdown-item" onClick={logout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="./register"
                    >
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="./login">
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
