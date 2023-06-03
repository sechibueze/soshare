import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileDetailsScreen from '../../screens/profile/ProfileDetailsScreen';
import SettingScreen from '../../screens/SettingScreen';

const ProfileBottomTabs = createBottomTabNavigator();

export default function ProfileNavigation() {
  return (
    <ProfileBottomTabs.Navigator>
      <ProfileBottomTabs.Screen
        name='ProfileDetails'
        component={ProfileDetailsScreen}
      />
      <ProfileBottomTabs.Screen name='Settings' component={SettingScreen} />
    </ProfileBottomTabs.Navigator>
  );
}
