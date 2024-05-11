import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // useNavigation 추가
import { Camera } from 'expo-camera';

const DescriptionScreen = ({ route }) => {
  const navigation = useNavigation(); // navigation 추가
  const { exercise, muscles, method, caution, majormuscle } = route.params;

  const handleStartExercise = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      // 카메라 권한이 허용된 경우 카메라를 엽니다.
      navigation.navigate('Camera', { exercise }); // CameraScreen으로 네비게이션
    } else {
      // 권한이 거부된 경우 사용자에게 알림을 표시할 수 있습니다.
      alert('카메라 권한이 필요합니다.');
    }
  };

  return (
    <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={require('../../assets/ex.png')} style={styles.image} />
          <Text style={styles.title}>{exercise}{'\n'} <Text style={styles.description}>{muscles}</Text></Text>
        </View>
        <Text style={styles.methodTitle}>{'\n'}운동방법{'\n'}</Text>
        <Text style={styles.method}>{method}</Text>
        
        <Text style={styles.cautionTitle1}>-------</Text>
        <Text style={styles.cautionTitle2}>주의사항{'\n'}</Text>
        <Text style={styles.caution}>{caution}</Text>
        <TouchableOpacity style={styles.startButton} onPress={handleStartExercise}>
          <Text style={styles.startButtonText}>운동 시작하기</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row', // 이미지를 텍스트 왼쪽에 오도록 변경
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10, // 텍스트와 이미지 사이의 간격 조절
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  method: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginLeft: 10,
  },
  majormuscle:{
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginLeft: 10,
  },

  caution: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    textAlign: 'center',
  },
  methodTitle: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'left', // 화면 왼쪽 정렬
    marginLeft: 10,
  },
  cautionTitle1: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  cautionTitle2: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'left', // 화면 왼쪽 정렬
    marginLeft: 10,
  },
  startButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10, // paddingHorizontal 값 조정
    marginTop: 20, 
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default DescriptionScreen;

