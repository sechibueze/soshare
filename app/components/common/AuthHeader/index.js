import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useRef, useMemo, useCallback } from 'react';
import { STYLES } from 'config/styles.config';
import { Ionicons } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import AppBottomSheet from '../AppBottomSheet';
export default function AuthHeader({ handleUserPress }) {
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
      <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
        <MaterialIcons name='menu' size={36} color={STYLES.color.primary} />
      </TouchableWithoutFeedback>
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          columnGap: 18,
          alignItems: 'center',
        }}
      >
        {/* <Ionicons name='notifications' size={24} color={STYLES.color.primary} /> */}
        <TouchableOpacity onPress={handleUserPress}>
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
