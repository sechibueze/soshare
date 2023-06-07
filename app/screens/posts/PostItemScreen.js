import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { POSTS } from 'appstate/_data';
import PostCard from 'components/posts/PostCard';

export default function PostItemScreen({ route }) {
  const post = POSTS.find((item) => item.title === route.params.id);
  return (
    <View>
      <PostCard post={post} />

      <View>
        <FlatList
          data={POSTS}
          renderItem={({ item }) => (
            <View>
              <Text> {item.content} </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
