import React from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    // 아이디와 비밀번호가 각각 "1"일 때 로그인 성공으로 가정
    if (username === 'na' && password === '1') {
      console.log('Login Successful');
      navigation.navigate('Home', { username: username });
    } else {
      console.log('Login Failed');
      // 여기에 로그인 실패 시 동작 추가
    }

    // 데이터베이스와의 연결을 위한 API 주소
    const loginApi = '/src/userManagements/login';
    try {
      const response = await fetch(loginApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Login Successful');
        navigation.navigate('Home', { username: username });
      } else {
        console.log('Login Failed');
        // 여기에 로그인 실패 시 동작 추가
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>trAlner</Text>
          <Text style={styles.subText}>"AI trAiner for you"</Text>
          <TextInput
            style={[styles.input, { height: 40, marginTop: 20 }]}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={[styles.input, { height: 40 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <TouchableOpacity style={styles.signupLink} onPress={handleSignUp}>
              <Text style={styles.linkText}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotPasswordLink}>
              <Text style={styles.linkText}>아이디 / 비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: -20,
  },
  subText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 80,
  },
  input: {
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 0,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  loginButtonText: {
    color: '#00C497',
    fontSize: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupLink: {
    marginRight: 10,
  },
  linkText: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginHorizontal: 10,
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
    position: 'absolute',
    bottom: 40,
  },
});

export default LoginScreen; 