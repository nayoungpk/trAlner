import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CalendarComponent from './CalendarView'; // CalendarComponent를 import합니다.
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';

const HomeScreen = ({ route }) => {
    const username = route.params?.username || '';
    const navigation = useNavigation(); // 네비게이션 객체 가져오기


    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.header}>
                        <Text style={styles.username}>{username}</Text>
                        <Text style={[styles.calendar, { marginRight: 50 }]}>운동달력</Text>
                        <Image source={require('../../assets/person.png')} style={styles.profileImage} />
                        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
                            <Text style={styles.myPageText}>MY PAGE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.routineText}>Routine</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.workText}>Work</Text>
                        </TouchableOpacity>
                    </View>
                    <CalendarComponent />
                    <View style={styles.feedbackContainer}>
                        <Text style={styles.feedbackText}>{'\n'}운동피드백 기록</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../assets/ex.png')} style={styles.image} />
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../assets/ex.png')} style={styles.image} />
                    </View>
                </ScrollView>
                <View style={[styles.bottomTabNavigator, { height: 80 }]}>
                     <BottomTabNavigator />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    username: {
        color: '#fff',
        fontSize: 20,
        marginRight: 10,
    },
    calendar: {
        color: '#fff',
        fontSize: 20,
        marginRight: 10,
    },
    profileImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    myPageText: {
        color: '#fff',
        fontSize: 12,
    },
    routineText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 10,
    },
    workText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 10,
    },
    feedbackContainer: {
        marginTop: 10, // 여백 주기
        alignItems: 'center', // 가운데 정렬
    },
    feedbackText: {
        color: '#fff',
        fontSize: 20,
        marginTop: 0,
        marginLeft: -220,
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        marginLeft: 20,
        padding: 10, // 사각형 내부 여백
        marginTop: 30,
        width: 350,
        height: 70,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    bottomTabNavigator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50, // 조절할 높이 값
    },
});

export default HomeScreen;