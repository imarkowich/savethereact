// from libraries
import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  ControlButton,
  Background,
  useNodesState,
  ReactFlowProvider,
  useEdgesState
} from "reactflow";
// from locals
import Sidebar from "./sidebar";
import {
  nodes as initialNodes,
  edges as initialEdges
} from "./initial-elements";
import CustomNode from "./CustomNode";
import MatNode from "./MatNode";
// from styles
import "reactflow/dist/style.css";
import "./overview.css";

// setup custom node types
const nodeTypes = {
  custom: CustomNode,
  matt: MatNode
};

// setup extra styles
const minimapStyle = {
  height: 120,
  backgroundColor: "#666"
};

// id stuff
let id = 10;
const getId = () => `dndnode_${id++}`;

// the exported render
const OverviewFlow = () => {
  // create states/consts for nodes, edges, etc.
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null); // init

  // funcs for node manipulation
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `My ${type} node` }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "custom").data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          style={{ height: 600, width: 600, backgroundColor: "#333" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edgesWithUpdatedTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            attributionPosition="top-right"
            nodeTypes={nodeTypes}
          >
            <Background color="#0A0" variant="lines" />
            <MiniMap style={minimapStyle} zoomable pannable />
            <Controls backgroundColor="#F00">
              <ControlButton
                onClick={() => console.log("action")}
                title="action"
              >
                <div>1</div>
              </ControlButton>
            </Controls>
          </ReactFlow>
        </div>
        <Sidebar style={{ backgroundColor: "#666" }} />
      </ReactFlowProvider>
    </div>
  );
};

export default OverviewFlow;
