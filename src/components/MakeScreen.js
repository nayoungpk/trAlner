import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const MakeScreen = () => {

    // 사용자가 사용하는 날짜
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    // 각 사각형에 대한 상태와 선택 함수를 배열로 관리
    const [rectangles, setRectangles] = useState([
        { title: '가슴 / 강도', selectedOption: null },
        { title: '등 /  강도', selectedOption: null },
        { title: '복근 /  강도', selectedOption: null },
        { title: '하체 /  강도', selectedOption: null },
    ]);

    // 옵션을 선택할 때의 처리 함수
    const handleOptionSelect = (index, option) => {
        setRectangles((prevRectangles) => {
            const updatedRectangles = [...prevRectangles];
            updatedRectangles[index].selectedOption = option;
            return updatedRectangles;
        });
    };

    // 전송 버튼을 눌렀을 때의 처리 함수
    const handleSendButtonPress = () => {
        // 알림창을 표시하여 숫자를 선택할 수 있도록 함
        Alert.alert(
            '운동 기간 선택',
            '원하는 운동 기간을 선택해주세요 (1부터 7까지)',
            [...Array(7).keys()].map((num) => ({
                text: `${num + 1}`,
                onPress: () => handleNumberSelect(num + 1),
            }))
        );
    };

    // 숫자를 선택했을 때의 처리 함수
    const handleNumberSelect = (number) => {
        Alert.alert(`선택된 기간: ${number}`);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
                {/* 사용자가 사용하는 날짜를 표시하는 부분 */}
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{`< ${year}년 ${month}월 ${day}일 >`}</Text>
                </View>
                {/* 반복되는 사각형들을 생성 */}
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
                {/* 전송 버튼 추가 */}
                <TouchableOpacity style={styles.button} onPress={handleSendButtonPress}>
                    <Text style={styles.buttonText}>운동 루틴 만들기</Text>
                </TouchableOpacity>
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
    title: {
        fontSize: 18,
        color: '#fff',
    },
    dateContainer: {
        position: 'absolute',
        top: 40,
        alignSelf: 'center',
    },
    dateText: {
        fontSize: 18,
        color: '#fff',
    },
    rectangle: {
        width: '80%',
        backgroundColor: 'transparent',
        borderRadius: 10,
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
    button: {
        backgroundColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 120, // 긴 형태로 만들기 위해 가로 길이를 조절합니다.
        marginTop: 20, // 버튼과 사각형 사이에 간격을 주기 위해 marginTop 추가
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default MakeScreen;