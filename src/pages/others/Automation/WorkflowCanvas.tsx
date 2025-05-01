import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useState } from 'react';
import { TriggerNode, AddNode } from './TriggerNod';

const nodeTypes = {
  trigger: TriggerNode,
  add: AddNode,
};

export default function Workflow() {
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'trigger',
      position: { x: 250, y: 100 },
      data: { label: 'Post or Reel Comments' },
    },
    {
      id: '2',
      type: 'add',
      position: { x: 250, y: 250 },
      data: {},
    },
    {
      id: '3',
      type: 'default',
      position: { x: 100, y: 400 },
      data: { label: 'Default Node' },
      style: {
        backgroundColor: '#f0f0f0',
        border: '2px solid #888',
        padding: 10,
        borderRadius: 8,
        color: '#333',
      },
    },
  ]);
  

  const [edges, setEdges] = useState([
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#ec4899' },
    },
  ]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <div className="w-full h-full ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant="dots" gap={16} size={1} color="pink" />
        <Controls />
        {/* <MiniMap /> */}
      </ReactFlow>
    </div>
  );
}
