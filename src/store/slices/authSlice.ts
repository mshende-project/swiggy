import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../appStore";

export interface User {
  email: string;
  uid?: string;
  displayName?: any;
  phonenumber?: number;
  password?: string;
}

interface AuthState {
  isAuthenticated?: boolean;
  isLoading?: boolean;
  user: User;
}
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: { email: "", password: "" },
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      const isAuthenticated = true;
      state.user = action.payload;
      state.isAuthenticated = isAuthenticated;
    },
    setAuthUser(state, action: PayloadAction<any>) {},
    signOut(state) {},
  },
});

export const authReducer = authSlice.reducer;

export const { setUser, setLoading, signOut } = authSlice.actions;

export const authUser = (state: RootState) => state.user;
