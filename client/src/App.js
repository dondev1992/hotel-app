import Navbar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import "./App.css";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";
import AllBookingsScreen from "./screens/AllBookingsScreen";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <ScrollToTop />
        <Route path="/home" exact component={Homescreen} />
        <Route
          path="/book/:roomid/:checkInDate/:checkOutDate"
          exact
          component={Bookingscreen}
        />
        <Route path="/register" exact component={Registerscreen} />
        <Route path="/login" exact component={Loginscreen} />
        <Route path="/profile" exact component={Profilescreen} />
        <Route path="/bookings" exact component={AllBookingsScreen} />
        <Route path="/admin" exact component={Adminscreen} />
        <Route path="/" exact component={Landingscreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
