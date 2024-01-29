import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import RecordBaby from "./component/RecordBaby";
import RecordMom from "./component/RecordMom";

function Home() {
  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/recordmom" element={<RecordMom />} />
        <Route path="/recordbaby" element={<RecordBaby />} />
      </Routes>
    </div>
  );
}

export default App;
