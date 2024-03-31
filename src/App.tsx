import React from "react";
import "./App.scss";
import Header from "./Layout/Header/Header";
import Connectors from "./components/Connectors/Connectors";
import DisconnectBtn from "./components/DisconnectBtn/DisconnectBtn";

function App() {
  return (
    <div className=" mt-12 flex flex-col justify-center items-center">
      <Header />
      <Connectors />
      <DisconnectBtn />
    </div>
  );
}

export default App;
