import { useState, useEffect, useMemo } from "react";
import type { Shoe, CartItem, ShoeID } from "@/types";

import { db } from "@/data/db";

const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [MIN_ITEMS, MAX_ITEMS] = [1, 3];

  function addToCart(item: Shoe) {
    const itemExists = cart.findIndex((i) => i.id === item.id);

    if (itemExists >= 0) {
      if (cart[itemExists].quantity === MAX_ITEMS)
        return alert("No puedes agregar más de 3 artículos del mismo tipo");
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;

      setCart(updatedCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };

      setCart([...cart, newItem]);
    }
  }

  function removeFromCart(id: ShoeID) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function increaseQuantity(id: ShoeID) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        item.quantity++;
      }

      return item;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id: ShoeID) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        item.quantity--;
      }

      return item;
    });

    setCart(updatedCart);
  }

  function clearCart() {
    const confirm = window.confirm("¿Estás seguro de vaciar el carrito?");
    if (!confirm) return;
    setCart([]);
  }

  //state derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce((total, { price, quantity }) => total + price * quantity, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};

export default useCart;
