import React from "react";
import Header from "./Layout/Header/Header";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.scss";
import Modal from "./components/Shared/Modal/Modal";

function App() {
  return (
    <div className="min-h-[100vh] relative">
      <SpeedInsights />
      <Header />
      <Modal />
    </div>
  );
}

export default App;
