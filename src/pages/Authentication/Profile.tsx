import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  setAuthority,
  setRole,
  setToken,
  setUserInfo,
} from '../../store/slices/userSlice';

const options = [
  { label: 'Creator', emoji: '🎨' },
  { label: 'E-commerce', emoji: '🛒' },
  { label: 'Local Business', emoji: '🏪' },
  { label: 'Fitness & Wellness', emoji: '💪' },
  { label: 'Public Figure', emoji: '🌟' },
  { label: 'Beauty & Lifestyle', emoji: '💄' },
  { label: 'Institution / NGO', emoji: '🏛️' },
  { label: 'Hospitality & Travel', emoji: '✈️' },
  { label: 'Food & Beverage', emoji: '🍴' },
  { label: 'Education', emoji: '📚' },
  { label: 'Technology', emoji: '💻' },
  { label: 'Healthcare', emoji: '🏥' },
];

const ProfileSelector: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSelection = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  // const handleNext = () => {
  //   if (selected.length === 0) return;
  //   setIsSubmitting(true);
  //   // Simulate API call
  //   setTimeout(() => {
  //     alert('Selected categories: ' + selected.join(', '));
  //     setIsSubmitting(false);
  //   }, 800);
  // };

  async function sendData() {
    fetch('https://instautomate.it-waves.com/meta/exchange-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: searchParams.get('code'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // dispatch(setAuthority(data.authority));
        // dispatch(setRole(data.userName));
        dispatch(setUserInfo(data.userInfo));
        dispatch(setToken(data.jwtToken));
        navigate('/');
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Content */}
        <div className="p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tell us about yourself
            </h1>
            <p className="text-gray-600">
              Select all that apply to help us customize your experience
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {options.map((option) => (
              <button
                key={option.label}
                onClick={() => toggleSelection(option.label)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  selected.includes(option.label)
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
              >
                <span className="text-2xl mb-2">{option.emoji}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {selected.length}{' '}
              {selected.length === 1 ? 'category' : 'categories'} selected
            </span>
            <button
              onClick={sendData}
              disabled={selected.length === 0 || isSubmitting}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                selected.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Continue'}
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block relative bg-gradient-to-br from-indigo-500 to-purple-600">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          <div className="relative h-full flex flex-col justify-center p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Find your perfect audience
            </h2>
            <p className="text-lg mb-8">
              We'll help you connect with the right people based on your profile
              choices
            </p>
            <div className="flex space-x-2">
              {selected.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-white/20 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
              {selected.length > 3 && (
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  +{selected.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;

// https://a46a-2409-40d1-ad-71a5-71dd-e5c-bba-f803.ngrok-free.app/auth/profile?code=AQCbWvpaE93HzIDT0RCeYgphihXB0c9HcXdyMWLTVvw-iJF1F1F_MMVpgYt6ZrvJ31bAfu1mQeyTen4kWEJFsT0-eARVb70Gasf--1tTyKTXDbBO290M2cyxCgwOujveFNhkZyJuU9wWQ5eKMqf83w7zHxSXVtpUTHTzGDYXynrmWQWdDnEky2FgBZAcZOt8EVUuiktA26buqkPI2_QI33LaT3ogNekbAEwrrkdk6f6vKQ#_
