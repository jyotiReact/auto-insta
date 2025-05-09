import React, { useState, useCallback, useEffect } from 'react';
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
import { TriggerNode } from './TriggerNode';
import { ActionNode } from './ActionNode';
import { DefaultNode } from './DefaultNode';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { nodesDataFormat } from './settings';
import TriggerFormInputs from './TriggerFormInputs';
import NextStepComponent from './NextStepComponent';
import { getApi, postApi } from '../../../services/commonServices';
import CustomToast from '../../../components/uiElements/CustomToast';

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
      background: 'transparent',
      // border: '2px solid #E1306C',
      border: 'none',
      borderRadius: '12px',
      color: '#E1306C',
      fontWeight: '600',
      fontSize: '14px',
      boxShadow: '0',
      width: '280px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
];

const initialEdges: Edge[] = [];

const WorkflowEditor: React.FC = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [isDraft, setIsDraft] = useState(false);
  const [triggerId, setTriggerId] = useState<string | null>(`trigger-123`);

  const [buttons, setButtons] = useState([]);
  const [preview, setPreview] = useState(null);
  const [selectedTrigger, setSelectedTrigger] = useState<boolean>(false);
  const [triggerType, setTriggerType] = useState<string | null>(null);
  const [showNextNode, setShowNextNode] = useState(false);
  const [showNextForm, setShowNextForm] = useState(false);
  const { automationId } = useParams();
  const [nodesData, setNodesData] = useState(nodesDataFormat);
  const navigate = useNavigate();
  function handleAddNode() {
    const actionId = `action-${Date.now()}`;
    const newActionNode = {
      id: actionId,
      type: 'action',
      position: { x: 250, y: 250 },
      data: {
        label: '',
        isConfigured: false,
        icon: faPlus,
        style: {
          background: 'bg-gradient-to-br from-pink-100 to-purple-100',
          borderColor: 'border-pink-200',
          buttonColor: 'bg-pink-500',
          buttonHoverColor: 'hover:bg-pink-600',
          buttonRingColor: 'focus:ring-pink-400',
          width: '200px',
        },
      },
      selected: true,
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
                selected: false,
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

    setShowNextNode(true);
  }

  const showTriggerNode = () => {
    console.log('hittted');
    setNodes((prevNodes) => {
      const triggerUpdatedNodes = prevNodes.map((node) => {
        if (node.type === 'trigger') {
          return {
            ...node,
            data: {
              ...node.data,
              isFirstTrigger: false,
              handleClickNode: handleAddNode,
            },
          };
        }
        return node;
      });

      const filteredNodes = triggerUpdatedNodes.filter(
        (node) => node.type !== 'default',
      );

      const newTriggerNode: Node = {
        id: triggerId,
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: {
          label: 'Post or Reel Comments',
          isConfigured: false,
          isFirstTrigger: true,
          onAddActionNode: handleAddNode,
        },
        selected: true,
      };

      return [...filteredNodes, newTriggerNode];
    });
  };

  async function AddAutomations() {
    try {
      const { uploadedFile, preview, ...rest } = nodesData;
      const formData = new FormData();

      if (uploadedFile) {
        formData.append('file', uploadedFile);
      }
      formData.append(
        'automation',
        JSON.stringify({
          ...rest,
          trigger: { ...rest.trigger, triggerType: triggerType },
          status: isDraft ? 'LIVE' : 'DRAFT',
          ...(automationId && { automationId: automationId }),
        }),
      );

      await postApi('user/add-automation', formData).then((res) => {
        if (res) {
          navigate('/automations');
        }
      });
    } catch (error) {
      console.error('Error adding automation:', error);
    }
  }

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

  useEffect(() => {
    async function fetchAutomations() {
      try {
        const data = await getApi('user/get-automation', {
          automationId,
        });
        setNodesData(data.automations[0]);
        setSelectedTrigger(true);
        setTriggerType(data.automations[0].trigger.type);

        // Update nodes with the loaded automation data
        setNodes((prevNodes) => {
          const triggerNode = {
            id: triggerId,
            type: 'trigger',
            position: { x: 250, y: 50 },
            data: {
              label: 'Post or Reel Comments',
              isConfigured: true, // Existing automation is already configured
              isFirstTrigger: false,
              onAddActionNode: handleAddNode,
            },
            selected: true,
          };

          // Remove default node and add trigger node
          const filteredNodes = prevNodes.filter(
            (node) => node.type !== 'default',
          );
          return [...filteredNodes, triggerNode];
        });

        // Handle action nodes if they exist
        if (
          data.automations[0]?.instagramTextBtnMessage ||
          data.automations[0]?.instagramCardMessage
        ) {
          setShowNextForm(true);
          handleAddNode();
          setNodes((prevNodes) => {
            return prevNodes.map((node) => {
              if (node.type === 'action') {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    label: 'Send Instagram Message',
                    isConfigured: true,
                  },
                };
              }
              return node;
            });
          });
        }
        setShowNextNode(false);
      } catch (error) {
        console.error('Error fetching automations:', error);
      }
    }

    automationId && fetchAutomations();
  }, [automationId]);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (!event || event.type !== 'click') return;
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          selected: n.id === node.id,
        })),
      );

      // setSelectedNode(node);

      if (event.isTrusted) {
        switch (node.type) {
          case 'trigger':
            setShowNextNode(false);

            break;
          case 'action':
            setShowNextNode(true);

            break;
          default:
            break;
        }
      }
    },
    [setNodes],
  );
  function handlePublishToggle() {
    const data = nodesData?.trigger;
    const hasValidTextMessage = nodesData?.instagramTextBtnMessage?.text;
    const hasValidCardMessage = nodesData?.instagramCardMessage?.title;

    if (!data?.mediaLink?.length) {
      return CustomToast(' Please select at least one post or reel.');
    }

    if (!data?.includeKeywords?.length) {
      return CustomToast('Please Select at least one keyword.');
    }

    if (!hasValidTextMessage && !hasValidCardMessage) {
      return CustomToast('Please add instagram DM block to send messages.');
    }

    // All checks passed
    // AddAutomations();
    setIsDraft(!isDraft);
  }
  console.log(nodesData);
  return (
    <div className="  flex flex-col h-screen">
      <div className="flex items-center border-b border-pink-200 justify-end sticky right-0 top-0 p-2 left-[240px] bg-white gap-4 h-[60px]">
        {/* Draft status toggle (existing code) */}
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 shadow-sm ${
              automationId
                ? nodesData?.status === 'DRAFT'
                  ? 'bg-pink-100 text-pink-600'
                  : 'bg-purple-100 text-purple-600'
                : isDraft
                ? 'bg-purple-100 text-purple-600'
                : 'bg-pink-100 text-pink-600'
            }`}
          >
            {automationId
              ? nodesData?.status === 'LIVE'
                ? 'Published'
                : 'Draft'
              : isDraft
              ? 'Published'
              : 'Draft'}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={
                automationId
                  ? nodesData?.status === 'LIVE'
                    ? true
                    : false
                  : isDraft
              }
              onChange={handlePublishToggle}
              aria-label={isDraft ? 'Switch to Published' : 'Switch to Draft'}
            />
            <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500 transition-all duration-300"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 peer-checked:translate-x-6"></div>
          </label>
        </div>

        {/* New Save and Exit button */}
        {!automationId && (
          <button
            onClick={() => {
              // Add your save and exit logic here
              AddAutomations();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save and Exit
          </button>
        )}
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
          onNodeClick={onNodeClick}
        >
          <Background variant="dots" gap={16} size={1} color="pink" />
          <Controls />
        </ReactFlow>

        {showNextNode ? (
          <NextStepComponent
            setNodes={setNodes}
            nodesData={nodesData}
            setNodesData={setNodesData}
            setShowNextNode={setShowNextNode}
            setShowNextForm={setShowNextForm}
            showNextForm={showNextForm}
            setButtons={setButtons}
            buttons={buttons}
            setPreview={setPreview}
            preview={preview}
          />
        ) : (
          <TriggerFormInputs
            setNodesData={setNodesData}
            nodesData={nodesData}
            selectedTrigger={selectedTrigger}
            setSelectedTrigger={setSelectedTrigger}
            setNodes={setNodes}
            setShowNextNode={setShowNextNode}
            handleAddNode={handleAddNode}
            setTriggerType={setTriggerType}
            triggerType={triggerType}
            showTriggerNode={showTriggerNode}
          />
        )}
      </div>
    </div>
  );
};

export default WorkflowEditor;
