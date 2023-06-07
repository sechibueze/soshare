import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileDetailsScreen from 'screens/profile/ProfileDetailsScreen';
import SettingScreen from 'screens/SettingScreen';
import AuthHeader from 'components/common/AuthHeader';

const ProfileBottomTabs = createBottomTabNavigator();

export default function ProfileNavigation() {
  return (
    <ProfileBottomTabs.Navigator
      screenOptions={{
        header: (props) => <AuthHeader {...props} />,
      }}
    >
      <ProfileBottomTabs.Screen
        name='ProfileDetails'
        component={ProfileDetailsScreen}
      />
      <ProfileBottomTabs.Screen name='Settings' component={SettingScreen} />
    </ProfileBottomTabs.Navigator>
  );
}
