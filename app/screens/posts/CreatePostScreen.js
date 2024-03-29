import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { STYLES } from 'config/styles.config';
import * as ImagePicker from 'expo-image-picker';
import ScreenWrapper from 'components/common/ScreenWrapper';
import { AntDesign } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { DataStore } from 'backend/database.firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Toast from 'react-native-root-toast';
import { POSTS_FEED_SCREEN } from 'config/screens.config';
const storage = getStorage();
export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(true);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true,
    });

    if (result.canceled) return;

    setPhoto(result.assets[0]);
  };
  const closeModal = () => {
    setIsVisibleModal(false);
    navigation.navigate(POSTS_FEED_SCREEN);
  };

  const handleSubmitPost = async (image, body = {}) => {
    // Call the api and close modal
    const data = {
      owner: getAuth().currentUser?.uid,
      content,
    };

    // Get Unique name with image extensionphoto
    const photoURI = photo.uri;
    const photoExtension = photoURI.substr(photoURI.lastIndexOf('.'));
    const fileName = Date.now().toString() + photoExtension;

    // Convert to blob
    const storageRef = ref(storage, fileName);
    const response = await fetch(photo.uri);
    const blob = await response.blob();

    const metadata = {
      contentType: 'image/jpeg',
    };
    try {
      const snapshot = await uploadBytes(storageRef, blob, metadata);
      const url = await getDownloadURL(snapshot.ref);
      data['photo'] = url;
      await new DataStore('posts').create(data);
      Toast.show('Post created ', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    } catch (error) {}

    closeModal();
  };
  const isValidPost = photo || content.trim().length;
  return (
    <ScreenWrapper>
      <Modal
        animationType='slide'
        visible={isVisibleModal}
        onRequestClose={closeModal}
      >
        {/* Header */}
        <View
          style={{
            width: '100%',
            paddingVertical: 12,
            paddingHorizontal: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
          }}
        >
          {/* Left container */}
          <View>
            <TouchableWithoutFeedback onPress={closeModal}>
              <AntDesign name='close' size={24} color='black' />
            </TouchableWithoutFeedback>
          </View>
          {/* Right container */}
          <View>
            <Pressable
              onPress={handleSubmitPost}
              disabled={!isValidPost}
              style={{
                backgroundColor: isValidPost ? STYLES.color.primary : '#ccc',
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: STYLES.font.font__bold,
                  fontSize: 14,
                  color: isValidPost ? STYLES.color.light : '#f9f9f9',
                }}
              >
                Add Post
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            columnGap: 12,
            marginLeft: 10,
          }}
        >
          <Image
            style={{
              marginLeft: 10,
              borderWidth: 3,
              borderColor: STYLES.color.primary,
              width: 70,
              height: 70,
              borderRadius: 50,
            }}
            source={require('assets/img/me.jpg')}
          />
          <View>
            <Text
              style={{
                color: STYLES.color.text,
                fontSize: 16,
                fontFamily: STYLES.font.font__bold,
                paddingTop: 4,
              }}
            >
              Samuel Chibueze
            </Text>
            <Text
              style={{
                color: STYLES.color.dark,
                fontSize: 10,
                fontFamily: STYLES.font.font__regular,
              }}
            >
              Software Engineer, Nigeria
            </Text>
          </View>
        </View>
        {/* Caption box */}

        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={{
              backgroundColor: '#f9f9f9',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 6,
              fontSize: 16,
              fontFamily: STYLES.font.font__medium,
              color: STYLES.color.text,
              height: 120,
              width: '95%',
              textAlignVertical: 'top',
            }}
            placeholder='What would you like to share?'
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline
          />
          {!!photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: '100%', height: 200 }}
            />
          )}

          <View
            style={{
              width: '95%',
            }}
          >
            <TouchableHighlight
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 12,
                padding: 10,
              }}
              onPress={pickImage}
            >
              <>
                <AntDesign name='camerao' size={24} color={STYLES.color.text} />
                <Text
                  style={{
                    fontFamily: STYLES.font.font__bold,
                    fontSize: 12,
                    color: STYLES.color.text,
                  }}
                >
                  {!!photo ? 'Choose another image' : 'Choose an image'}
                </Text>
              </>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
