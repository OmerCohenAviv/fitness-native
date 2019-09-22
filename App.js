import React, { Component } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import Reducer from './reducers/index';
import AddEntryScreen from './components/AddEntry';
import Constants from 'expo-constants';
import HistoryScreen from './components/History';
import EntryDetail from './components/EntryDetail';
import { Provider } from 'react-redux';
import { purple, white } from './utils/colors';
import { createStore } from 'redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'




const AppNavigationHome = createBottomTabNavigator({
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntryScreen,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
  tabBarOptions: {
    activetintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const Stack = createStackNavigator({
  Home: {
    screen: AppNavigationHome
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      tabBarLabel: 'Entry Detail',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})


UdaciStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor}  {...props} />
    </View>
  )
}

const AppContainer = createAppContainer(Stack)
class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <AppContainer />
        </View>
      </Provider>

    )
  }
}




export default App