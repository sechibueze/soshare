import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';
import ForgotPasswordScreen from 'screens/auth/ForgotPasswordScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from 'screens/DashboardScreen';
import ProfileNavigation from './profile';
import PostStackNavigation from './posts';
import { STYLES } from 'config/styles.config';
import AuthSidebarContent from 'components/common/AuthSidebarContent';
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
import { View, Text } from 'react-native';
import AuthHeader from 'components/common/AuthHeader';
import MediaScreen from '../screens/MediaScreen';

// ===================
const AuthDrawer = createDrawerNavigator();

const AuthDrawerNavigation = () => {
  return (
    <AuthDrawer.Navigator
      drawerContent={(props) => <AuthSidebarContent {...props} />}
      screenOptions={{
        drawerType: 'front',
        overlayColor: '#ccc',
        drawerActiveTintColor: STYLES.color.light,
        drawerActiveBackgroundColor: STYLES.color.primary,
        drawerInactiveTintColor: STYLES.color.primary,
        drawerItemStyle: {
          width: '100%',
        },
        drawerLabelStyle: {
          fontFamily: STYLES.font.font__bold,
          fontSize: 15,
        },
        drawerStyle: {
          backgroundColor: '#f2f2f2',
        },
        header: (props) => <AuthHeader {...props} />,
      }}
    >
      <AuthDrawer.Screen
        options={{
          drawerLabel: 'Posts',
          header: (props) => <AuthHeader {...props} />,
          drawerIcon: (props) => <MaterialIcons name='post-add' {...props} />,
        }}
        name='PostStack'
        component={PostStackNavigation}
      />
      <AuthDrawer.Screen
        options={{
          headerShown: false,
          drawerIcon: (props) => <Feather name='user' {...props} />,
        }}
        name='Profile'
        component={ProfileNavigation}
      />
      <AuthDrawer.Screen
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name='view-dashboard-outline'
              size={size}
              color={color}
            />
          ),
        }}
        name='Dashboard'
        component={DashboardScreen}
      />
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
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Media' component={MediaScreen} />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
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
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
