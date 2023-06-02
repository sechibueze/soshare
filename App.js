import {
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Login from './app/screens/auth/Login';
import Register from './app/screens/auth/Register';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Register /> */}
      <Login />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
