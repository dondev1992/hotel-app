import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

export function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const data = (await axios.get("/api/users/getallusers")).data;

        setLoading(false);
        setUsers(data);
        console.log(data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }
    getAllUsers();
  }, []);

  return (
    <div className="row mt-2">
      <div className="col-md-12">
        {loading && <Loader loading={loading} />}
        <h1>Users</h1>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
