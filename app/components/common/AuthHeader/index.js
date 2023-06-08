import { View, Text, StatusBar, Image } from 'react-native';
import React from 'react';
import { STYLES } from 'config/styles.config';
import { Ionicons } from '@expo/vector-icons';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
export default function AuthHeader({ navigation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: STYLES.color.light,
        height: 90,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <TouchableWithoutFeedback>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: STYLES.color.primary,
          }}
          source={require('assets/icon.png')}
        />
      </TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          columnGap: 18,
          alignItems: 'center',
        }}
      >
        <Ionicons name='notifications' size={24} color={STYLES.color.primary} />
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: STYLES.color.primary,
            }}
            source={require('assets/img/me.jpg')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
