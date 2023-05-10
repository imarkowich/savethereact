import React, { memo } from "react";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";
import Paper from "@mui/material/Paper";

function MatNode() {
  return (
    <>
      <div className="custom-node__body">
        <Paper elevation={3} sx={{ textAlign: "center", p: 5 }}>
          <h1>My Custom Node</h1>
          <p>Maybe we have a slider here?</p>
          <Handle type="source" position={Position.Right} />
        </Paper>
      </div>
    </>
  );
}

export default memo(MatNode);
