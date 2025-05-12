import { FaInstagram } from 'react-icons/fa';
import { SiMeta } from 'react-icons/si';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectInstagram: React.FC = () => {
  //   const navigate = useNavigate();
  //   const handleConnectClick = (): void => {
  //     navigate(
  //       'https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&cl[…]usiness_content_publish%2Cinstagram_business_manage_insights',
  //     );
  //   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left Section */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <SiMeta className="text-blue-600 text-2xl" />
              <span className="text-sm font-medium text-gray-500">
                META VERIFIED PARTNER
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Boost Your Instagram Presence
            </h1>
            <p className="text-gray-600 text-lg">
              Connect your account to unlock powerful tools for Reels, Stories,
              and audience growth.
            </p>
          </div>
          <a href="https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1222697529293523&redirect_uri=https://insta-automate.netlify.app/auth/profile&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights">
            <button
              // onClick={handleConnectClick}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] hover:from-[#7229a0] hover:via-[#a82b71] hover:to-[#c2275b] text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg w-full max-w-xs"
            >
              <FaInstagram size={20} />
              Connect Instagram Account
            </button>
          </a>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Secure connection · Read-only access · 256-bit encryption
            </p>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 bg-gradient-to-br from-[#f9f9f9] to-[#f0f0f0] flex items-center justify-center p-8">
          <div className="relative w-full h-full min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
              alt="Instagram Reels interface"
              className="absolute inset-0 w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectInstagram;
