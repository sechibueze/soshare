import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostItemScreen from '../../screens/posts/PostItemScreen';
import PostFeedScreen from '../../screens/posts/PostFeedScreen';

const PostStack = createNativeStackNavigator();

export default function PostNavigation() {
  return (
    <PostStack.Navigator>
      <PostStack.Screen name='PostItem' component={PostItemScreen} />
      <PostStack.Screen name='PostFeed' component={PostFeedScreen} />
    </PostStack.Navigator>
  );
}
