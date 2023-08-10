import PostItemScreen from 'screens/posts/PostItemScreen';
import PostFeedScreen from 'screens/posts/PostFeedScreen';
import ProfileDetailsScreen from 'screens/profile/ProfileDetailsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { STYLES } from 'config/styles.config';
import CreatePostScreen from 'screens/posts/CreatePostScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Pressable } from 'react-native';
import ProfileNavigation from '../profile';
import NotificationsScreen from 'screens/NotificationsScreen';
import {
  CREATE_POST_SCREEN,
  POSTS_FEED_SCREEN,
  POST_DETAILS_SCREEN,
} from '../../config/screens.config';

const PostsTab = createBottomTabNavigator();

export const PostsTabNavigator = () => {
  return (
    <PostsTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: STYLES.color.primary,
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarStyle: {
          rowGap: 0,
        },
        tabBarLabelStyle: {
          fontFamily: STYLES.font.font__bold,
          fontSize: 10,
        },
      }}
    >
      <PostsTab.Screen
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: (props) => (
            <MaterialIcons name='dynamic-feed' {...props} />
          ),
        }}
        name={POSTS_FEED_SCREEN}
        component={PostFeedScreen}
      />
      <PostsTab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: (props) => (
            <MaterialIcons name='add-box' {...props} size={42} />
          ),
        }}
        name='EmptyNewPost'
        component={CreatePostScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(CREATE_POST_SCREEN);
          },
        })}
      />
      <PostsTab.Screen
        options={{
          tabBarBadge: 10,
          tabBarBadgeStyle: {
            fontSize: 10,
            fontFamily: STYLES.font.font__bold,
          },
          tabBarIcon: (props) => (
            <Ionicons name='md-notifications-sharp' {...props} />
          ),
        }}
        name='Notifications'
        component={NotificationsScreen}
      />
    </PostsTab.Navigator>
  );
};

const PostsStack = createNativeStackNavigator();
export default function PostNavigation(params) {
  return (
    <PostsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PostsStack.Screen name='Posts' component={PostsTabNavigator} />
      <PostsStack.Screen
        name={POST_DETAILS_SCREEN}
        component={PostItemScreen}
      />
      <PostsStack.Screen
        name={CREATE_POST_SCREEN}
        component={CreatePostScreen}
      />
    </PostsStack.Navigator>
  );
}
