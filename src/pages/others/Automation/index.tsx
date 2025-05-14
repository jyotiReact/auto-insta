import React, { useEffect, useState } from 'react';
import { FiSearch, FiPlus, FiClock, FiActivity, FiPower } from 'react-icons/fi';
import Select from 'react-select';
import { formatDate } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { getApi } from '../../../services/commonServices';

const AutomationList: React.FC = () => {
  const [automations, setAutomations] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAutomations() {
      try {
        const params = {
          ...(selectedStatus !== 'all' && { statusType: selectedStatus }),
          page: currentPage,
          limit: itemsPerPage,
        };
        const response = await getApi('user/get-automation', params);

        // Handle different API response structures
        const data = Array.isArray(response)
          ? response
          : response.automations || [];
        setAutomations(data);

        // Set counts
        setTotalCount(response.totalAutomationCount || data.length);
        setLiveCount(
          response.liveAutomationCount ||
            data.filter((a) => a.status === 'LIVE').length,
        );
        setDraftCount(
          response.draftAutomationCount ||
            data.filter((a) => a.status === 'DRAFT').length,
        );
      } catch (error) {
        console.error('Error fetching automations:', error);
        setAutomations([]);
        setTotalCount(0);
      }
    }

    fetchAutomations();
  }, [selectedStatus, currentPage, itemsPerPage]);

  // Filter automations based on search term (client-side filtering)
  const filteredAutomations = automations.filter(
    (automation) =>
      automation.automationName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Handle page navigation
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

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
          <div className="relative w-full sm:w-64">
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
          </div>

          {/* Status Select Dropdown */}
          <div className="w-full sm:w-48">
            <Select
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'LIVE', label: 'Live' },
                { value: 'DRAFT', label: 'Draft' },
              ]}
              value={
                selectedStatus
                  ? {
                      value: selectedStatus,
                      label:
                        selectedStatus === 'all'
                          ? 'All Statuses'
                          : selectedStatus,
                    }
                  : { value: 'all', label: 'All Statuses' }
              }
              onChange={(selectedOption) => {
                setSelectedStatus(selectedOption?.value || 'all');
                setCurrentPage(1); // Reset to page 1 on status change
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#f9a8d4',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  minHeight: '42px',
                  '&:hover': {
                    borderColor: '#ec4899',
                  },
                  '&:focus-within': {
                    borderColor: '#ec4899',
                    boxShadow: '0 0 0 2px rgba(236, 72, 153, 0.25)',
                  },
                }),
                option: (base, { isFocused, isSelected }) => ({
                  ...base,
                  backgroundColor: isSelected
                    ? '#ec4899'
                    : isFocused
                    ? '#fce7f3'
                    : undefined,
                  color: isSelected ? 'white' : undefined,
                }),
              }}
              className="text-sm"
            />
          </div>

          <a href="/automations/new-automation" className="w-full sm:w-auto">
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
              {totalCount}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-pink-200 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              Active Automations
            </h3>
            <span className="text-2xl font-bold text-pink-600">
              {liveCount}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-pink-200 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">In Draft</h3>
            <span className="text-2xl font-bold text-pink-400">
              {draftCount}
            </span>
          </div>
        </div>
      </div>

      {/* Automation Table */}
      <div className="bg-white rounded-xl border border-pink-200 shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-10 bg-gradient-to-r from-white to-pink-50 p-4 font-medium text-gray-600 text-sm uppercase tracking-wider border-b border-pink-100">
          <div className="col-span-3">Automation</div>
          <div className="col-span-2 flex items-center gap-1">
            <FiClock className="text-pink-600" />
            <span>Automation Type</span>
          </div>
          <div className="col-span-2 flex items-center gap-1">
            <FiActivity className="text-pink-600" />
            <span>Status</span>
          </div>
          <div className="col-span-1 flex items-center gap-1">
            <FiPower className="text-pink-600" />
            <span>Runs</span>
          </div>
          <div className="col-span-2 flex items-center gap-1">
            <FiClock className="text-pink-600" />
            <span>Last Run</span>
          </div>
        </div>

        {/* Table Rows */}
        {filteredAutomations.length > 0 ? (
          filteredAutomations.map((automation) => (
            <div
              key={automation._id}
              onClick={() => navigate(`/automations/${automation._id}`)}
              className="grid grid-cols-10 p-4 border-b border-pink-100 last:border-b-0 hover:bg-pink-50 transition-all duration-150 cursor-pointer"
            >
              <div className="col-span-3 font-semibold text-gray-800 truncate">
                {automation.automationName || 'Unnamed Automation'}
              </div>
              <div className="col-span-2 text-sm text-gray-600">
                {automation?.trigger?.triggerType === 'INSTAGRAM_POST_REEL'
                  ? 'Reel'
                  : automation?.trigger?.triggerType ===
                    'INSTAGRAM_STORY_REPLIES'
                  ? 'Story'
                  : 'N/A'}
              </div>
              <div className="col-span-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    automation.status === 'LIVE'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {automation.status || 'Unknown'}
                </span>
              </div>
              <div className="col-span-1 text-sm text-gray-600">
                {automation.runs || 0}
              </div>
              <div className="col-span-2 text-sm text-gray-600">
                {automation.lastRunAt
                  ? formatDate(automation.lastRunAt, { format: 'full' })
                  : 'Not Published'}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-600 mb-2">
              {searchTerm
                ? 'No automations match your search'
                : 'No automations found'}
            </div>
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
      {filteredAutomations.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{' '}
            automations
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-pink-300 rounded-md text-sm font-medium transition-all duration-200 ${
                currentPage === 1
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  : 'text-gray-700 bg-white hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              Previous
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border border-pink-300 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'text-white bg-pink-600 hover:bg-pink-700'
                    : 'text-gray-700 bg-white hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-pink-300 rounded-md text-sm font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  : 'text-gray-700 bg-white hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationList;
