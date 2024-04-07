import React from "react";
import { connectorsList } from "../../constants/connectors/list";
import ConnectorTemplate from "./ConnectorTemplate";
import "./Connectors.scss";
import ConnectionPreserver from "../ConnectionPreserver/ConnectionPreserver";

export default function Connectors() {
  return (
    <div className="max-[100%] overflow-scroll">
      <ConnectionPreserver />

      <div className="mt-5">
        {connectorsList.map((connector) => (
          <ConnectorTemplate {...connector} />
        ))}
      </div>
    </div>
  );
}
