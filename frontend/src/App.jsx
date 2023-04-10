import React from "react";
import Nav from "./components/nav";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Form from "./screens/Form";
import Details from "./screens/Details";
import { FaPlusCircle } from "react-icons/fa";

const App = () => {
  return (
    <div>
      <Nav />
      <main className="container py-1">
        <div
          className="position-absolute"
          style={{ bottom: "20px", right: "20px", zIndex: 1000 }}
        >
          <Link to={"/diary/form"}>
            <FaPlusCircle className="fs-1" />
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/diary/form" element={<Form />} />
          <Route path="/diary/form/:id" element={<Form />} />
          <Route path="/diary/details/:id" element={<Details />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
