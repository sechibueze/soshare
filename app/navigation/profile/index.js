import ProfileDetailsScreen from 'screens/profile/ProfileDetailsScreen';
import SettingScreen from 'screens/SettingScreen';
import AuthHeader from 'components/common/AuthHeader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ProfileStack = createNativeStackNavigator();

export default function ProfileNavigation() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        header: (props) => <AuthHeader {...props} />,
      }}
    >
      <ProfileStack.Screen
        name='ProfileDetails'
        component={ProfileDetailsScreen}
      />
      <ProfileStack.Screen name='Settings' component={SettingScreen} />
    </ProfileStack.Navigator>
  );
}
