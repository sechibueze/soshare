import React, {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useState,
} from 'react';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Button, Text } from 'react-native';
const AppBottomSheet = React.forwardRef((_, ref) => {
  // const sheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '45%', '60%'], []);

  //   const handlePress = () => {
  //     ref.current?.present();
  //   };
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={ref} snapPoints={snapPoints}>
        <Text>Bottom sheet works</Text>
        <Text>Bottom sheet works</Text>
        <Text>Bottom sheet works</Text>
        <Text>Bottom sheet works</Text>
        <Text>Bottom sheet works</Text>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default AppBottomSheet;
