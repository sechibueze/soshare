import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { Image } from 'react-native';
import { FlatList } from 'react-native';

const AlbumCard = ({ album }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image style={{ width: 70, height: 70 }} source={{ uri: album.url }} />

      <View>
        <Text> {album.title} </Text>
      </View>
    </View>
  );
};
export default function DashboardScreen() {
  const user = useSelector((state) => state.auth.user);
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState([]);
  useEffect(() => {
    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then((res) => {
        setImageUrl(res.data.message);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then((res) => {
        setResult(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <View>
      {imageUrl && (
        <Image
          style={{ width: '100%', height: 300 }}
          source={{ uri: imageUrl }}
        />
      )}
      <Text>DashboardScreen {user.full_name}</Text>

      <FlatList
        data={result}
        renderItem={({ item }) => <AlbumCard album={item} />}
      />
    </View>
  );
}
