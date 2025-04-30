import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserType {
  userData: {
    role: string;
    authority: boolean;
  };
}

const initialState: UserType = {
  userData: {
    role: '',
    authority: false,
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
      state.userData.authority=false;
    },
    setAuthority: (state, action: PayloadAction<boolean>) => {
      state.userData.authority = action.payload;
    },
  },
});

export const { setRole, resetRole, setAuthority } = userSlice.actions;

export default userSlice.reducer;
