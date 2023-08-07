import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AppStack from 'navigation';
import { store } from 'appstate/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuthConfig } from './app/backend/firebase.config';

SplashScreen.preventAutoHideAsync();
let persistor = persistStore(store);
export default function App() {
  const [, setCurrentUser] = useState();
  // useEffect(() => {
  //   const subscriber = onAuthStateChanged(firebaseAuthConfig, (user) => {
  //     setCurrentUser(user);
  //   });
  //   return subscriber;
  // }, []);
  const [boldFontLoaded] = useFonts({
    font__bold: require('./app/assets/fonts/Inter-Bold.ttf'),
  });
  const [mediumFontLoaded] = useFonts({
    font__medium: require('./app/assets/fonts/Inter-Medium.ttf'),
  });
  const [regularFontLoaded] = useFonts({
    font__regular: require('./app/assets/fonts/Inter-Regular.ttf'),
  });

  const fontsLoaded = mediumFontLoaded && boldFontLoaded && regularFontLoaded;
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
}
