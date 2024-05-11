import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyPageScreen = () => {
    const navigation = useNavigation(); // 네비게이션 객체 가져오기

    const handleLogout = async () => {
        // 로그아웃 로직...
    };

    const handleAdjust = () => {
        navigation.navigate('Adjust');
    };

    const handleDeleteAccount = async () => {
        // 회원 탈퇴 확인을 위한 경고 창 표시
        Alert.alert(
            '회원 탈퇴',
            '정말로 회원 탈퇴하시겠습니까?',
            [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '확인',
                    onPress: async () => {
                        try {
                            // 회원 탈퇴 API 호출
                            const response = await fetch('/src/userManagements/info/user-delete', {
                                method: 'DELETE',
                                // 필요한 헤더 추가
                            });

                            // 회원 탈퇴가 성공적으로 처리되었을 때
                            if (response.ok) {
                                // 로그인 화면으로 이동
                                navigation.navigate('Login');
                            } else {
                                // 회원 탈퇴 실패 시 에러 메시지 표시
                                Alert.alert('회원 탈퇴 실패', '회원 탈퇴를 처리하는 동안 문제가 발생했습니다.');
                            }
                        } catch (error) {
                            console.error('회원 탈퇴 에러:', error);
                            // 회원 탈퇴 실패 시 에러 메시지 표시
                            Alert.alert('회원 탈퇴 실패', '회원 탈퇴를 처리하는 동안 문제가 발생했습니다.');
                        }
                    },
                },
            ],
            { cancelable: false } // 사용자가 확인 또는 취소 버튼을 누르기 전까지는 뒤로 가기 버튼으로 취소할 수 없도록 설정
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={handleLogout}>
                        <View style={styles.row}>
                            <Text style={styles.subTitle}>로그아웃        </Text>
                            <View style={styles.iconContainer}>
                                <View style={styles.separator} />
                                <Image source={require('../../assets/right.png')} style={styles.icon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAdjust}>
                        <View style={styles.space} />
                        <View style={styles.row}>
                            <Text style={styles.subTitle}>개인정보 수정</Text>
                            <View style={styles.iconContainer}>
                                <View style={styles.separator} />
                                <Image source={require('../../assets/right.png')} style={styles.icon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteAccount}>
                        <View style={styles.space} />
                        <View style={styles.row}>
                            <Text style={styles.subTitle}>회원탈퇴</Text>
                            <View style={styles.iconContainer}>
                                <View style={[styles.separator, styles.longSeparator]} />
                                <Image source={require('../../assets/right.png')} style={styles.icon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'flex-start', // 위쪽으로 옮김
        alignItems: 'flex-start', // 가운데 정렬 제거
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 20, // 왼쪽 여백 추가
        marginTop: 70, // 위쪽으로 옮김
    },
    subTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto', // 점선과 아이콘을 텍스트 오른쪽으로 이동
    },
    separator: {
        height: 1,
        width: 130,
        backgroundColor: '#fff',
        marginRight: 10, // 점선 오른쪽 여백 추가
        marginLeft: 80,
    },
    longSeparator: {
        width: 170, // 긴 선으로 조정
    },
    icon: {
        width: 20,
        height: 20,
    },
    space: {
        marginBottom: 20, // 항목 사이 공백 추가
    },
});

export default MyPageScreen;
