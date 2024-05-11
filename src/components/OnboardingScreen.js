import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const OnboardingScreen = ({ backgroundImage }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingScreen;