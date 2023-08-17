import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { POSTS } from 'appstate/_data';
import PostCard from 'components/posts/PostCard';
import { DataStore } from '../../backend/database.firestore';
import Toast from 'react-native-root-toast';
import { toastConfig } from 'config/notification.config';
import Spinner from '../../components/common/Spinner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { STYLES } from '../../config/styles.config';
import { CREATE_POST_SCREEN } from '../../config/screens.config';
import AppBottomSheet from '../../components/common/AppBottomSheet';
const pageSpinnerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  zIndex: 2,
  transform: [{ translateX: -50 }, { translateY: -50 }],
};
export default function PostFeedScreen({ navigation }) {
  const [loading, setloading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState();
  const detailSheetRef = useRef();

  const showPostDetails = () => {
    detailSheetRef.current?.present();
  };
  const handlePostDetails = (activePost) => {
    setCurrentPost(activePost);
    showPostDetails();
  };
  useEffect(() => {
    async function getData() {
      setloading(true);
      try {
        const data = await new DataStore('posts').get();

        setPosts(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        Toast.show('Failed to load posts', toastConfig);
      }
    }
    getData();
  }, []);
  console.log('---', currentPost);
  return (
    <View
      style={{
        backgroundColor: '#f4f4f4',
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
      }}
    >
      {loading && (
        <Spinner
          animating={loading}
          message={'Loading...'}
          containerStyles={pageSpinnerStyle}
        />
      )}
      <View
        style={{
          width: '98%',
          justifyContent: 'center',
          alignSelf: 'center',
          rowGap: 20,
        }}
      >
        <FlatList
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                gap: 18,
              }}
            >
              <MaterialCommunityIcons
                name='timer-sand-empty'
                size={100}
                color={STYLES.color.primary}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: STYLES.color.dark,
                  fontFamily: STYLES.font.font__medium,
                }}
              >
                Create your first post
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(CREATE_POST_SCREEN)}
                style={{
                  backgroundColor: STYLES.color.primary,
                  padding: 18,
                  paddingVertical: 12,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: STYLES.color.light,
                    fontFamily: STYLES.font.font__medium,
                  }}
                >
                  Create Post
                </Text>
              </TouchableOpacity>
            </View>
          }
          ItemSeparatorComponent={() => (
            <View
              style={{
                marginBottom: 4,
              }}
            />
          )}
          renderItem={({ item: post }) => (
            <PostCard post={post} handlePostDetails={handlePostDetails} />
          )}
          data={posts}
          keyExtractor={(item) => item.title}
        />
      </View>
      <AppBottomSheet ref={detailSheetRef}>
        {currentPost && <Text>{currentPost.title}</Text>}
      </AppBottomSheet>
    </View>
  );
}
