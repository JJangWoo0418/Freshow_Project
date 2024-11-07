import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FridgeApp() {
    const [memo, setMemo] = useState('');
    const [isMemoFocused, setIsMemoFocused] = useState(false);
    const [date, setDate] = useState(new Date());
    const navigation = useNavigation();

    const [ingredients, setIngredients] = useState([
        { name: '한우', expiryDays: 3, image: require('../assets/삼겹살.jpg') },
        { name: '마늘', expiryDays: 7, image: require('../assets/채소.png') },
        { name: '상추', expiryDays: 10, image: require('../assets/채소.png') },
    ]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
            setIngredients((prevIngredients) =>
                prevIngredients.map((ingredient) => ({
                    ...ingredient,
                    expiryDays: ingredient.expiryDays > 0 ? ingredient.expiryDays - 1 : 0,
                }))
            );
        }, 86400000);
        return () => clearInterval(timer);
    }, []);

    const calculatePercentage = (expiryDays) => {
        const totalShelfLife = 10;
        return Math.round((expiryDays / totalShelfLife) * 100);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>냉장고 이름</Text>
                <View style={{ width: 24 }} /> {/* 제목을 가운데로 정렬하기 위한 빈 뷰 */}
            </View>

            <View style={styles.topIcons}>
                <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('recipe-recommendation')}>
                    <Image source={require('../assets/레시피북.png')} style={styles.icon} />
                    <Text style={styles.iconText}>레시피 추천</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('add-ingredient')}>
                    <Image source={require('../assets/냉장고.png')} style={styles.icon} />
                    <Text style={styles.iconText}>재료 추가</Text>
                </TouchableOpacity>
            </View>

            {/* 메모 및 날짜와 햄버거 버튼 영역 */}
            <View style={styles.memoSection}>
                <View style={styles.memoHeader}>
                    <Text style={styles.memoDate}>{formatDate(date)}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('components/MemoList')}
                        style={styles.menuIcon}
                    >
                        <Ionicons name="menu" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.memoInput}
                    value={memo}
                    onChangeText={setMemo}
                    placeholder="제목없는 메모..."
                    multiline
                    onFocus={() => setIsMemoFocused(true)}
                    onBlur={() => setIsMemoFocused(false)}
                />
            </View>

            <View style={styles.ingredientSection}>
                <Text style={styles.sectionTitle}>재료관리</Text>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                        <Image source={ingredient.image} style={styles.ingredientImage} />
                        <Text style={styles.ingredientName}>{ingredient.name}</Text>
                        <View style={styles.progressWrapper}>
                            <View
                                style={{
                                    ...styles.progress,
                                    width: `${calculatePercentage(ingredient.expiryDays)}%`,
                                    backgroundColor: calculatePercentage(ingredient.expiryDays) > 50 ? 'green' : calculatePercentage(ingredient.expiryDays) > 20 ? 'orange' : 'red',
                                }}
                            />
                        </View>
                        <Text>{calculatePercentage(ingredient.expiryDays)}%</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        paddingRight: 10,
    },
    title: {
        fontFamily: "ONE Mobile POP",
        fontSize: 32,
        color: '#CDEEFF',
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        flex: 1,
    },
    topIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    iconWrapper: {
        alignItems: 'center',
    },
    iconText: {
        fontFamily: "ONE Mobile POP",
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    icon: {
        width: 80,
        height: 80,
    },
    memoSection: {
        marginBottom: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#FFFCED',
        padding: 8,
    },
    memoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    memoDate: {
        fontFamily: "ONE Mobile POP",
        fontSize: 14,
        color: '#666',
    },
    menuIcon: {
        padding: 8,
    },
    memoInput: {
        width: '100%',
        height: 80,
        fontFamily: "ONE Mobile POP",
        color: '#999999',
        fontSize: 12,
        textAlignVertical: 'top',
    },
    ingredientSection: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#CDEEFF',
        padding: 16,
    },
    sectionTitle: {
        fontFamily: "ONE Mobile POP",
        fontSize: 25,
        marginBottom: 10,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        padding: 8,
    },
    ingredientImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    ingredientName: {
        fontFamily: "ONE Mobile POP",
        fontSize: 14,
        fontWeight: '400',
    },
    progressWrapper: {
        flex: 1,
        height: 8,
        backgroundColor: '#ddd',
        borderRadius: 4,
        marginLeft: 8,
    },
    progress: {
        height: '100%',
        borderRadius: 4,
    },
});
