import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Otp from "./pages/Otp/Otp";
import NotFound from "./pages/NotFound/NotFound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const { page } = useSelector((state) => state.page);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/otp" element={<Otp></Otp>} />
        <Route path="/home" element={<Dashboard></Dashboard>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
      {/* {page == "login" && }
      {page == "otp" && }
      {page == "home" && } */}
      <ToastContainer autoClose={2500} limit={1}></ToastContainer>
    </Router>
  );
}

export default App;
