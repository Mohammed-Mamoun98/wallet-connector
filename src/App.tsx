import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Modal from "./components/Shared/Modal/Modal";
import AppRouter from "./Router/Router";
import "./App.scss";

function App() {
  return (
    <div className="min-h-[100vh] flex flex-col relative">
      <SpeedInsights />
      <AppRouter />
      <Modal />
    </div>
  );
}

export default App;
