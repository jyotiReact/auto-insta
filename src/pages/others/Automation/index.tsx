import React, { useEffect, useState } from 'react';
import {
  FiSearch,
  FiPlus,
  FiClock,
  FiActivity,
  FiPower,
  FiMoreVertical,
} from 'react-icons/fi';
import Select from 'react-select';
import { formatDate } from '../../../utils';
import axios from 'axios';

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
  const [selectedStatus, setSelectedStatus] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YVVzZXJJZCI6IjE3ODQxNDcyNjkzMDc5NjAxIiwiaWF0IjoxNzQ2NDMzMTg0LCJleHAiOjE3NDcwMzc5ODR9.Mp5Ci1YROqKvbuZ4y1SmgdC0cixtctEISH7TwFHltRU';

    function fetchAutomations() {
      axios
        .get('https://instautomate.it-waves.com/user/get-automation', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          params: selectedStatus
            ? { statusType: selectedStatus === 'all' ? '' : selectedStatus }
            : {},
        })
        .then((response) => {
          setAutomations(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error:', error.response?.data || error.message);
        });
    }

    fetchAutomations();
  }, [selectedStatus]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-4 border-b border-pink-400">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Automation Workflows
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Manage your automated workflows with ease
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          {/* <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-pink-600" />
            </div>
            <input
              type="text"
              placeholder="Search automations..."
              className="block w-full pl-10 pr-3 py-2 border border-pink-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}

          {/* Status Select Dropdown */}
          <div className="w-full sm:w-48">
            <Select
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'LIVE', label: 'Live' },
                { value: 'DRAFT', label: 'Draft' },
              ]}
              defaultValue={{ value: 'all', label: 'All Statuses' }}
              onChange={(selectedOption) => {
                // Handle status filter change
                setSelectedStatus(selectedOption.value);
                console.log('Status changed:', selectedOption);
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#f9a8d4', // pink-300
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  minHeight: '42px',
                  '&:hover': {
                    borderColor: '#ec4899', // pink-500
                  },
                  '&:focus-within': {
                    borderColor: '#ec4899',
                    boxShadow: '0 0 0 2px rgba(236, 72, 153, 0.25)',
                  },
                }),
                option: (base, { isFocused, isSelected }) => ({
                  ...base,
                  backgroundColor: isSelected
                    ? '#ec4899' // pink-500
                    : isFocused
                    ? '#fce7f3' // pink-100
                    : undefined,
                  color: isSelected ? 'white' : undefined,
                }),
              }}
              className="text-sm"
            />
          </div>

          <a href="/automations-new" className="w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 w-full sm:w-auto hover:-translate-y-1 hover:shadow-lg">
              <FiPlus className="text-lg" />
              <span>New Automation</span>
            </button>
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-pink-200 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              Total Automations
            </h3>
            <span className="text-2xl font-bold text-gray-800">
              {automations?.totalAutomationCount}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-pink-200 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              Active Automations
            </h3>
            <span className="text-2xl font-bold text-pink-600">
              {automations?.liveAutomationCount}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-pink-200 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">In Draft</h3>
            <span className="text-2xl font-bold text-pink-400">
              {automations?.draftAutomationCount}
            </span>
          </div>
        </div>
      </div>

      {/* Automation Table */}
      <div className="bg-white rounded-xl border border-pink-200 shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-gradient-to-r from-white to-pink-50 p-4 font-medium text-gray-600 text-sm uppercase tracking-wider border-b border-pink-100">
          <div className="col-span-5">Automation</div>
          <div className="col-span-2 flex items-center gap-1">
            <FiActivity className="text-pink-600" />
            <span>Status</span>
          </div>
          <div className="col-span-2 flex items-center gap-1">
            <FiPower className="text-pink-600" />
            <span>Runs</span>
          </div>
          <div className="col-span-2 flex items-center gap-1">
            <FiClock className="text-pink-600" />
            <span>Last Run</span>
          </div>
          <div className="col-span-1"></div>
        </div>

        {/* Table Rows */}
        {automations?.automations?.length > 0 ? (
          automations?.automations?.map((automation) => (
            <div
              key={automation._id}
              className="grid grid-cols-12 p-4 border-b border-pink-100 last:border-b-0 hover:bg-pink-50 transition-all duration-150"
            >
              <div className="col-span-5 font-semibold text-gray-800">
                {automation.automationName}
              </div>

              <div className="col-span-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    automation.status === 'LIVE'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {automation.status}
                </span>
              </div>

              <div className="col-span-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    automation.runs === 'Live'
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {automation.runs}
                </span>
              </div>

              <div className="col-span-2 text-sm text-gray-600">
                {formatDate(automation?.lastRunAt, { format: 'full' }) ||
                  'Not Published'}
              </div>

              <div className="col-span-1 flex justify-end">
                <button className="text-pink-600 hover:text-pink-700 p-1 rounded-full hover:bg-pink-100 transition-all duration-200 hover:scale-110">
                  <FiMoreVertical />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-600 mb-2">No automations found</div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-pink-600 hover:text-pink-700 text-sm font-medium transition-colors duration-200"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Showing 1 to {automations.length} of {automations.length} automations
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-pink-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-pink-50 hover:text-pink-600 transition-all duration-200">
            Previous
          </button>
          <button className="px-3 py-1 border border-pink-300 rounded-md text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 transition-all duration-200">
            1
          </button>
          <button className="px-3 py-1 border border-pink-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-pink-50 hover:text-pink-600 transition-all duration-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomationList;
