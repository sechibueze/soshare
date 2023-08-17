import React, { useMemo } from 'react';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
const AppBottomSheet = React.forwardRef(({ children }, ref) => {
  const snapPoints = useMemo(() => ['80%'], []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default AppBottomSheet;
