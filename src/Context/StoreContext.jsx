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

  useEffect(() => {
    console.log(cartItem);
  }, [cartItem]);

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
