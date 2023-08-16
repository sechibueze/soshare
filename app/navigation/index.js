import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';
import ForgotPasswordScreen from 'screens/auth/ForgotPasswordScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from 'screens/DashboardScreen';
import ProfileNavigation from './profile';
import PostStackNavigator from './posts';
import { STYLES } from 'config/styles.config';
import AuthSidebarContent from 'components/common/AuthSidebarContent';
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
import AuthHeader from 'components/common/AuthHeader';
import {
  DASHBOARD_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  LOGIN_SCREEN,
  POSTS_SCREEN,
  REGISTER_SCREEN,
} from '../config/screens.config';
import { getAuth } from 'firebase/auth';
import SettingScreen from '../screens/SettingScreen';
import AppBottomSheet from '../components/common/AppBottomSheet';
import { useRef } from 'react';
// ===================
const AuthDrawer = createDrawerNavigator();

const AuthDrawerNavigator = () => {
  const sheetRef = useRef();
  const handlePress = () => {
    sheetRef.current?.present();
  };
  return (
    <>
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
            fontFamily: STYLES.font.font__regular,
            fontSize: 15,
          },
          drawerStyle: {
            backgroundColor: '#f2f2f2',
          },
          header: (props) => (
            <AuthHeader handleUserPress={handlePress} {...props} />
          ),
        }}
      >
        <AuthDrawer.Screen
          options={{
            drawerLabel: 'Posts',
            // header: (props) => <AuthHeader  {...props} />,
            drawerIcon: (props) => <MaterialIcons name='post-add' {...props} />,
          }}
          name={'PostsNavigator'}
          component={PostStackNavigator}
        />

        {/* <AuthDrawer.Screen
        options={{
          headerShown: false,
          drawerIcon: (props) => <Feather name='user' {...props} />,
        }}
        name='Profile'
        component={ProfileNavigation}
      /> */}
        {/* <AuthDrawer.Screen
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name='view-dashboard-outline'
              size={size}
              color={color}
            />
          ),
        }}
        name={DASHBOARD_SCREEN}
        component={DashboardScreen}
      /> */}
      </AuthDrawer.Navigator>
      <AppBottomSheet ref={sheetRef} />
    </>
  );
};

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const currentUser = getAuth().currentUser;
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
      {currentUser ? (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={'AuthNavigator'}
          component={AuthDrawerNavigator}
        />
      ) : (
        <>
          <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
          <Stack.Screen
            options={{
              title: 'Create Account',
            }}
            name={REGISTER_SCREEN}
            component={RegisterScreen}
          />
          <Stack.Screen
            name={FORGOT_PASSWORD_SCREEN}
            component={ForgotPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
