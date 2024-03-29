import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import AppStack from 'navigation';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// SplashScreen.preventAutoHideAsync();
export default function App() {
  const [, setCurrentUser] = useState();
  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), (user) => {
      setCurrentUser(user);
    });
    return subscriber;
  }, []);
  // const [isFontLoaded] = useFonts({
  //   font__bold: require('./app/assets/fonts/Inter-Bold.ttf'),
  //   font__medium: require('./app/assets/fonts/Inter-Medium.ttf'),
  //   font__regular: require('./app/assets/fonts/Inter-Regular.ttf'),
  // });
  // const onLayoutRootView = useCallback(async () => {
  //   if (isFontLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isFontLoaded]);

  // if (!isFontLoaded) {
  //   return null;
  // }
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </RootSiblingParent>
  );
}
