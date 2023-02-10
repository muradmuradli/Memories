import { useEffect } from "react";
import Home from "./Home";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Footer";
import Info from "./components/Info";
import Verify from "./components/Verify";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SinglePage from "./components/SinglePage";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/posts/:postId" element={<SinglePage />} />
        <Route path="/info" element={<Info />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route path="/user/verify-email" element={<Verify />} />
      </Routes>
      <Form />
    </Router>
  );
}

export default App;
