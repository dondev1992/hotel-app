import React, { useEffect } from "react";
import { Tabs } from "antd";
import AdminBookings from "../components/AdminBookings";
import AdminRooms from "../components/AdminRooms";
import AdminUsers from "../components/AdminUsers";
import AdminAddRoom from "../components/AdminAddRoom";

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  });

  return (
    <div className="mt-5 mx-5 bs" style={{ height: "100vh" }}>
      <h2 className="text-center">
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <AdminBookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <AdminRooms />
        </TabPane>
        <TabPane tab="Add Rooom" key="3">
          <AdminAddRoom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <AdminUsers />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;
