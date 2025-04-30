import React, { useState } from 'react';
import { FiSearch, FiPlus, FiClock, FiActivity, FiPower, FiEdit2, FiMoreVertical } from 'react-icons/fi';

const AutomationList: React.FC = () => {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: 'Welcome Email Sequence',
      runs: 'Live',
      status: 'Active',
      lastPublished: '21 minutes ago',
      lastRun: '5 minutes ago',
    },
    {
      id: 2,
      name: 'Abandoned Cart Reminder',
      runs: 'Draft',
      status: 'Inactive',
      lastPublished: 'Not Published',
      lastRun: 'Never run',
    },
    {
      id: 3,
      name: 'Post-Purchase Follow-up',
      runs: 'Live',
      status: 'Active',
      lastPublished: '2 hours ago',
      lastRun: '30 minutes ago',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredAutomations = automations.filter((automation) =>
    automation.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Automation Workflows</h1>
          <p className="text-gray-500 mt-1">Manage your automated workflows and processes</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search automations..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <a href="/automations-new" className="w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto">
              <FiPlus className="text-lg" />
              <span>New Automation</span>
            </button>
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Automations</h3>
            <span className="text-2xl font-bold text-gray-800">{automations.length}</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Active Automations</h3>
            <span className="text-2xl font-bold text-indigo-600">
              {automations.filter(a => a.status === 'Active').length}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">In Draft</h3>
            <span className="text-2xl font-bold text-yellow-500">
              {automations.filter(a => a.runs === 'Draft').length}
            </span>
          </div>
        </div>
      </div>

      {/* Automation Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-gray-50 p-4 font-medium text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
          <div className="col-span-5">Automation</div>
          <div className="col-span-2 flex items-center gap-1">
            <FiActivity className="text-gray-400" />
            <span>Status</span>
          </div>
          <div className="col-span-2 flex items-center gap-1">
            <FiPower className="text-gray-400" />
            <span>Runs</span>
          </div>
          <div className="col-span-2 flex items-center gap-1">
            <FiClock className="text-gray-400" />
            <span>Last Run</span>
          </div>
          <div className="col-span-1"></div>
        </div>

        {/* Table Rows */}
        {filteredAutomations.length > 0 ? (
          filteredAutomations.map((automation) => (
            <div
              key={automation.id}
              className="grid grid-cols-12 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="col-span-5 font-medium text-gray-800">
                {automation.name}
              </div>
              
              <div className="col-span-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  automation.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {automation.status}
                </span>
              </div>
              
              <div className="col-span-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  automation.runs === 'Live'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {automation.runs}
                </span>
              </div>
              
              <div className="col-span-2 text-sm text-gray-600">
                {automation.lastRun}
              </div>
              
              <div className="col-span-1 flex justify-end">
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                  <FiMoreVertical />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">No automations found</div>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing 1 to {filteredAutomations.length} of {automations.length} automations
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomationList;
