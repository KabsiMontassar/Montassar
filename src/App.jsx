// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollLandingPage from "./pages/ScrollLandingPage";
import WorkPage from "./pages/WorkPage";

function App() {
  return (
    <Router 
      basename="/portfolio/"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<ScrollLandingPage />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;