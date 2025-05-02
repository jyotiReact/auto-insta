import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserType {
  userData: {
    role: string;
    authority: boolean;
    nodes: any[];
  };
}

const initialState: UserType = {
  userData: {
    role: '',
    authority: false,
    token: '',
    nodes: [
      {
        data: {
          any_content: false,
          any_keyword: false, //if there is no keywords send true
          content_caption: '',
          content_id: ['17951829098950170'], //post id
          content_thumbnail: [
            'https://in.imitari.app/zorcha/workspaces/1745995793886-blob', //post url
          ],
          exclude_keywords: [],
          include_keywords: ['love'], //keywords
          next_content: false,
          permalink: ['https://www.instagram.com/p/DJD1XfIPeNG/'], //post url
          public_replies: [], //send replies
          react_with_heart: false,
          type: 'INSTAGRAM_POST_REEL',
        },
        id: 'trigger',
        position: { x: -135, y: -195 },
        type: 'trigger',
      },
      {
        data: {
          check_following: false,
          check_following_message: null,
          instagram_message: { attachment: null, text: 'hii' },
          opening_message: null,
          type: 'SEND_INSTAGRAM_DM',
        },
        id: '78b473db-3ace-4a48-a6e6-8bd46e9642d7',
        position: { x: 15, y: 55 },
        type: 'instagram_action',
      },
    ],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.userData.role = action.payload;
    },
    resetRole: (state) => {
      state.userData.role = '';
      state.userData.authority = false;
    },
    setAuthority: (state, action: PayloadAction<boolean>) => {
      state.userData.authority = action.payload;
    },
    setAutomationData: (state, action: PayloadAction<any>) => {
      state.userData.nodes = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.userData.token = action.payload;
    },
  },
});

export const { setRole, resetRole, setAuthority, setAutomationData, setToken } =
  userSlice.actions;

export default userSlice.reducer;
