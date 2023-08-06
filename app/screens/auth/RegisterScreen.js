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
import CheckBoxField from 'react-native-bouncy-checkbox';
import { STYLES } from 'config/styles.config';
import ButtonPress from 'components/common/ButtonPress';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createDocument } from 'backend/database.firestore';
import { firebaseAuthConfig } from 'backend/firebase.config';
const EMAIL = 'email';
const PASSWORD = 'password';
const FULL_NAME = 'full_name';
const CONFIRM_PASSWORD = 'confirm_password';
const AGREE_TO_TERMS = 'agree_to_terms';

const initialFormState = {
  [EMAIL]: '',
  [PASSWORD]: '',
  [FULL_NAME]: '',
  [CONFIRM_PASSWORD]: '',
  [AGREE_TO_TERMS]: false,
};

const newUserSchema = Yup.object().shape({
  [EMAIL]: Yup.string()
    .email('Please enter valid email')
    .required('Email address is required'),
  [FULL_NAME]: Yup.string().required('Your full name is required'),
  [PASSWORD]: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  [CONFIRM_PASSWORD]: Yup.string()
    .oneOf([Yup.ref(PASSWORD), null], 'Passwords must match')
    .required('A repeat password is required'),
  [AGREE_TO_TERMS]: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
});

const Register = ({ navigation }) => {
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handeRegister = async (user) => {
    setErrorMessage('');
    setLoading(true);
    createUserWithEmailAndPassword(
      firebaseAuthConfig,
      user[EMAIL],
      user[PASSWORD]
    )
      .then(async (result) => {
        // Insert user in db
        const newUser = {
          id: result.user.uid,
          [FULL_NAME]: user[FULL_NAME],
          [AGREE_TO_TERMS]: user[AGREE_TO_TERMS],
          [EMAIL]: user[EMAIL],
        };
        try {
          await createDocument('users', newUser);
          navigation.navigate('Login');
        } catch (error) {
          setErrorMessage('User created but not saved: ', error.message);
        }
      })
      .catch((err) => {
        setErrorMessage('Failed to create user : ');
      });
    setLoading(false);
  };
  return (
    <ScrollView>
      <ScreenWrapper>
        <View style={styles.form}>
          <Text
            style={{
              width: '100%',
              fontFamily: 'font__bold',
              textAlign: 'left',
              fontSize: 38,
              color: STYLES.color.primary,
            }}
          >
            Sign up
          </Text>
          {errorMessage && <Text>{errorMessage}</Text>}

          <Formik
            // validationSchema={newUserSchema}
            onSubmit={async (data) => {
              await handeRegister(data);
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
                  label={'Full name'}
                  placeholder='Full name'
                  onChangeText={handleChange(FULL_NAME)}
                  value={formValues[FULL_NAME] || ''}
                  errorMessage={
                    formErrors[FULL_NAME] && touchedState[FULL_NAME]
                      ? formErrors[FULL_NAME]
                      : ''
                  }
                />
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
                  // secureTextEntry
                />
                <InputBox
                  label={'Your Confirm Password'}
                  placeholder='Re-type your password'
                  onChangeText={handleChange(CONFIRM_PASSWORD)}
                  value={formValues[CONFIRM_PASSWORD] || ''}
                  errorMessage={
                    formErrors[CONFIRM_PASSWORD] &&
                    touchedState[CONFIRM_PASSWORD]
                      ? formErrors[CONFIRM_PASSWORD]
                      : ''
                  }
                  // secureTextEntry
                />

                <CheckBoxField
                  isChecked={agree}
                  onPress={setAgree}
                  fillColor={STYLES.color.primary}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    columnGap: 5,
                  }}
                  textComponent={
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: STYLES.font.font__regular,
                      }}
                    >
                      By registering, you agree that you have read, understand,
                      and acknowledge our{' '}
                      <Text style={styles.link}>Privacy Policy</Text> and accept
                      our <Text style={styles.link}>General Terms of Use</Text>.
                    </Text>
                  }
                />

                <ButtonPress
                  style={{ marginVertical: 30 }}
                  label={loading ? 'Loading...' : 'Register'}
                  onPress={formSummitHandler}
                />
              </>
            )}
          </Formik>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              columnGap: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.metaCTA}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderLeftColor: STYLES.color.dark,
                borderLeftWidth: 1,
                paddingLeft: 20,
              }}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.metaCTA}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
    padding: 16,
  },

  metaCTA: {
    color: STYLES.color.primary,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 500,
    fontFamily: STYLES.font.font__medium,
  },
  link: {
    color: 'blue',
  },
});

export default Register;
