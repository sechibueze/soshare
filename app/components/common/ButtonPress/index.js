import { Pressable, Text, StyleSheet } from 'react-native';
import React from 'react';
import { STYLES } from 'config/styles.config';

export default function ButtonPress({ label, style, ...rest }) {
  return (
    <Pressable style={[styles.button, style]} {...rest}>
      {!!label && <Text style={styles.buttonText}>{label} </Text>}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    width: '85%',
    backgroundColor: STYLES.color.primary,
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: STYLES.color.light,
    fontFamily: STYLES.font.font__medium,
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});
