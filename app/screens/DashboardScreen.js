import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DashboardScreen() {
  const user = useSelector((state) => state.auth.user);
  return (
    <View>
      <Text>DashboardScreen {user.full_name}</Text>
    </View>
  );
}
