import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../app/components/css/style';

export default function FridgeApp() {
    const [memo, setMemo] = useState('');
    const [isMemoFocused, setIsMemoFocused] = useState(false);
    const [date, setDate] = useState(new Date());

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
                <Link href="../" style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Link>
                <Text style={styles.title}>냉장고 이름</Text>
                <View style={{ width: 24 }} /> {/* 제목을 가운데로 정렬하기 위한 빈 뷰 */}
            </View>

            <View style={styles.topIcons}>
                <Link href="/recipe-recommendation" style={styles.iconWrapper}>
                    <Image source={require('../assets/레시피북.png')} style={styles.icon} />
                    <Text style={styles.iconText}>레시피 추천</Text>
                </Link>

                <Link href="/add-ingredient" style={styles.iconWrapper}>
                    <Image source={require('../assets/냉장고.png')} style={styles.icon} />
                    <Text style={styles.iconText}>재료 추가</Text>
                </Link>
            </View>

            {/* 메모 및 날짜와 햄버거 버튼 영역 */}
            <View style={styles.memoSection}>
                <View style={styles.memoHeader}>
                    <Text style={styles.memoDate}>{formatDate(date)}</Text>
                    <Link href="/components/MemoList" style={styles.menuIcon}>
                        <Ionicons name="menu" size={24} color="black" />
                    </Link>
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