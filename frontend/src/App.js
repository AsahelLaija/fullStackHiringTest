import React from "react";
import NavBar from "./components/NavBar.js";
import Form from "./components/Form.js";
import Success from "./Pages/Success.js";
import Fail from "./Pages/Fail.js";
import { Routes, Route } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
	<Route path="/" element={<Form />} />
	<Route path="/success" element={<Success />} />
	<Route path="/fail" element={<Fail />} />
      </Routes>
    </div>
  );
    
}

export default App;
