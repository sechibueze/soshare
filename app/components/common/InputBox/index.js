import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

export default function InputBox({ label, value, errorMessage, ...rest }) {
  return (
    <View style={styles.inputWrapper}>
      {label && <Text>{label}</Text>}
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
    rowGap: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  input: {
    width: '100%',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
  },
  errorMessage: {
    color: 'red',
  },
});
