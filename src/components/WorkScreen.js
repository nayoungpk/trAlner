import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WorkScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showInstructions, setShowInstructions] = useState(true);
    const [selectedMuscle, setSelectedMuscle] = useState(null); // 선택된 근육
    const navigation = useNavigation();

    const handleSearch = () => {
        // 검색 기능을 여기에 구현
        console.log('검색어:', searchQuery);
        setShowInstructions(false); // 사용자가 검색을 하면 안내 메시지를 숨깁니다.
    };

    const goToDescriptionScreen = (exercise) => {
        // DescriptionScreen으로 이동하는 함수
        navigation.navigate('Description', exercise);
    };

    const filterExercisesByMuscle = (muscle) => {
        setSelectedMuscle(muscle === '전체' ? null : muscle);
    };

    const exercises = [
        {
            exercise: '푸시업',
            muscles: '대흉근, 상완삼두근, 전면 삼각근',
            method: '1. 엎드려 손을 어깨 너비로 벌려 바닥에 손바닥을 대고 몸을 일직선으로 유지합니다.\n\n2. 팔을 굽혀 가슴을 바닥에 닿게 합니다.\n\n3. 가슴이 바닥에 닿은 자세를 유지합니다.\n\n4. 다시 팔을 펴 몸을 올려 기본 자세로 돌아갑니다.\n\n',
            caution: '올바른 자세를 유지하고, 너무 깊게 내려가지 않도록 주의해야 합니다.',
            majormuscle: '가슴',
        },
        {
            exercise: '플랭크',
            muscles: '복직근',
            method: '1. 엎드려 손과 발을 바닥에 대고 몸을 일직선으로 만듭니다. \n\n2. 팔은 어깨 너비로 벌리고, 팔꿈치는 바로 아래에 위치시킵니다.\n\n3. 복부와 엉덩이를 꽉 끌어 올리고, 골반을 아래로 떨어지지 않게 유지합니다\n\n4. 등과 목은 일직선을 이루도록 유지하세요.\n\n',
            caution: '등이나 골반이 굽지 않도록 주의하세요. 너무 과도한 압력을 가하면 부상을 유발할 수 있으므로 조심스럽게 운동하세요.',
            majormuscle: '복근',
        },
        {
            exercise: '니푸시업',
            muscles: '대흉근, 상완삼두근, 전면 삼각근',
            method: '1. 엎드려 손을 어깨 너비로 벌려 바닥에 손바닥과 무릎을 대고 몸을 일직선으로 유지합니다.\n\n2. 팔을 굽혀 가슴을 바닥에 닿게 합니다.\n\n3. 가슴이 바닥에 닿은 자세를 유지합니다.\n\n4. 다시 팔을 펴 몸을 올려 기본 자세로 돌아갑니다.\n\n',
            caution: '올바른 자세를 유지하고, 너무 깊게 내려가지 않도록 주의해야 합니다.',
            majormuscle: '가슴',
        },{
            exercise: '레그레이즈',
            muscles: '복직근 하부, 장요근',
            method: '1. 등을 바닥에 누운 상태에서 손을 옆으로 펴고 손바닥이 바닥을 향하도록 합니다.\n\n2. 다리를 일직선으로 뻗어 바닥에 대고 엉덩이를 들어 올립니다.\n\n3. 다리를 천천히 들어올려 복부 근육을 사용합니다.\n\n4. 일직선으로 들어가며, 엉덩이가 뜨지 않도록 자세를 유지합니다.\n\n',
            caution: '올바른 자세를 유지하고, 너무 깊게 내려가지 않도록 주의해야 합니다.',
            majormuscle: '복근',
        },
        {
            exercise: '시저크로스',
            muscles: '복근, 엉덩이 굴곡근, 내전근, 등 하부, 박리근',
            method: '1. 엎드려 손을 어깨 너비로 벌려 바닥에 손바닥을 대고 몸을 일직선으로 유지합니다.\n\n2. 팔을 굽혀 가슴을 바닥에 닿게 합니다.\n\n3. 가슴이 바닥에 닿은 자세를 유지합니다.\n\n4. 다시 팔을 펴 몸을 올려 기본 자세로 돌아갑니다.\n\n5. 이 과정을 반복하여 원하는 횟수만큼 푸시업을 진행합니다.\n\n',
            caution: '올바른 자세를 유지하고, 너무 깊게 내려가지 않도록 주의해야 합니다.',
            majormuscle: '복근',
        },
        {
            exercise: '힙쓰러스트',
            muscles: '대둔근, 대퇴 사두근, 햄스트링',
            method: '1. 엎드려 손을 어깨 너비로 벌려 바닥에 손바닥을 대고 몸을 일직선으로 유지합니다.\n\n2. 팔을 굽혀 가슴을 바닥에 닿게 합니다.\n\n3. 가슴이 바닥에 닿은 자세를 유지합니다.\n\n4. 다시 팔을 펴 몸을 올려 기본 자세로 돌아갑니다.\n\n5. 이 과정을 반복하여 원하는 횟수만큼 푸시업을 진행합니다.\n\n',
            caution: '올바른 자세를 유지하고, 너무 깊게 내려가지 않도록 주의해야 합니다.',
            majormuscle: '하체',
        },
        {
            exercise: '굿모닝',
            muscles: '대둔근, 대퇴 사두근, 햄스트링',
            method: '1. 엎드려 손을 어깨 너비로 벌려 바닥에 손바닥을 대고 몸을 일직선으로 유지합니다.\n\n2. 팔을 굽혀 가슴을 바닥에 닿게 합니다.\n\n3. 가슴이 바닥에 닿은 자세를 유지합니다.\n\n4. 다시 팔을 펴 몸을 올려 기본 자세로 돌아갑니다.\n\n5. 이 과정을 반복하여 원하는 횟수만큼 푸시업을 진행합니다.\n\n',
            caution: '올바른 자세를 유지하고, 너무 깊게 내려가지 않도록 주의해야 합니다.',
            majormuscle: '등',
        },
        {
            exercise: '스탠딩 사이드 크런치',
            muscles: '주 : 외복사근, 부 : 복직근',
            method: '1. 서서 발을 어깨 너비로 벌리고, 손은 양쪽으로 펴서 허리 높이에서 똑바로 들어올립니다.\n\n2. 복부를 수축하고 근육을 긴장시킵니다.\n\n3. 한 쪽 다리로 몸을 굽히면서 옆으로 숙입니다. 이때 다리를 굽히는 것이 아니라 허리를 측면으로 굽히도록 합니다.\n\n4. 상체를 옆으로 기울이면서 한 쪽 다리를 바깥쪽으로 뻗어, 해당 측의 허리 쪽에 부담을 줍니다.\n\n5. 천천히 원래 자세로 돌아와 시작 자세로 복귀합니다.\n\n',
            caution: '올바른 자세를 유지하고, 너무 깊게 내려가지 않도록 주의해야 합니다.',
            majormuscle: '복근',
        },

    ];

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/B1.png')} style={styles.backgroundImage}>
                <Text style={styles.listTitle}>LIST</Text>
                <View style={styles.searchContainer}>
                    <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchBox}
                        placeholder="검색하기..."
                        placeholderTextColor="#555"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Text style={styles.searchButtonText}>검색</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal>
                    <View style={[styles.rectangleContainer, { marginTop: -200 }]}>
                    <TouchableOpacity style={[styles.rectangle, selectedMuscle === '등' && styles.activeRectangle]} onPress={() => filterExercisesByMuscle('등')}>
                            <Text style={styles.rectangleText}>등</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rectangle, selectedMuscle === '하체' && styles.activeRectangle]} onPress={() => filterExercisesByMuscle('하체')}>
                            <Text style={styles.rectangleText}>하체</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rectangle, selectedMuscle === '가슴' && styles.activeRectangle]} onPress={() => filterExercisesByMuscle('가슴')}>
                            <Text style={styles.rectangleText}>가슴</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rectangle, selectedMuscle === '복근' && styles.activeRectangle]} onPress={() => filterExercisesByMuscle('복근')}>
                            <Text style={styles.rectangleText}>복근</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rectangle, selectedMuscle === '전신' && styles.activeRectangle]} onPress={() => filterExercisesByMuscle('전신')}>
                            <Text style={styles.rectangleText}>전신</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rectangle}>
                            <Text style={styles.rectangleText}>Like</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rectangle, selectedMuscle === '전체' && styles.activeRectangle]} onPress={() => filterExercisesByMuscle('전체')}>
                        <Text style={styles.rectangleText}>전체</Text>
                        </TouchableOpacity>
                        {/* 필요한 만큼 더 추가하세요 */}
                    </View>
                </ScrollView>
                <View style={styles.scrollViewContainer}>
                    <ScrollView style={{ marginTop: -200 }}>
                        {exercises
                        .filter(exercise => selectedMuscle ? exercise.majormuscle === selectedMuscle : true) // 선택된 근육에 따라 운동을 필터링합니다.
                            .filter(exercise => exercise.exercise.toLowerCase().includes(searchQuery.toLowerCase())) // 검색어와 일치하는 운동만 필터링합니다.
                            .map((exercise, index) => (
                                <TouchableOpacity key={index} style={[styles.rectangle, styles.customRectangle, { marginBottom: 10 }]} onPress={() => goToDescriptionScreen(exercise)}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../assets/ex.png')} style={[styles.customImage, { width: 50, height: 50 }]} />
                                        <Text style={[styles.rectangleText, { marginLeft: 5, fontSize: 15, color: '#fff' }]}>
                                            {exercise.exercise} : {'\n'} {exercise.muscles}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                    </ScrollView>
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
    listTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#fff', // 필요에 따라 수정하세요
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    searchIcon: {
        width: 24,
        height: 24,
        marginRight: 5,
        marginLeft: 10,
    },
    searchBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10, // 필요에 따라 수정하세요
        flex: 1,
        backgroundColor: '#fff', // 필요에 따라 수정하세요
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    rectangleContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rectangle: {
        backgroundColor: '#ccc', // 필요에 따라 수정하세요
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15, // 필요에 따라 수정하세요
        marginHorizontal: 5, // 필요에 따라 수정하세요
        marginBottom: 10, // 필요에 따라 수정하세요
    },
    rectangleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // 필요에 따라 수정하세요
    },
    customRectangle: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1, // 테두리의 두께를 설정할 수도 있습니다.
        width: 350,
    },
    scrollViewContainer: {
        marginTop: 20,
        flex: 1, // 스크롤 뷰가 전체 공간을 차지하도록 설정합니다.
    },
});

export default WorkScreen;