import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { STYLES } from 'config/styles.config';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { getAuth, signOut } from 'firebase/auth';
import { LOGIN_SCREEN } from 'config/screens.config';

export default function AuthSidebarContent(props) {
  const auth = getAuth();
  const { displayName } = auth.currentUser || {};
  const logoutUser = () => {
    signOut(auth).then(() => {
      props.navigation.navigate(LOGIN_SCREEN);
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('assets/img/profile-bg.png')}
        style={{
          justifyContent: 'center',
          width: '100%',
          height: 160,
        }}
        resizeMode='cover'
      >
        <View style={{ marginLeft: 10 }}>
          <Image
            style={{
              marginLeft: 10,
              borderWidth: 3,
              borderColor: 'yellow',
              width: 70,
              height: 70,
              borderRadius: 50,
            }}
            source={require('assets/img/me.jpg')}
          />
          <Text
            style={{
              color: STYLES.color.light,
              fontSize: 12,
              fontFamily: STYLES.font.font__bold,
              paddingTop: 4,
            }}
          >
            {displayName || 'Howdy :)'}
          </Text>
          <Text
            style={{
              color: 'yellow',
              fontSize: 8,
              fontFamily: STYLES.font.font__regular,
            }}
          >
            Software Engineer, Nigeria
          </Text>
        </View>
      </ImageBackground>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          width: '100%',
          height: 150,
          padding: 12,
          rowGap: 12,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: '#eee',
        }}
      >
        <View style={styles.lineWrapper}>
          <Entypo name='share' size={24} color='black' />
          <Text style={styles.metaText}>Tell your friends </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => logoutUser()}>
          <View style={styles.lineWrapper}>
            <AntDesign name='logout' size={24} color='black' />
            <Text style={styles.metaText}>Sign out </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    paddingVertical: 10,
  },

  metaText: {
    fontFamily: STYLES.font.font__medium,
    fontWeight: 'bold',

    fontSize: 16,
    color: STYLES.color.dark,
  },
});
