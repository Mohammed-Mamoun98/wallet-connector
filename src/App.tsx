import React from "react";
import Header from "./Layout/Header/Header";
import Connectors from "./components/Connectors/Connectors";
import "./App.scss";

function App() {
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <Connectors />
    </div>
  );
}

export default App;
