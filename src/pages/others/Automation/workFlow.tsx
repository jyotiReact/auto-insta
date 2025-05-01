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
} from 'reactflow';
import 'reactflow/dist/style.css';
import TriggerComponent from './RightPannel';
import Workflow from './WorkflowCanvas';

interface TriggerNodeData {
  label: string;
  isConfigured: boolean;
  onAddActionNode?: (triggerId: string) => void;
}

interface ActionInput {
  label: string;
}

interface ActionNodeData {
  label: string;
  inputs: ActionInput[];
}

type CustomNodeData = TriggerNodeData | ActionNodeData;

// Custom Node Components
const DefaultNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <div className="px-4 py-10 rounded-xl bg-white border-2 shadow-md w-72 transition-all border-pink-500">
    <div>
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 24 24"
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
      !isActive ? 'border-pink-500' : 'border-gray-200'
    }`}
  >
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-pink-100 text-pink-600 rounded-full px-3 py-1 text-xs font-medium">
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
      className="mt-3 w-full py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors duration-200"
      onClick={() => data.onAddActionNode?.(id)}
    >
      Add Next Node
    </button>
  </div>
);

const ActionNode: React.FC<{ data: ActionNodeData }> = ({ data }) => (
  <div className="relative px-4 py-3 rounded-xl bg-white border-2 shadow-md w-72 transition-all border-pink-500">
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
    </div>
  </div>
);

// Define node types
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
  const [activeTab, setActiveTab] = useState('Editor');
  const [isDraft, setIsDraft] = useState(false);
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

    if (yPos.current) {
      const newEdge: Edge = {
        id: `edge-${Date.now()}`,
        source: `trigger-${Date.now()}`,
        target: newNodeId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#E1306C', strokeWidth: 3 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#E1306C' },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    }

    setNodes((nds) => [...nds, newNode]);
    lastNodeId.current = newNodeId;

    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.5, duration: 300 });
    }, 100);
  }, [reactFlowInstance, setNodes, setEdges]);

  const onConnect = useCallback(
    (paramsEveryone: Edge | Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            style: { stroke: '#E1306C', strokeWidth: 3 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#E1306C' },
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

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center  justify-between px-6 py-4 bg-white border-b border-pink-100 ">
        {/* Left Tabs */}
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('Editor')}
            className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              activeTab === 'Editor'
                ? 'text-pink-700 border-b-2 border-pink-500'
                : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
            } focus:outline-none focus:ring-2 focus:ring-pink-200`}
          >
            Editor
            {activeTab === 'Editor' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('Runs')}
            className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              activeTab === 'Runs'
                ? 'text-pink-700 border-b-2 border-pink-500'
                : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
            } focus:outline-none focus:ring-2 focus:ring-pink-200`}
          >
            Runs
            {activeTab === 'Runs' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></span>
            )}
          </button>
        </div>

        {/* Right Toggle */}
        <div className="flex items-center space-x-4">
          <span
            className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 shadow-sm ${
              isDraft
                ? 'bg-purple-100 text-purple-600'
                : 'bg-pink-100 text-pink-600'
            }`}
          >
            {isDraft ? 'Draft' : 'Published'}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDraft}
              onChange={() => setIsDraft(!isDraft)}
              aria-label={isDraft ? 'Switch to Published' : 'Switch to Draft'}
            />
            <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500 transition-all duration-300"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 peer-checked:translate-x-6"></div>
          </label>
        </div>
      </div>
      <div className="flex gap-4 w-full h-full">
        <Workflow />
        <TriggerComponent handleClick={showTriggerNode} />
      </div>
    </div>
  );
};

export default WorkflowEditor;
