import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});

  const addToCart = (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1, // Jika prev[itemId] undefined, set ke 0, lalu tambah 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => {
      if (prev[itemId] > 1) {
        // Hanya mengurangi jika jumlah lebih dari 1
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        // Hapus item dari cart jika jumlahnya menjadi 0
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
