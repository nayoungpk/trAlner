import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

// 임시 결과 생성 함수
const generateTemporaryResult = () => {
  // 임시로 생성된 결과 데이터
  const temporaryResult = {
    exercise: "임시 운동", // 임시 운동 이름
    result: "임시 결과", // 임시 결과 내용
  };
  return temporaryResult;
};

const CameraScreen = ({ navigation, route }) => {
  const { exercise } = route.params;
  const [isRecording, setIsRecording] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [recordedTime, setRecordedTime] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  // 동영상 업로드 및 결과 전달 함수
  const uploadVideoToServer = async (videoUri) => {
    try {
      // 실제 서버에 연결 시도
      const formData = new FormData();
      formData.append('video', {
        uri: videoUri,
        type: 'video/mp4',
        name: 'video.mp4',
      });

      const response = await fetch(`/src/user/pose-correction/${exercise}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          // 추가적인 헤더 필요 시 여기에 추가
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('비디오 업로드 실패');
      }

      const responseData = await response.json();
      console.log('비디오 업로드 성공:', responseData);
      navigation.navigate('WorkResult', { result: responseData });
    } catch (error) {
      console.error('비디오 업로드 오류:', error);
      // 서버에 연결할 수 없을 때 임시 결과 사용
      const temporaryResult = generateTemporaryResult();
      console.log('임시 결과:', temporaryResult);
      // WorkResult 페이지로 임시 결과 전달
      navigation.navigate('WorkResult', { result: temporaryResult.result });
      Alert.alert('업로드 실패', '비디오 업로드에 실패했습니다. 인터넷 연결을 확인해주세요.');
    }
  };

  const startRecording = async () => {
    if (cameraRef) {
      try {
        setIsRecording(true);
        const videoRecordPromise = cameraRef.recordAsync();
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          console.log('비디오 녹화 완료:', data.uri);
          uploadVideoToServer(data.uri);
        }
      } catch (error) {
        console.error('비디오 녹화 실패:', error);
      } finally {
        setIsRecording(false);
        setRecordedTime(0);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef) {
      cameraRef.stopRecording();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.recordButton} onPress={isRecording ? stopRecording : startRecording}>
            <MaterialIcons name={isRecording ? 'stop' : 'fiber-manual-record'} size={50} color="white" />
          </TouchableOpacity>
          {isRecording && (
            <Text style={styles.timerText}>{formatTime(recordedTime)}</Text>
          )}
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 20,
    color: 'white',
  },
});

export default CameraScreen;
