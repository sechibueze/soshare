import React, { useLayoutEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from 'components/common/ScreenWrapper';
import InputBox from 'components/common/InputBox';
import ButtonPress from 'components/common/ButtonPress';
import { STYLES } from 'config/styles.config';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
const EMAIL = 'email';

const initialFormState = {
  [EMAIL]: '',
};

const passwordRecoverySchema = Yup.object().shape({
  [EMAIL]: Yup.string()
    .email('Please enter valid email')
    .required('Email address is required'),
});
const ForgotPasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const handlePasswordRecovery = async (data) => {
    setLoading(true);
    setError('');
    setMessage('');
    sendPasswordResetEmail(getAuth(), data[EMAIL])
      .then(() => {
        setLoading(false);
        setMessage('Email has been sent');
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text
          style={{
            width: '100%',
            fontFamily: STYLES.font.font__bold,
            fontSize: 25,
            color: STYLES.color.primary,
            textAlign: 'left',
          }}
        >
          Password Recovery
        </Text>
        {error && <Text> {error} </Text>}
        {message && <Text> {message} </Text>}
        <Formik
          validationSchema={passwordRecoverySchema}
          onSubmit={async (data) => {
            await handlePasswordRecovery(data);
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

              <ButtonPress
                label={loading ? 'Loading...' : 'Recover Password'}
                style={{ marginVertical: 30 }}
                onPress={formSummitHandler}
              />
            </>
          )}
        </Formik>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              fontFamily: STYLES.font.font__medium,
              fontSize: 14,
              color: STYLES.color.link,
            }}
          >
            Back to Login
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
    gap: 10,
    padding: 16,
    borderColor: 'red',
  },
});

export default ForgotPasswordScreen;
