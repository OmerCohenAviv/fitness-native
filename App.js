import React, { Component } from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './reducers/index';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducer)}>
        <View style={{flex: 1}}>
          <AddEntry/>
        </View>
      </Provider>

    )
  }
}



export default App