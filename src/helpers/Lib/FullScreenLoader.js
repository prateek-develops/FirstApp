import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const FullScreenLoader = ({status, children, size = 'large'}) => {
  return (
    <>
      {children}
      {status && (
        <View style={styles.loading}>
          <ActivityIndicator size={size} />
        </View>
      )}
    </>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.4,
    backgroundColor: 'black',
  },
});
