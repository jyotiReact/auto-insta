import { useState } from 'react';
import userSix from '../../../images/user/user-06.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../utils';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(userSix);
  const userData = useSelector((state: any) => state.user.userData.info);

  // const handleProfileImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => setProfileImage(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleCoverImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => setCoverImage(reader?.result);
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <>
      <div className="overflow-hidden border border-gray-100 bg-white shadow-2xl">
        <div className="relative z-20 h-40 md:h-60">
          <div className="h-full w-full  bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 backdrop-blur-sm"></div>
        </div>
        <div className="px-6 pb-8 text-center font-sans lg:pb-10 xl:pb-12">
          <div className="relative z-30 mx-auto -mt-24 h-32 w-32 rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 p-2 shadow-lg sm:h-40 sm:w-40 sm:p-3">
            <div className="relative drop-shadow-xl rounded-full border-4 border-white">
              <img
                src={userData?.profile_picture_url || profileImage}
                alt="profile"
                className="h-full w-full rounded-full object-cover"
              />
              {/* <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white transition-transform hover:scale-110 sm:bottom-0 sm:right-0"
              >
                <FontAwesomeIcon icon={faCamera} />
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                  onChange={handleProfileImageChange}
                />
              </label> */}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 text-3xl font-extrabold text-gray-900">
              {userData?.username || 'Danish Heilium'}
            </h3>
            <p className="text-lg font-medium text-gray-600">
              {' '}
              {userData?.account_type || 'User'}
            </p>
            <div className="mx-auto mt-6 mb-8 grid max-w-md grid-cols-3 rounded-lg border border-gray-100 bg-gray-50 py-4 shadow-sm">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-gray-100 px-4">
                <span className="font-semibold text-gray-900">
                  {' '}
                  {formatNumber(userData?.media_count) || '0'}
                </span>
                <span className="text-sm text-gray-600">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-gray-100 px-4">
                <span className="font-semibold text-gray-900">
                  {' '}
                  {formatNumber(userData?.followers_count) || '0'}
                </span>
                <span className="text-sm text-gray-600">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4">
                <span className="font-semibold text-gray-900">
                  {' '}
                  {formatNumber(userData?.follows_count) || '0'}
                </span>
                <span className="text-sm text-gray-600">Following</span>
              </div>
            </div>

            {/* <div className="mx-auto max-w-lg">
              <h4 className="mb-4 text-xl font-semibold text-gray-900">
                About Me
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque posuere fermentum urna, eu condimentum mauris
                tempus ut. Donec fermentum blandit aliquet.
              </p>
            </div> */}

            {/* <div className="mt-8">
              <h4 className="mb-4 text-xl font-semibold text-gray-900">
                Follow Me
              </h4>
              <div className="flex items-center justify-center gap-5">
                <Link
                  to="#"
                  className="text-gray-600 transition-transform hover:scale-110 hover:text-pink-500"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </Link>
                <Link
                  to="#"
                  className="text-gray-600 transition-transform hover:scale-110 hover:text-pink-500"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </Link>
                <Link
                  to="#"
                  className="text-gray-600 transition-transform hover:scale-110 hover:text-pink-500"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </Link>
                <Link
                  to="#"
                  className="text-gray-600 transition-transform hover:scale-110 hover:text-pink-500"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
