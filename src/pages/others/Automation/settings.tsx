import {
  faComments,
  faEnvelope,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trigger } from '../../../types/triggerForm';

export const nodesDataFormat = {
  trigger: {
    contentThumbnail: [''],
    excludeKeywords: [],
    likeComment: false,
    type: 'INSTAGRAM_POST_REEL',
    position: { x: 0, y: 0 },
    measured: { width: 300, height: 488 },
  },
  // checkFollowing: true,
  // followingMessage: {
  //   type: 'button',
  //   text: 'Please follow me to get the link.',
  //   buttons: [
  //     {
  //       type: 'web_url',
  //       url: 'https://www.instagram.com/your_profile/',
  //       title: 'Visit Profile',
  //     },
  //     {
  //       type: 'postback',
  //       title: "I'm following :white_tick:",
  //     },
  //   ],
  // },
  // instagramCardMessage: {
  //   type: 'generic',
  //   title: 'Here is your link!',
  //   subTitle: 'Click below to access.',
  //   imageUrl:
  //     'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Felephant%2F&psig=AOvVaw2a7EgRRNyMd9Kq2V5z3gWe&ust=1746515407570000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKj30oXji40DFQAAAAAdAAAAABAQ',

  //   buttons: [
  //     {
  //       type: 'web_url',
  //       url: 'https://example.com/link',
  //       title: 'Get Link',
  //     },
  //   ],
  // },
  // instagramTextBtnMessage: {
  //   type: 'button',
  //   text: 'Please follow me to get the link.',
  //   buttons: [
  //     {
  //       type: 'web_url',
  //       url: 'https://www.instagram.com/your_profile/',
  //       title: 'Visit Profile',
  //     },
  //     {
  //       type: 'postback',
  //       title: "I'm following :white_tick:",
  //     },
  //   ],
  // },
  // openingMessage: {
  //   type: 'button',
  //   text: 'Please follow me to get the link.',
  //   buttons: [
  //     {
  //       type: 'web_url',
  //       url: 'https://www.instagram.com/your_profile/',
  //       title: 'Visit Profile',
  //     },
  //     {
  //       type: 'postback',
  //       title: "I'm following :white_tick:",
  //     },
  //   ],
  // },
  actionPosition: { x: 0, y: 0 },
};
export const triggers: Trigger[] = [
  {
    label: 'Post or Reel Comments',
    icon: (
      <FontAwesomeIcon icon={faComments} className="text-xl text-pink-600" />
    ),
    type: 'INSTAGRAM_POST_REEL',
  },
  {
    label: 'Story Replies',
    icon: (
      <FontAwesomeIcon icon={faEnvelope} className="text-xl text-pink-600" />
    ),
    type: 'INSTAGRAM_STORY_REPLIES',
  },
  {
    label: 'Live Comments',
    icon: <FontAwesomeIcon icon={faVideo} className="text-xl text-gray-400" />,
    disabled: true,
    comingSoon: true,
    type: 'INSTAGRAM_LIVE_COMMENTS',
  },
];

export const actions: Trigger[] = [
  {
    label: 'Send Instagram Message',
    icon: (
      <FontAwesomeIcon icon={faComments} className="text-xl text-pink-600" />
    ),
  },
  {
    label: 'Collect User Emails',
    icon: <FontAwesomeIcon icon={faVideo} className="text-xl text-gray-400" />,
    disabled: true,
    comingSoon: true,
  },
];
