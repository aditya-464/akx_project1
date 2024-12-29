import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Otp from "./pages/Otp/Otp";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Default styles (keep it for base functionality)

function App() {
  const { page } = useSelector((state) => state.page);
  return (
    <>
      {page == "login" && <Login></Login>}
      {page == "otp" && <Otp></Otp>}
      {page == "home" && <Dashboard></Dashboard>}
      <ToastContainer autoClose={2500} limit={1}></ToastContainer>
    </>
  );
}

export default App;
