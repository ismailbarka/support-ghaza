// AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BadeelPage from './screens/BadeelPage';
import HomePage from './screens/HomePage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen options={{ headerShown: false }}  name="HomePage" component={HomePage} />
        <Stack.Screen options={{ headerShown: false }}  name="badeel" component={BadeelPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
