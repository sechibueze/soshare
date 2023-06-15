import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Modal,
} from 'react-native';
import React from 'react';
import { STYLES } from 'config/styles.config';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
export default function ProfileDetailsScreen() {
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Modal visible={visibleModal}>
        <View
          style={{
            paddingTop: 20,
          }}
        >
          <TouchableHighlight onPress={() => setVisibleModal(false)}>
            <AntDesign name='close' size={24} color='black' />
          </TouchableHighlight>
        </View>
        {/* Add Form details here */}
      </Modal>
      {/* Profile Container */}
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 12,
        }}
      >
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 50,
            backgroundColor: '#eee',
            borderColor: '#ccc',
            borderWidth: 2,
          }}
        >
          <Image
            source={require('assets/img/me.jpg')}
            style={{ width: '100%', height: '100%', borderRadius: 50 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            columnGap: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.numbersContainer}>
            <Text style={styles.numberCount}>100</Text>
            <Text style={styles.numberText}>Posts</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numberCount}>86</Text>
            <Text style={styles.numberText}>Followers</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numberCount}>100</Text>
            <Text style={styles.numberText}>Following</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '90%',
          rowGap: 12,
          marginTop: 20,
          paddingTop: 20,
        }}
      >
        <TouchableHighlight
          underlayColor={'#eee'}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 10,
            padding: 4,
            borderRadius: 50,
            backgroundColor: '#eeeccc',
          }}
          onPress={() => setVisibleModal(false)}
        >
          <>
            <Text>Edit profile</Text>
            <AntDesign name='edit' size={24} color='black' />
          </>
        </TouchableHighlight>

        <View style={styles.fieldContainer}>
          <Text style={[styles.numberCount, { fontSize: 14 }]}>Full name</Text>
          <Text>Samuel Chibueze</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.numberCount, { fontSize: 14 }]}>Username</Text>
          <Text>computingCEO</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.numberCount, { fontSize: 14 }]}>Gender</Text>
          <Text>Male</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.numberCount, { fontSize: 14 }]}>Email</Text>
          <Text>sam@computingceo.com</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.numberCount, { fontSize: 14 }]}>Location</Text>
          <MapView
            style={{
              width: '100%',
              height: 200,
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  numbersContainer: {
    alignItems: 'center',
  },
  fieldContainer: {
    rowGap: 4,
  },
  numberCount: { fontFamily: STYLES.font.font__bold, fontSize: 16 },
  numberText: { fontFamily: STYLES.font.font__regular, fontSize: 12 },
});
