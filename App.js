import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
// import LoginScreen from './app/screens/auth/Login';
// import RegisterScreen from './app/screens/auth/Register';
// import ForgotPasswordScreen from './app/screens/auth/ForgotPassword';
// import AccountScreen from './app/screens/AccountScreen';
// import SettingScreen from './app/screens/SettingScreen';
// import Tabs from './app/components/navigation/Tabs';
import AppStack from './app/navigation';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
