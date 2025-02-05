import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import colors from '../../utils/colors';

const BottomSheetDrawer = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    
      <BottomSheet
      style={{backgroundColor:colors.PRIMARY_BG}}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    
  );
};

const styles = StyleSheet.create({
 
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
    backgroundColor: colors.LIGHT_BG,
  },
});

export default BottomSheetDrawer;