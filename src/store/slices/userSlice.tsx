import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserType {
  userData: {
    role: string;
    authority: boolean;
    nodes: any[];
    token: string;
    info: any;
  };
}

const initialState: UserType = {
  userData: {
    role: '',
    authority: false,
    token: '',
    info: null,
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
    setUserInfo: (state, action: PayloadAction<string>) => {
      state.userData.info = action.payload;
    },
  },
});

export const {
  setRole,
  resetRole,
  setAuthority,
  setAutomationData,
  setToken,
  setUserInfo,
} = userSlice.actions;

export default userSlice.reducer;
