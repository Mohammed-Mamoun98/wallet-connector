import React from "react";
import Header from "./Layout/Header/Header";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.scss";
import Modal from "./components/Shared/Modal/Modal";
import AppRouter from "./Router/Router";

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
