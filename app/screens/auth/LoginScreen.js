import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import InputBox from '../../components/common/InputBox';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/authSlice';
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
  const dispatch = useDispatch();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}>Login </Text>
        </View>

        <Formik
          validationSchema={loginSchema}
          onSubmit={(data) => {
            dispatch(
              loginUser({
                full_name: data.email,
              })
            );
            navigation.navigate('Accounts');
          }}
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

              <Pressable
                disabled={!isValid}
                style={styles.button}
                onPress={formSummitHandler}
              >
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            </>
          )}
        </Formik>

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
