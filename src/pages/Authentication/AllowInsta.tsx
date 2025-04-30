import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InstagramConsent: React.FC = () => {
  const navigate = useNavigate();
  const handleAllow = () => {
    navigate('/auth/profile');
  };

  const handleCancel = () => {
    navigate(-1); // Better UX than alert for cancel action
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-lg overflow-hidden">
        {/* Instagram-style header */}
        <div className="bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] p-4 text-center">
          <FaInstagram size={32} className="text-white mx-auto" />
        </div>

        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Continue Connecting to Instagram
          </h2>
          <p className="text-gray-600 mb-6">
            You previously connected{' '}
            <span className="font-medium text-blue-600">YourApp</span> to your Instagram account.
          </p>

          {/* Instagram-style mockup */}
          <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6 mx-auto max-w-xs">
            <div className="absolute top-2 left-2 flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#833AB4] to-[#E1306C] flex items-center justify-center">
                <FaInstagram size={24} className="text-white" />
              </div>
            </div>
            <p className="mt-4 text-sm font-medium">instagram.com/yourusername</p>
            <p className="text-xs text-gray-500 mt-1">Last connected: Today</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleAllow}
              className="w-full bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] hover:opacity-90 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md"
            >
              Continue Access
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            By continuing, you allow YourApp to access your profile info and media.
            <br />
            <a href="#" className="underline hover:text-gray-700">
              Privacy Policy
            </a>{' '}
            ·{' '}
            <a href="#" className="underline hover:text-gray-700">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstagramConsent;