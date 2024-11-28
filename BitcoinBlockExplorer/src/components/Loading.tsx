import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from './Colors';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  style?: object;
}

const LoadingView: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default LoadingView;
