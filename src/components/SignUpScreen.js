import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native'; // Alert 추가
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);
  const [isMaleSelected, setIsMaleSelected] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [exerciseAbility, setExerciseAbility] = useState('');
  const [rectangles, setRectangles] = useState([
    { title: '가슴 / 난이도', selectedOption: null },
    { title: '등 / 난이도', selectedOption: null },
    { title: '복근 / 난이도', selectedOption: null },
    { title: '하체 / 난이도', selectedOption: null },
  ]);
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태 추가

  const navigation = useNavigation();

  const toggleFemale = () => {
    setIsFemaleSelected(!isFemaleSelected);
    if (isMaleSelected) setIsMaleSelected(false);
  };

  const toggleMale = () => {
    setIsMaleSelected(!isMaleSelected);
    if (isFemaleSelected) setIsFemaleSelected(false);
  };

  // 비밀번호 확인 함수
  const handlePasswordConfirmation = (text) => {
    setPasswordConfirmation(text);
    // 비밀번호 확인과 일치 여부 확인
    if (text !== password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleSignUp = async () => {
    // 필수 입력 정보를 모두 입력했는지 및 비밀번호 일치 여부 확인
    if (!id || !password || !passwordConfirmation || !email || !year || !month || !day || !height || !weight  || (!isFemaleSelected && !isMaleSelected) || !passwordMatch) {
      // 필수 정보가 모두 입력되지 않은 경우 알림 표시
      Alert.alert('알림', '모든 필수 정보를 입력하고 비밀번호를 확인해주세요.');
      return;
    }

    const signUpApi = '/src/userManagements/signup';

    try {
      const response = await fetch(signUpApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          password: password,
          passwordConfirmation: passwordConfirmation,
          email: email,
          year: year,
          month: month,
          day: day,
          height: height,
          weight: weight,
          gender: isFemaleSelected ? 'female' : isMaleSelected ? 'male' : '',
        }),
      });
      const data = await response.json();
      console.log(data); // 서버로부터의 응답을 확인하고 필요에 따라 처리
      navigation.navigate('Login'); // 회원 가입이 완료되면 로그인 페이지로 이동
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOptionSelect = (index, option) => {
    setRectangles((prevRectangles) => {
      const updatedRectangles = [...prevRectangles];
      updatedRectangles[index].selectedOption = option;
      return updatedRectangles;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
        <Text style={styles.mainText}>trAlner</Text>
        <Text style={styles.subText}>"AI trAlner for you"</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="ID" placeholderTextColor="#fff" onChangeText={text => setId(text)} />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#fff" secureTextEntry={true} onChangeText={text => setPassword(text)} />
          <TextInput style={styles.input} placeholder="Password again" placeholderTextColor="#fff" secureTextEntry={true} onChangeText={handlePasswordConfirmation} />
          {!passwordMatch && <Text style={styles.passwordMismatchText}>비밀번호가 일치하지 않습니다.</Text>}
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#fff" onChangeText={text => setEmail(text)} />
          <View style={styles.birthdayContainer}>
            <Text style={styles.birthdayLabel}>Birthday</Text>
            <TextInput style={[styles.birthdayInput, { flex: 0.3 }]} placeholder="YYYY" placeholderTextColor="#fff" onChangeText={text => setYear(text)} />
            <TextInput style={[styles.birthdayInput, { flex: 0.2 }]} placeholder="MM" placeholderTextColor="#fff" onChangeText={text => setMonth(text)} />
            <TextInput style={[styles.birthdayInput, { flex: 0.2 }]} placeholder="DD" placeholderTextColor="#fff" onChangeText={text => setDay(text)} />
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, isFemaleSelected && { backgroundColor: '#fff' }]}
              onPress={toggleFemale}
            >
              <Text style={[styles.checkboxText, isFemaleSelected && { color: '#00C497' }]}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkbox, isMaleSelected && { backgroundColor: '#fff' }]}
              onPress={toggleMale}
            >
              <Text style={[styles.checkboxText, isMaleSelected && { color: '#00C497' }]}>Male</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inlineInputContainer}>
            <TextInput style={[styles.input, { flex: 0.4 }]} placeholder="Height" placeholderTextColor="#fff" onChangeText={text => setHeight(text)} />
            <TextInput style={[styles.input, { flex: 0.4 }]} placeholder="Weight" placeholderTextColor="#fff" onChangeText={text => setWeight(text)} />
          </View>
          <Text style={styles.subText1}>Athletic Ability</Text>
          <Text style={styles.subText2}>"운동능력을 모르면 '선택x'를 눌러주세요"</Text>
          {/* 사각형들 추가 */}
          {rectangles.map((rectangle, index) => (
            <View style={styles.rectangle} key={index}>
              <View style={styles.rectangleContent}>
                <Text style={styles.rectangleText}>{rectangle.title}</Text>
                <View style={styles.optionsContainer}>
                  {['상', '중', '하', '선택x'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.option,
                        rectangle.selectedOption === option && styles.selectedOption,
                      ]}
                      onPress={() => handleOptionSelect(index, option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  inlineInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transparentBorderInput: {
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: '#00C497',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkbox: {
    width: '48%',
    height: 40,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    color: '#fff',
  },
  mainText: {
    color: '#00C497',
    fontSize: 60,
    marginBottom: 30,
  },
  subText: {
    color: '#fff',
    fontSize: 18,
    marginTop: -30,
  },
  subText1: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  subText2: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 20,
  },
  birthdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  birthdayLabel: {
    color: '#fff',
    fontSize: 13,
    flex: 0.2,
  },
  birthdayInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
    flex: 0.2,
  },
  exerciseAbilityText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  exerciseAbilityContainer1: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    height: 150, // 원하는 높이로 조정
  },
  rectangle: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  rectangleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rectangleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  option: {
    marginHorizontal: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 투명도를 50%로 지정합니다.
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  passwordMismatchText: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default SignUpScreen;

