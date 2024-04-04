import React from "react";
import Header from "./Layout/Header/Header";
import Connectors from "./components/Connectors/Connectors";
import { SpeedInsights } from "@vercel/speed-insights/react"
import "./App.scss";

function App() {
  return (
    <div className="flex flex-col justify-center">
      <SpeedInsights />
      <Header />
      <Connectors />
    </div>
  );
}

export default App;
