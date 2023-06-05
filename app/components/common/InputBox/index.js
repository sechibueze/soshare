import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { STYLES } from '../../../config/styles.config';

export default function InputBox({ label, value, errorMessage, ...rest }) {
  return (
    <View style={styles.inputWrapper}>
      {label && (
        <Text
          style={{
            fontFamily: STYLES.font.font__regular,
            fontWeight: 500,
            color: STYLES.color.primary,
          }}
        >
          {label}
        </Text>
      )}
      <TextInput style={styles.input} value={value || ''} {...rest} />
      {!!errorMessage && (
        <Text style={styles.errorMessage}> {errorMessage} </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    rowGap: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  input: {
    width: '100%',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: STYLES.color.dark,
    borderRadius: 2,
    fontFamily: STYLES.font.font__regular,
  },
  errorMessage: {
    color: STYLES.color.danger,
    fontFamily: STYLES.font.font__regular,
    fontSize: 12,
  },
});
