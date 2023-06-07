import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from '@expo/vector-icons';
import { STYLES } from 'config/styles.config';
export default function PostCard({ post }) {
  const { title, image_url, comments, content } = post || {};
  const [like, setLike] = useState(false);
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 4,
          backgroundColor: '#fff',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 6,
            paddingVertical: 4,
          }}
        >
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: STYLES.color.text,
            }}
            source={require('assets/img/me.jpg')}
          />
          <Text
            style={{
              fontFamily: STYLES.font.font__bold,
              fontSize: 15,
              color: STYLES.color.text,
            }}
          >
            sechibueze
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 4,
        }}
      >
        <Text
          style={{
            fontFamily: STYLES.font.font__bold,
            fontSize: 15,
            color: STYLES.color.text,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: STYLES.font.font__regular,
            fontSize: 14,
            color: STYLES.color.text,
          }}
        >
          {content}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {!!title.length && (
          <View style={styles.fanStatsContanier}>
            <Text style={{ fontFamily: STYLES.font.font__bold, fontSize: 13 }}>
              {title.length}
            </Text>
            <Text
              style={{ fontFamily: STYLES.font.font__regular, fontSize: 13 }}
            >
              {title.length > 1 ? 'likes' : 'like'}
            </Text>
          </View>
        )}
        {!!comments.length && (
          <View style={styles.fanStatsContanier}>
            <Text style={{ fontFamily: STYLES.font.font__bold, fontSize: 13 }}>
              {comments.length}
            </Text>
            <Text
              style={{ fontFamily: STYLES.font.font__regular, fontSize: 13 }}
            >
              {comments.length > 1 ? 'comments' : 'comment'}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: 8,
          paddingVertical: 6,
          backgroundColor: '#fff',
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: 18,
          }}
        >
          <TouchableHighlight>
            <FontAwesome
              name='comments'
              size={24}
              color={STYLES.color.primary}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={{ borderRadius: 50 }}
            underlayColor={'#ccc'}
            activeOpacity={0.6}
            onPress={() => setLike(!like)}
          >
            <Ionicons
              name={like ? 'heart-sharp' : 'heart-outline'}
              size={24}
              color={STYLES.color.primary}
            />
          </TouchableHighlight>
        </View>

        <TouchableHighlight>
          <Entypo name='share' size={24} color={STYLES.color.primary} />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fanStatsContanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 4,
  },
});
