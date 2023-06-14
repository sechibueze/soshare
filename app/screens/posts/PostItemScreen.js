import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import React, { useState } from 'react';
import { POSTS } from 'appstate/_data';
import PostCard from 'components/posts/PostCard';
import Comment from 'components/posts/Comment';
import { STYLES } from 'config/styles.config';
import { FontAwesome } from '@expo/vector-icons';
export default function PostItemScreen({ route }) {
  const [comment, setComment] = useState('');

  const post = POSTS.find((item) => item.title === route.params.id);
  const hasComment = comment.trim().length > 0;
  return (
    <View style={{ flex: 1 }}>
      <PostCard post={post} />

      <View>
        <FlatList
          data={post.comments}
          renderItem={({ item }) => <Comment commentItem={item} />}
        />
      </View>
      {/* Input */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 4,
          position: 'absolute',
          bottom: 0,
        }}
      >
        <TextInput
          style={{
            backgroundColor: '#f9f9f9',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 6,
            fontSize: 16,
            fontFamily: STYLES.font.font__medium,
            color: STYLES.color.text,

            width: hasComment ? '85%' : '100%',
            textAlignVertical: 'top',
          }}
          placeholder='Start typing to comment...'
          value={comment}
          onChangeText={(text) => setComment(text)}
          multiline
        />
        {hasComment && (
          <TouchableHighlight
            style={{
              borderRadius: 50,
              padding: 8,
              margin: 4,
            }}
            onPress={() => setComment('')}
          >
            <FontAwesome name='send-o' size={24} color='black' />
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
}
