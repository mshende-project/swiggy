import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../appStore";

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface CartState {
  items: CartItem[];
}
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      // mutating the state here
      // redux uses immer library behind the scene
      // immer takes new state and old state then calculate difference and updates state
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<any>) => {
      //implement remove item
      state.items.filter((item) => item !== action.payload);
    },
    // originalState = ["pizza"]
    clearCart: (state) => {
      // RTK -either mutate the existing state or return a new state
      //state.items.length = 0; //originalstate = [];
      state.items.length = 0; // or you can also write "return {items: []}"
      // this new object will be replaced inside originalstate = []
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

//subscribing to store using selector
export const cartItemsSelector = (state: RootState) => state.cart.items;
