import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdjustScreen = () => {
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
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);
  const [isMaleSelected, setIsMaleSelected] = useState(false);

  const navigation = useNavigation();

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

  const handleAdjust = async () => {
    // 필수 입력 정보를 모두 입력했는지 및 비밀번호 일치 여부 확인
    if (!id || !password || !passwordConfirmation || !email || !year || !month || !day || !height || !weight || !passwordMatch) {
      // 필수 정보가 모두 입력되지 않은 경우 알림 표시
      Alert.alert('알림', '모든 필수 정보를 입력하고 비밀번호를 확인해주세요.');
      return;
    }

    // Adjust API 호출 또는 필요한 로직 수행

    // 예시로 회원정보 수정 후, 메인 페이지로 이동하는 코드
    navigation.navigate('Main');
  };

  const handleOptionSelect = (index, option) => {
    setRectangles((prevRectangles) => {
      const updatedRectangles = [...prevRectangles];
      updatedRectangles[index].selectedOption = option;
      return updatedRectangles;
    });
  };

  const toggleFemale = () => {
    setIsFemaleSelected(!isFemaleSelected);
    setIsMaleSelected(false); // 여성 선택 시 남성 선택 해제
  };

  const toggleMale = () => {
    setIsMaleSelected(!isMaleSelected);
    setIsFemaleSelected(false); // 남성 선택 시 여성 선택 해제
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
        <Text style={styles.mainText}>trAlner</Text>
        <Text style={styles.subText}>회원정보 수정</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="ID" placeholderTextColor="#000" onChangeText={text => setId(text)} />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#000" secureTextEntry={true} onChangeText={text => setPassword(text)} />
          <TextInput style={styles.input} placeholder="Password again" placeholderTextColor="#000" secureTextEntry={true} onChangeText={handlePasswordConfirmation} />
          {!passwordMatch && <Text style={styles.passwordMismatchText}>비밀번호가 일치하지 않습니다.</Text>} 
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#000" onChangeText={text => setEmail(text)} />
          <View style={styles.birthdayContainer}>
            <Text style={styles.birthdayLabel}>Birthday</Text>
            <TextInput style={[styles.birthdayInput, { flex: 0.3 }]} placeholder="YYYY" placeholderTextColor="#000" onChangeText={text => setYear(text)} />
            <TextInput style={[styles.birthdayInput, { flex: 0.2 }]} placeholder="MM" placeholderTextColor="#000" onChangeText={text => setMonth(text)} />
            <TextInput style={[styles.birthdayInput, { flex: 0.2 }]} placeholder="DD" placeholderTextColor="#000" onChangeText={text => setDay(text)} />
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
            <TextInput style={[styles.input, { flex: 0.4 }]} placeholder="Height" placeholderTextColor="#000" onChangeText={text => setHeight(text)} />
            <TextInput style={[styles.input, { flex: 0.4 }]} placeholder="Weight" placeholderTextColor="#000" onChangeText={text => setWeight(text)} />
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
        <TouchableOpacity style={styles.adjustButton} onPress={handleAdjust}>
          <Text style={styles.adjustButtonText}>수정하기</Text>
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
  inputContainer: {
    width: '80%',
    marginBottom: 40,
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
    marginBottom: 20,
  },
  adjustButton: {
    backgroundColor: '#00C497',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  adjustButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000', // 글자색 변경
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  passwordMismatchText: {
    color: 'red',
    marginBottom: 10,
  },
  birthdayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  birthdayLabel: {
    color: '#fff',
    marginRight: 20,
  },
  birthdayInput: {
    backgroundColor: '#fff',
    color: '#000', // 글자색 변경
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: '#C4C4C4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxText: {
    color: '#fff',
  },
  inlineInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  subText1: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  subText2: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
  },
  rectangle: {
    backgroundColor: '#C4C4C4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  rectangleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rectangleText: {
    color: '#fff',
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  option: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  selectedOption: {
    backgroundColor: '#00C497',
  },
  optionText: {
    color: '#000',
  },
});

export default AdjustScreen;


