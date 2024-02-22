import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RootNavigator } from './src/navigator/RootNavigator';
import { Provider } from 'react-redux'
import { store } from './src/redux';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
