import { createContext, useState } from "react";

// Create context
export const ProductsContext = createContext({
  productData: {
    arName: '',
    enName: '',
    manufactur: '',
    proof: '',
    category: '',
    notSupportersData: [],
  },
  updateData: () => {},
});

// Context provider component
export const ProductsContextProvider = ({ children }) => {
  const [productData, setProductData] = useState({
    arName: '',
    enName: '',
    manufactur: '',
    proof: '',
    category: '',
    notSupportersData: [],
  });

  // Function to update product data and supporters data
  const updateData = (data) => {
    setProductData(prevState => ({
      ...prevState,
      ...data,  // Spread the updated data
    }));
  };

  const updateNotSupportersData = (newData) => {
    setProductData(prevState => ({
      ...prevState,
      notSupportersData: newData,  // Update notSupportersData
    }));
  };



  return (
    <ProductsContext.Provider value={{ productData, updateData, updateNotSupportersData }}>
      {children}
    </ProductsContext.Provider>
  );
};
