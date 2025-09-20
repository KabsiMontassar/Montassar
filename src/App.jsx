// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollLandingPage from "./pages/ScrollLandingPage";
import WorkPage from "./pages/WorkPage";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
function App() {
  return (
    <Router
      basename="/portfolio/"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="App" style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <ScrollLandingPage />
            </PageTransition>
          } />
          <Route path="/work" element={
            <PageTransition>
              <WorkPage />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;