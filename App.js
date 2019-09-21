import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './reducers/index';
import AddEntry from './components/AddEntry';
import History from './components/History';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducer)}>
        <View style={{flex: 1}}>
          <View style={{height: 20}}/>
           <History />
        </View>
      </Provider>

    )
  }
}



export default App