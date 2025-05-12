import { Link } from 'react-router-dom';
import { useState } from 'react';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../../images/logo/logo-icon.svg';
import { useSelector } from 'react-redux';
import { postApi } from '../../../services/commonServices';
import toast from 'react-hot-toast';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const userData = useSelector((state: any) => state.user.userData.info);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postApi('user/add-feedback', { feedback }).then((res) => {
        if (res) {
          setFeedback('');
          toast.success('Feedback submitted successfully');
        }
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
    setIsFeedbackOpen(false);
  };

  return (
    <header className="fixed top-0 z-10 flex w-full right-0 left-0 bg-white dark:bg-boxdark border-b border-pink-200 ">
      <div className="flex flex-grow items-center justify-between px-4 py-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* Hamburger Toggle BTN */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              {/* Search button and input (commented out) */}
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Feedback Button */}
            <li>
              <button
                onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
                className="flex items-center gap-2 rounded-lg border border-pink-600  bg-white px-3 py-1.5 text-pink-600 shadow-sm  dark:bg-boxdark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="fill-[#E1306C] dark:fill-[#F06292]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16ZM10 6C8.34 6 7 7.34 7 9H9C9 8.45 9.45 8 10 8C10.55 8 11 8.45 11 9C11 10.1 9.9 10.5 9.4 11.2C9.15 11.55 9 12 9 12.5V13H11V12.5C11 12.1 11.15 11.7 11.4 11.3C12.1 10.3 13 9.9 13 9C13 7.34 11.66 6 10 6Z"
                    fill=""
                  />
                </svg>
                Feedback
              </button>
            </li>
            {/* Feedback Modal */}
            {isFeedbackOpen && (
              <div className="absolute top-16 right-4 z-20 w-80 bg-white dark:bg-boxdark border border-pink-200 rounded-md shadow-lg p-4">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                  Share Your Feedback
                </h3>
                <form onSubmit={handleFeedbackSubmit}>
                  <textarea
                    className="w-full h-24 p-2 border border-stroke dark:border-strokedark rounded-sm bg-transparent text-black dark:text-white focus:outline-none resize-none"
                    placeholder="Type your feedback here..."
                    onChange={(e) => setFeedback(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <button
                      type="button"
                      onClick={() => setIsFeedbackOpen(false)}
                      className="px-3 py-1.5 mr-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-pink-200 text-pink-600 dark:text-white hover:bg-pink-300 dark:hover:bg-pink-400 rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </ul>

          {/* User Area */}
          <DropdownUser user={userData} />
          {/* User Area */}
        </div>
      </div>
    </header>
  );
};

export default Header;
