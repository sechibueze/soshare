import React, { useState } from 'react';
import {
  View,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
const EMAIL = 'email';
const PASSWORD = 'password';
const LoginScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({});

  const handleChange = (name, value) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = () => {
    // Perform login logic here
    console.log('Data:', userData);
    return navigation.navigate('Accounts');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}>Login</Text>
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
          <TouchableOpacity
            style={{
              width: '100%',
            }}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={{ color: 'blue', textAlign: 'right' }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.signupWrapper, { color: 'blue' }]}>
            New user ? Create account
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    padding: 16,
    borderColor: 'red',
    borderWidth: 3,
  },
  inputWrapper: {
    width: '100%',
    rowGap: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  input: {
    width: '100%',
    fontSize: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
  },
  button: {
    width: '85%',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
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

export default LoginScreen;
