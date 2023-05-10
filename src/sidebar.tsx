import { BorderColorRounded } from "@material-ui/icons";
import { Accordion } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export default function sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ backgroundColor: "#666" }}>
      <div className="description">
        <h2>Library of Nodes</h2>
      </div>
      <div className="description">
        <h4>Standard Nodes</h4>
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        style={{ backgroundColor: "#AAA", borderColor: "#111" }}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        style={{ backgroundColor: "#AAA", borderColor: "#111" }}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        style={{ backgroundColor: "#AAA", borderColor: "#111" }}
        draggable
      >
        Output Node
      </div>
      <div className="description">
        <h4>Custom Nodes</h4>
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "matt")}
        style={{ backgroundColor: "#A66", borderColor: "#111" }}
        draggable
      >
        Matt Node
      </div>
    </aside>
  );
}
