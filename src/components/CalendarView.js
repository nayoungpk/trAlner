import React from 'react';
import { Calendar } from "react-native-calendars";
import { StyleSheet, View } from "react-native";

function CalendarView() {
    return (
        <View style={styles.container}>
            <Calendar style={styles.calendar} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40, // 달력 위에 공백 추가
    width: '100%', // 달력 넓이를 화면 전체로 설정
    alignItems: 'center', // 가운데 정렬
},
calendar: {
    borderWidth: 1, // 테두리 두께
    borderColor: '#e0e0e0', // 테두리 색상
    borderRadius: 20, // 테두리를 둥글게 만들기 위한 값 (조절 가능)
    width: '95%', // 달력 넓이를 95%로 설정 (가로 길이 늘림)
    aspectRatio: 1.1, // 가로 세로 비율 설정 (가로 길이를 세로 길이보다 1.2배로 설정)
}
});

export default CalendarView;