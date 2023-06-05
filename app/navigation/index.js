import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileNavigation from './profile';
import PostNavigation from './posts';
import AuthSidebarContent from '../components/common/AuthSidebarContent';

// ===================
const AuthDrawer = createDrawerNavigator();

const AuthDrawerNavigation = () => {
  return (
    <AuthDrawer.Navigator
      drawerContent={(props) => <AuthSidebarContent {...props} />}
    >
      <AuthDrawer.Screen name='Dashboard' component={DashboardScreen} />
      <AuthDrawer.Screen name='Profile' component={ProfileNavigation} />
      <AuthDrawer.Screen name='Posts' component={PostNavigation} />
    </AuthDrawer.Navigator>
  );
};

// ==================
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0094d9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name='Accounts'
        component={AuthDrawerNavigation}
      />

      <Stack.Screen
        options={{
          title: 'Create Account',
        }}
        name='Register'
        component={RegisterScreen}
      />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
