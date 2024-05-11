import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();
  const [showLoginButton, setShowLoginButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginButton(true); // 3초 후에 로그인 버튼을 보이게 함
    }, 3000); // 3000 밀리초 =3초

    return () => clearTimeout(timer); // 컴포넌트가 언마운트 될 때 타이머를 정리함
  }, []);

  const handleLogin = () => {
    // 로그인 버튼을 누르면 LoginScreen.js 페이지로 이동함
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
        <View style={styles.textContainer}>
          {/* 사진을 먼저 출력 */}
          <Image source={require('../../assets/dumbbell.png')} style={styles.dumbbellIcon}/>
          {/* 텍스트를 그 다음에 출력 */}
          <Text style={styles.mainText}>trAlner</Text>
          <Text style={styles.subText}>"AI trAner for you"</Text>
        </View>
        {/* 로딩 아이콘 */}
        {!showLoginButton && (
          <Image source={require('../../assets/Loading.png')} style={styles.loadingIcon} />
        )}
        {/* 로그인 버튼 */}
        {showLoginButton && (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.footerText}>Posture correction and exercise routine</Text>
      </ImageBackground>
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
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainText: {
    color: '#00C497',
    fontSize: 60,
    marginBottom: -30,
  },
  subText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 30,
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
    position: 'absolute',
    bottom: 40,
  },
  dumbbellIcon: {
    width: 35,
    height: 35,
    transform: [{ rotate: '30deg' }],
    left: 80,
    marginBottom: -33,
  },
  loadingIcon: {
    width: 35,
    height: 35,
    marginBottom: 20,
  },
  loginButton: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C497',
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default MainScreen;