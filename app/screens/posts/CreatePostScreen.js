import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { STYLES } from 'config/styles.config';

export default function CreatePostScreen() {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '96%',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
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
              height: 100,
              width: '100%',
              textAlignVertical: 'top',
            }}
            placeholder='What would you like to share?'
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline
          />
          <Text>Handle File Picker Here</Text>
        </View>
      </View>
    </View>
  );
}
