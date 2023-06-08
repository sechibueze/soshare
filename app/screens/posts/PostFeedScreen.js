import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { POSTS } from 'appstate/_data';
import PostCard from 'components/posts/PostCard';

export default function PostFeedScreen({ navigation }) {
  return (
    <View
      style={{
        backgroundColor: '#f4f4f4',
        flex: 1,
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: '98%',
          justifyContent: 'center',
          alignSelf: 'center',
          rowGap: 20,
        }}
      >
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                marginBottom: 4,
              }}
            />
          )}
          renderItem={({ item: post }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PostItem', {
                  id: post.title,
                })
              }
            >
              <PostCard post={post} />
            </TouchableOpacity>
          )}
          data={POSTS}
          keyExtractor={(item) => item.title}
        />
      </View>
    </View>
  );
}
