import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // AntDesign 아이콘 추가

const WorkResultScreen = ({ route, navigation }) => {
  const { result } = route.params;

  return (
    <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <AntDesign name="home" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.resultTitle}>운동 결과</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default WorkResultScreen;
