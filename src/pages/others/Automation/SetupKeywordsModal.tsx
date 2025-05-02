import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAutomationData } from '../../../store/slices/userSlice';

interface Keyword {
  id: string;
  text: string;
}

interface SetupKeywordsModalProps {
  keywordInput: string;
  tempKeywords: Keyword[];
  handleKeywordInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleAddKeyword: () => void;
  removeTempKeyword: (id: string) => void;
  handleSaveKeywords: () => void;
  closeModal: () => void;
}

const SetupKeywordsModal: React.FC<SetupKeywordsModalProps> = ({
  tempKeywords,
  closeModal,
  setTempKeywords,
  setSelectedKeywords,
  selectedKeywords,
  nodesData,
}) => {
  const [keywordInput, setKeywordInput] = useState('');
  const dispatch = useDispatch();

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      const newKeywords = keywordInput
        .split(',')
        .map((text, index) => ({
          id: `kw-${Date.now()}-${index}`,
          text: text.trim(),
          isActive: true,
        }))
        .filter((kw) => kw?.text?.length > 0);

      setTempKeywords((prev) => [...prev, ...newKeywords]);

      setKeywordInput('');
    }
  };
  const handleKeywordInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKeywordInput(e.target.value);
  };
  const removeTempKeyword = (id: string) => {
    setTempKeywords(tempKeywords.filter((kw) => kw.id !== id));
  };

  const handleSaveKeywords = () => {
    setSelectedKeywords((prev) => {
      const existingTexts = new Set(prev.map((kw) => kw.text.toLowerCase()));
      const newKeywords = tempKeywords.filter(
        (kw) => !existingTexts.has(kw.text.toLowerCase()),
      );
      return [...prev, ...newKeywords];
    });
    const data = {
      data: {
        ...nodesData[0].data,
        any_content: tempKeywords.length > 0 ? false : true,
        any_keyword: tempKeywords.length > 0 ? false : true, //if there is no keywords send true
        include_keywords:
          tempKeywords.length > 0
            ? tempKeywords.map((kw) => kw.text.toLowerCase())
            : [],

        type: 'INSTAGRAM_POST_REEL',
      },
      id: 'trigger',
      position: { x: -135, y: -195 },
      type: 'trigger',
    };
    let updatedNodes = [...nodesData];
    updatedNodes[0] = data;

    dispatch(setAutomationData(updatedNodes));
    closeModal();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center z-50 backdrop-blur-sm">
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
            onChange={handleKeywordInput}
            placeholder="Type keywords separated by commas (e.g., discount, promo, sale)"
            className="w-full px-4 py-2 bg-pink-50 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-600 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
            rows={3}
          />
          <button
            onClick={handleAddKeyword}
            className="mt-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
          >
            Add Keywords
          </button>
        </div>

        <div className="border-t border-pink-200 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Selected Keywords
          </h4>
          {tempKeywords?.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {tempKeywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className="inline-flex items-center bg-pink-50 rounded-full px-3 py-1 text-sm text-gray-800 shadow-sm hover:bg-pink-100 transition-all duration-200"
                >
                  {keyword.text}
                  <button
                    onClick={() => removeTempKeyword(keyword.id)}
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
            disabled={tempKeywords?.length === 0}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              tempKeywords?.length > 0
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
