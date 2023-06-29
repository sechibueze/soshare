import { View, Text, Button } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Audio, ResizeMode, Video } from 'expo-av';
export default function MediaScreen() {
  const [sound, setSound] = useState();
  const [status, setStatus] = useState({});
  const video = useRef(null);
  const playSound = async () => {
    console.log('Loading sound...');
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sound.mp3')
    );

    setSound(sound);
    console.log('Playing sound...');
    sound.playAsync();
  };

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);
  return (
    <View>
      <Text>MediaScreen</Text>
      <Button title='Play music' onPress={playSound} />

      <Video
        style={{ width: '80%', height: 170 }}
        ref={video}
        useNativeControls
        isLooping
        resizeMode={ResizeMode.CONTAIN}
        // source={require('../assets/video.mp4')}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        onPlaybackStatusUpdate={(currentStatus) =>
          setStatus(() => currentStatus)
        }
      />

      <Button
        title={status.isPlaying ? 'Pause' : 'Play'}
        onPress={() =>
          status.isPlaying
            ? video.current.pauseAsync()
            : video.current.playAsync()
        }
      />
    </View>
  );
}
