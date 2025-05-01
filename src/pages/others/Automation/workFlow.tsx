import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Node,
  Edge,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TriggerComponent from './RightPannel';
import { TriggerNode } from './TriggerNode';
import { ActionNode } from './ActionNode';
import { DefaultNode } from './DefaultNode';

// Define node types
const nodeTypes = {
  default: DefaultNode,
  trigger: TriggerNode,
  action: ActionNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 200, y: 200 },
    data: { label: 'Set a trigger in the sidebar', isConfigured: false },
    style: {
      background: '#ffffff',
      border: '2px solid #E1306C',
      borderRadius: '12px',
      color: '#E1306C',
      fontWeight: '600',
      fontSize: '14px',
      boxShadow: '0 4px 6px rgba(225, 48, 108, 0.2)',
      width: '280px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100px',
      textAlign: 'center',
    },
  },
];

const initialEdges: Edge[] = [];

const WorkflowEditor: React.FC = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const [activeTab, setActiveTab] = useState('Editor');
  const [isDraft, setIsDraft] = useState(false);
  const [tempKeywords, setTempKeywords] = useState<string[]>([]);

  const showTriggerNode = useCallback(
    (nodeData: { label: string }) => {
      const triggerId = `trigger-${Date.now()}`;

      setNodes((prevNodes) => {
        // Step 1: Update existing trigger nodes
        const triggerUpdatedNodes = prevNodes.map((node) => {
          if (node.type === 'trigger') {
            return {
              ...node,
              data: {
                ...node.data,
                isFirstTrigger: false,
              },
            };
          }
          return node;
        });

        // Step 2: Filter out default nodes
        const filteredNodes = triggerUpdatedNodes.filter(
          (node) => node.type !== 'default',
        );

        // Step 3: Create new trigger node
        const newTriggerNode: Node = {
          id: triggerId,
          type: 'trigger',
          position: { x: 250, y: 50 },
          data: {
            label: nodeData.label,
            isConfigured: false,
            isFirstTrigger: true,
            keywords: tempKeywords, // Use the latest tempKeywords
            onAddActionNode: () => {
              const actionId = `action-${Date.now()}`;
              const newActionNode: Node = {
                id: actionId,
                type: 'action',
                position: { x: 250, y: 250 },
                data: {
                  label: 'New Action',
                  isConfigured: false,
                },
              };

              setNodes((prev) =>
                prev
                  .map((node) =>
                    node.id === triggerId
                      ? {
                          ...node,
                          data: {
                            ...node.data,
                            isConfigured: true,
                            isFirstTrigger: false,
                          },
                        }
                      : node,
                  )
                  .concat(newActionNode),
              );

              setEdges((prev) => {
                const newEdge: Edge = {
                  id: `e-${triggerId}-${actionId}`,
                  source: triggerId,
                  target: actionId,
                  sourceHandle: 'sourceHandle',
                  targetHandle: 'targetHandle',
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#E1306C',
                  },
                  type: 'smoothstep',
                  style: { stroke: '#E1306C' },
                  animated: true,
                };
                return addEdge(newEdge, prev);
              });
            },
          },
        };

        return [...filteredNodes, newTriggerNode];
      });
    },
    [setNodes, setEdges, tempKeywords], // Add tempKeywords to dependencies
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  console.log('Temp Keywords in WorkflowEditor:', tempKeywords);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between sticky right-0 top-0 p-4 left-[240px]  bg-white">
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
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultViewport={{ zoom: 1.0, x: 0, y: 0 }}
          minZoom={0.5}
        >
          <Background variant="dots" gap={16} size={1} color="pink" />
          <Controls />
        </ReactFlow>
        <TriggerComponent
          handleClick={showTriggerNode}
          tempKeywords={tempKeywords}
          setTempKeywords={setTempKeywords}
        />
      </div>
    </div>
  );
};

export default WorkflowEditor;
