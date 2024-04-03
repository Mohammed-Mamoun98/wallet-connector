import React from "react";
import { connectorsList } from "../../constants/connectors/list";
import ConnectorTemplate from "./ConnectorTemplate";
import "./Connectors.scss";

export default function Connectors() {
  return (
    <div className="mt-5 flex items-center flex-col max-[100%] overflow-scroll">
      <div className="mt-5">
        {connectorsList.map((connector) => (
          <ConnectorTemplate {...connector} />
        ))}
      </div>

      <div className="mt-5 w-2/3 overflow-scroll">
        {JSON.stringify({ connectorsList })}
      </div>
    </div>
  );
}
