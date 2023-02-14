import type { IAppProps } from "./App.types";
import React from "react";
import QRCode from "react-qr-code";

const App = (props: IAppProps) => (
  <div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <QRCode value={props.value} />
      <button
        type="button"
        style={{ maxWidth: "256px", marginTop: "4px" }}
        onClick={() => {
          props.setNewSecret();
        }}
      >
        New Secret
      </button>
    </div>
  </div>
);

export default App;
