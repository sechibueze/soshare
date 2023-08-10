import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ScreenWrapper from 'components/common/ScreenWrapper';
import InputBox from 'components/common/InputBox';
import { STYLES } from 'config/styles.config';
import ButtonPress from 'components/common/ButtonPress';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuthConfig } from '../../backend/firebase.config';
import { HOME_SCREEN } from '../../config/screens.config';
const EMAIL = 'email';
const PASSWORD = 'password';

const initialFormState = {
  [EMAIL]: '',
  [PASSWORD]: '',
};

const loginSchema = Yup.object().shape({
  [EMAIL]: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  [PASSWORD]: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (credentials) => {
    setErrorMessage('');
    setLoading(true);
    const { email, password } = credentials;
    signInWithEmailAndPassword(firebaseAuthConfig, email, password)
      .then(({ user }) => {
        setLoading(false);
        navigation.navigate(HOME_SCREEN);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(`${error.code}: ${error.message}`);
      });
  };
  return (
    <ScreenWrapper>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text
            style={{
              width: '100%',
              fontFamily: STYLES.font.font__bold,
              fontWeight: 'bold',
              textAlign: 'left',
              fontSize: 38,
              color: STYLES.color.primary,
            }}
          >
            Login
          </Text>

          {errorMessage && <Text>{errorMessage}</Text>}
          <Formik
            validationSchema={loginSchema}
            onSubmit={handleLogin}
            initialValues={initialFormState}
          >
            {({
              values: formValues,
              errors: formErrors,
              touched: touchedState,
              handleChange,
              handleSubmit: formSummitHandler,
              isValid,
            }) => (
              <>
                <InputBox
                  label={'Email'}
                  placeholder='Email'
                  onChangeText={handleChange(EMAIL)}
                  value={formValues[EMAIL] || ''}
                  errorMessage={
                    formErrors[EMAIL] && touchedState[EMAIL]
                      ? formErrors[EMAIL]
                      : ''
                  }
                />

                <View style={styles.inputWrapper}>
                  <InputBox
                    label={'Your Password'}
                    placeholder='Password'
                    onChangeText={handleChange(PASSWORD)}
                    value={formValues[PASSWORD] || ''}
                    errorMessage={
                      formErrors[PASSWORD] && touchedState[PASSWORD]
                        ? formErrors[PASSWORD]
                        : ''
                    }
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

                <ButtonPress
                  style={{ marginVertical: 30 }}
                  onPress={formSummitHandler}
                  label={loading ? 'Loading...' : 'Login'}
                />
              </>
            )}
          </Formik>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.signupWrapper, { color: 'blue' }]}>
              New user ? Create account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  container: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    rowGap: 10,
    padding: 16,
  },
  inputWrapper: {
    width: '100%',
    rowGap: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  signupWrapper: {
    color: STYLES.color.primary,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: STYLES.font.font__medium,
  },
});

export default LoginScreen;
