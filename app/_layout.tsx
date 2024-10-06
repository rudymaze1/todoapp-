import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from './store/store'; 

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="Welcome"
          options={{
            headerShown: false,
          }}  
        />
        <Stack.Screen 
          name="Trips" 
          options={{ 
            headerTransparent: true, 
            headerStyle: { backgroundColor: 'transparent' },
            headerTitle: '', 
            headerBackVisible:false, 
          }} 
        />
        <Stack.Screen 
          name="trips/[tripName]" 
          options={{ 
            headerTransparent: true, 
            headerStyle: { backgroundColor: 'transparent' },
            headerTitle: '', 
          }} 
        />
        <Stack.Screen 
          name="TodoApp" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </Provider>
  );
};