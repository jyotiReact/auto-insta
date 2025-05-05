import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setAutomationData } from '../../../store/slices/userSlice';

interface Keyword {
  id: string;
  text: string;
  isActive: boolean;
}

interface SetupKeywordsModalProps {
  tempKeywords: Keyword[];
  setTempKeywords: (keywords: Keyword[]) => void;
  setSelectedKeywords: (keywords: Keyword[]) => void;
  selectedKeywords: Keyword[];
  nodesData: any[];
  closeModal: () => void;
}

const SetupKeywordsModal: React.FC<SetupKeywordsModalProps> = ({
  tempKeywords,
  setTempKeywords,
  setSelectedKeywords,
  selectedKeywords,
  nodesData,
  closeModal,
  setNodesData,
}) => {
  const [keywordInput, setKeywordInput] = useState('');
  const dispatch = useDispatch();

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      const newKeywords = keywordInput
        .split(',')
        .map((text) => text.trim())
        .filter((text) => text.length > 0)
        .map((text, index) => ({
          id: `kw-${Date.now()}-${index}`,
          text,
          isActive: true,
        }));
      setTempKeywords([...tempKeywords, ...newKeywords]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (id: string) => {
    setTempKeywords(tempKeywords.filter((kw) => kw.id !== id));
  };

  const handleSaveKeywords = () => {
    setSelectedKeywords([...selectedKeywords, ...tempKeywords]);

    setNodesData({
      ...nodesData,
      trigger: {
        ...nodesData.trigger,
        anyContent: tempKeywords.length === 0,
        anyKeyword: tempKeywords.length === 0,
        includeKeywords: tempKeywords.map((kw) => kw.text.toLowerCase()),
      },
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl animate-fade-in border border-pink-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Setup Keywords</h3>
          <button
            onClick={closeModal}
            className="text-pink-600 hover:text-pink-700 transition-all duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Keywords are not case-sensitive. Type keywords separated by commas.
        </p>
        <div className="mb-4">
          <textarea
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Type keywords separated by commas (e.g., discount, promo, sale)"
            className="w-full px-4 py-2 bg-pink-50 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            rows={3}
          />
          <button
            onClick={handleAddKeyword}
            className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
          >
            Add Keywords
          </button>
        </div>
        <div className="border-t border-pink-200 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Selected Keywords
          </h4>
          {tempKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {tempKeywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className="inline-flex items-center bg-pink-50 rounded-full px-3 py-1 text-sm text-gray-800 shadow-sm hover:bg-pink-100 transition-all duration-200"
                >
                  {keyword.text}
                  <button
                    onClick={() => handleRemoveKeyword(keyword.id)}
                    className="ml-2 text-pink-600 hover:text-pink-800 hover:scale-110 transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No keywords added yet</p>
          )}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveKeywords}
            disabled={tempKeywords.length === 0}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              tempKeywords.length > 0
                ? 'bg-pink-600 text-white hover:bg-pink-700 hover:-translate-y-1 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm Keywords
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupKeywordsModal;
