
import React from 'react';
import AppNavigator from './AppNavigator';
import { ProductsContextProvider } from './Context/ProductContext';

const App = () => {

  return (
    <ProductsContextProvider>
      <AppNavigator />
    </ProductsContextProvider>
  );
};

export default App;
