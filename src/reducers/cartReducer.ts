import { db } from "@/data/db";
import type { CartItem, Shoe, ShoeID } from "@/types";

export type CartActions =
  | { type: "ADD_TO_CART"; payload: { item: Shoe } }
  | { type: "REMOVE_FROM_CART"; payload: { id: ShoeID } }
  | { type: "INCREASE_QUANTITY"; payload: { id: ShoeID } }
  | { type: "DECREASE_QUANTITY"; payload: { id: ShoeID } }
  | { type: "CLEAR_CART" };

export type CartState = {
  data: Shoe[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};
const [MIN_ITEMS, MAX_ITEMS] = [1, 3];

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const itemExists = state.cart.find(
        (i) => i.id === action.payload.item.id
      );
      let updatedCart: CartItem[] = [];
      if (itemExists) {
        updatedCart = state.cart.map((item) => {
          if (item.id === action.payload.item.id) {
            if (item.quantity === MAX_ITEMS) {
              alert("No puedes agregar más de 3 artículos del mismo tipo");
              return item;
            }
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        const newItem: CartItem = { ...action.payload.item, quantity: 1 };

        updatedCart = [...state.cart, newItem];
      }

      return {
        ...state,
        cart: updatedCart,
      };
    }
    case "REMOVE_FROM_CART": {
      const cart = state.cart.filter((item) => item.id !== action.payload.id);

      return {
        ...state,
        cart,
      };
    }
    case "INCREASE_QUANTITY": {
      const cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });
      return {
        ...state,
        cart,
      };
    }
    case "DECREASE_QUANTITY": {
      const cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });
      return {
        ...state,
        cart,
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
      };
    }
  }
};
