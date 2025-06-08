import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SafeAreaWrapper({ children, className }) {
  return (
    <SafeAreaView className={className} style={{ flex: 1 }} edges={['top', 'bottom']}>
      {children}
    </SafeAreaView>
  );
}
