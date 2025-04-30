import React, { useState, useCallback, useMemo, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  Node,
  Edge,
  Connection,
  NodeTypes,
  ReactFlowInstance,
  MarkerType,
  SmoothStepEdge,
  BezierEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TriggerComponent from './TriggerNode';

interface TriggerNodeData {
  label: string;
  isConfigured: boolean;
  onAddActionNode?: (triggerId: string) => void; // Added this
}

interface ActionInput {
  label: string;
}

interface ActionNodeData {
  label: string;
  inputs: ActionInput[];
}

type CustomNodeData = TriggerNodeData | ActionNodeData;

// Custom Node Components (moved outside the component)
const DefaultNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <div className="px-4 py-10 rounded-xl bg-white border-2 shadow-md w-72 transition-all border-purple-500">
    <div>
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <div className="text-sm font-semibold text-gray-800">{data.label}</div>
      </div>
    </div>
  </div>
);

const TriggerNode: React.FC<{
  id: string;
  data: TriggerNodeData;
  isActive?: boolean;
}> = ({ id, data, isActive }) => (
  <div
    className={`relative px-4 py-3 rounded-xl bg-white border-2 shadow-md w-72 transition-all ${
      !isActive ? 'border-purple-500' : 'border-gray-200'
    }`}
  >
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-purple-100 text-purple-600 rounded-full px-3 py-1 text-xs font-medium">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span>Trigger</span>
      </div>
    </div>
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <div className="text-sm font-semibold text-gray-800">{data.label}</div>
      </div>
      <div className="mt-2 border-t border-gray-200 pt-2">
        <span className="text-xs text-gray-500">
          {data.isConfigured ? 'Configured' : 'Not setup yet.'}
        </span>
      </div>
    </div>
    <button
      className="mt-3 w-full py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors duration-200"
      onClick={() => data.onAddActionNode?.(id)}
    >
      Add Next Node
    </button>
  </div>
);

const ActionNode: React.FC<{ data: ActionNodeData }> = ({ data }) => (
  <div
    className={`relative px-4 py-3 rounded-xl bg-white border-2 shadow-md w-72 transition-all ${'border-purple-500'}`}
  >
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <div className="text-sm font-semibold text-gray-800">{data.label}</div>
      </div>
      {/* <div className="mt-2 border-t border-gray-200 pt-2">
        <span className="text-xs text-gray-500">
          {data.isConfigured ? 'Configured' : 'Not setup yet.'}
        </span>
      </div> */}
    </div>
  </div>
);

// Define node types outside the component
const nodeTypes: NodeTypes = {
  customDefault: DefaultNode,
  trigger: TriggerNode,
  action: ActionNode,
};

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: '1',
    type: 'customDefault',
    position: { x: 100, y: 50 },
    data: { label: 'Start by selecting a trigger' },
  },
];

const initialEdges: Edge[] = [];

const WorkflowEditor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<CustomNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(
    null,
  );
  const lastNodeId = useRef<string | null>(null);
  const yPos = useRef(0);
  const handleAddActionNode = useCallback(() => {
    if (!reactFlowInstance) return;

    const position = reactFlowInstance.project({
      x: (yPos.current += 200),
      y: (yPos.current += 100),
    });

    const newNodeId = `action-${Date.now()}`;
    const newNode: Node<CustomNodeData> = {
      id: newNodeId,
      type: 'action',
      position,
      data: {
        label: 'New Action',
        inputs: [{ label: 'New Input' }],
      },
    };
console.log(nodes)
    // Create edge if there's a previous node
    if (yPos.current) {
      const newEdge: Edge = {
        id: `edge-${Date.now()}`,
        source: `trigger-${Date.now()}`,
        target: newNodeId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#7c3aed', strokeWidth: 3 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#7c3aed' },
      };
      console.log( newEdge);
      setEdges((eds) => addEdge(newEdge, eds));
    }

    setNodes((nds) => [...nds, newNode]);
    lastNodeId.current = newNodeId; // Update last node reference

    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.5, duration: 300 });
    }, 100);
  }, [reactFlowInstance, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            style: { stroke: '#6b7280', strokeWidth: 3 },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - 100,
        y: event.clientY - 50,
      });

      const newNode: Node<CustomNodeData> = {
        id: `${Date.now()}`,
        type: type as 'trigger' | 'action',
        position,
        data:
          type === 'trigger'
            ? {
                label: 'New Trigger',
                isConfigured: false,
                onAddActionNode: handleAddActionNode,
              }
            : {
                label: 'New Action',
                inputs: [{ label: 'New Input' }],
              },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, handleAddActionNode, setNodes],
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<CustomNodeData>) => {
      setSelectedNode(node);
    },
    [],
  );

  const showTriggerNode = useCallback(
    (nodeData: { label: string }) => {
      setNodes([
        {
          id: `trigger-${Date.now()}`,
          type: 'trigger',
          position: { x: 250, y: 50 },
          data: {
            label: nodeData.label,
            isConfigured: false,
            onAddActionNode: handleAddActionNode,
          },
        },
      ]);
    },
    [setNodes, handleAddActionNode],
  );
  console.log(nodes);
  return (
    <div className="flex h-screen gap-4">
      <ReactFlowProvider>
        <div className="w-full bg-gray-50 border-r border-gray-200">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            edgeTypes={{
              smoothstep: SmoothStepEdge, // Explicitly include this
              default: BezierEdge,        // Default fallback
            }}
            connectionLineType="smoothstep"
          >
            <Controls />
            <Background />
            <Panel position="top-right">
              <h1 className="text-xl font-bold">Automation Editor</h1>
            </Panel>
          </ReactFlow>
        </div>
        <TriggerComponent handleClick={showTriggerNode} />
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowEditor;
