import Toast from 'react-native-root-toast';
import { STYLES } from './styles.config';

export const toastConfig = {
  duration: Toast.durations.LONG,
  position: Toast.positions.TOP,
  shadow: true,
  animation: true,
  hideOnPress: true,
  textColor: STYLES.color.light,
  backgroundColor: STYLES.color.primary,
};
