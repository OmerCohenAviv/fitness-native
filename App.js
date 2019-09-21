import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './reducers/index';
import AddEntry from './components/AddEntry';
import History from './components/History';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'


class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducer)}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 20 }} />
          <AppContainer />
        </View>
      </Provider>

    )
  }
}

const stack = createStackNavigator({
  History: {
    screen: History
  },
  AddEntry: {
    screen: AddEntry
  }
})

const AppContainer = createAppContainer(stack);


export default App