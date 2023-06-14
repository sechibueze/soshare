import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';

export default function Comment({ commentItem }) {
  return (
    <View
      style={{
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 15,
      }}
    >
      <Image
        style={{
          marginLeft: 10,
          borderWidth: 3,
          borderColor: 'yellow',
          width: 45,
          height: 45,
          borderRadius: 50,
        }}
        source={require('assets/img/me.jpg')}
      />

      <View
        style={{
          justifyContent: 'flex-start',
          width: '70%',
        }}
      >
        {commentItem && <Text>{commentItem}</Text>}
      </View>
    </View>
  );
}
