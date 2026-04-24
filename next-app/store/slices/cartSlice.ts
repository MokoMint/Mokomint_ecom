import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../../types/types";

export interface CartItem extends ProductData {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductData>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id,
          );
        } else {
          item.quantity = action.payload.quantity;
        }
      }

      // Recalculate total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
