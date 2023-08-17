import { View, ActivityIndicator, Text } from 'react-native';

const Spinner = ({ message, animating, containerStyles, ...rest }) => {
  return (
    <View
      style={[
        {
          position: 'relative',
          justifyContent: 'center',
          gap: 18,
          alignItems: 'center',
        },
        containerStyles || {},
      ]}
    >
      <ActivityIndicator animating={animating} {...rest} />
      {message && animating && <Text>{message}</Text>}
    </View>
  );
};

export default Spinner;
