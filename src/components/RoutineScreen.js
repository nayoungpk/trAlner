import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RoutineScreen = ({ navigation }) => {
    const handleStart = () => {
        // 시작하기 버튼을 눌렀을 때 메이크스트림 페이지로 이동합니다.
        navigation.navigate('Make');
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
                <View style={[styles.header, { marginTop: -200 }]}>
                    <Text style={styles.title}>운동 루틴 추천</Text>
                    <Image source={require('../../assets/check.png')} style={styles.checkImage} />
                </View>
                <View style={{ height: 30 }}></View>
                <Text style={styles.subtitle}>
                    "당신의 건강은 가장 소중한 자산입니다. 오늘부터 건강한 삶을 위한 첫걸음을 내딛어보세요.
                </Text>
                <Text style={styles.description}>
                    꾸준한 노력과 열정으로 당신의 목표를 이룰 수 있을 거예요. 함께 응원하며 당신의 성공을 기대합니다!"
                </Text>
                <View style={{ height: 20 }}></View>
                <TouchableOpacity style={styles.button} onPress={handleStart}>
                    <Text style={styles.buttonText}>시작하기</Text>
                </TouchableOpacity>
                <View style={{ height: 20 }}></View>
                <Text style={styles.routineText}>내가 만든 운동 루틴</Text>
                <View style={{ height: 20 }}></View>
                
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#fff',
    },
    checkImage: {
        width: 30,
        height: 30,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 150,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    // 추가된 운동 루틴 문구 스타일
    routineText: {
        fontSize: 25,
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
        

    },
    // 추가된 사각형 스타일
    rectangle: {
        width: 350,
        height: 50,
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 10,
    },
});

export default RoutineScreen;