import React from 'react';

interface TriggerComponentProps {
  handleClick: (nodeData: { label: string }) => void;
}

const triggers = [
  {
    id: 'email',
    label: 'Email Trigger',
    description: 'Trigger workflow on new email',
    icon: 'mail',
  },
  {
    id: 'webhook',
    label: 'Webhook',
    description: 'Trigger workflow via API call',
    icon: 'webhook',
  },
  {
    id: 'schedule',
    label: 'Schedule',
    description: 'Trigger workflow on schedule',
    icon: 'clock',
  },
];

const TriggerComponent: React.FC<TriggerComponentProps> = ({ handleClick }) => {
  return (
    <div className="w-80 bg-white p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Select a Trigger</h2>
      <div className="space-y-3">
        {triggers.map((trigger) => (
          <div
            key={trigger.id}
            className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors"
            onClick={() => handleClick({ label: trigger.label })}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'trigger');
              event.dataTransfer.effectAllowed = 'move';
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
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
              </div>
              <div>
                <h3 className="font-medium">{trigger.label}</h3>
                <p className="text-sm text-gray-500">{trigger.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TriggerComponent;