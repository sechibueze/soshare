import React, { useState } from 'react';
import {
  View,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const EMAIL = 'email';
const PASSWORD = 'password';
const FULL_NAME = 'full_name';
const CONFIRM_PASSWORD = 'confirm_password';
const RegisterScreen = () => {
  const [userData, setUserData] = useState({});

  const handleChange = (name, value) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreateAccount = () => {
    // Perform login logic here
    console.log('Usersta:', userData);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text>Your Fullname</Text>
        <TextInput
          style={styles.input}
          placeholder='Fullname'
          onChangeText={(text) => handleChange(FULL_NAME, text)}
          value={userData[FULL_NAME] || ''}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Your Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(text) => handleChange(EMAIL, text)}
          value={userData[EMAIL] || ''}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Your Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Password'
          onChangeText={(text) => handleChange(PASSWORD, text)}
          value={userData[PASSWORD] || ''}
          secureTextEntry
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Confirm your Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Confirm password'
          onChangeText={(text) => handleChange(CONFIRM_PASSWORD, text)}
          value={userData[CONFIRM_PASSWORD] || ''}
          secureTextEntry
        />
      </View>
      <Pressable style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create account</Text>
      </Pressable>

      <TouchableOpacity onPress={() => console.log('Next page')}>
        <Text style={[styles.signupWrapper, { color: 'blue' }]}>
          New user ? Create account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 18,
    padding: 16,
    borderColor: 'red',
    borderWidth: 3,
  },
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
  button: {
    width: '85%',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 4,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerText: {
    color: '#555',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  signupWrapper: {
    width: '100%',
    paddingTop: 20,
    textAlign: 'center',
  },
});

export default RegisterScreen;
