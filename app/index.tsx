import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { View } from 'react-native';
import Welcome from './Welcome';
import TodoApp from './TodoApp';

const Index = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1,}}>
       <Welcome />
      </View>
    </Provider>
  );
};

export default Index;




