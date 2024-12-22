import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Otp from "./pages/Otp/Otp";
import { useSelector } from "react-redux";

function App() {
  const { page } = useSelector((state) => state.page);
  return (
    <>
      {page == "login" && <Login></Login>}
      {page == "otp" && <Otp></Otp>}
      {page == "home" && <Dashboard></Dashboard>}
    </>
  );
}

export default App;
