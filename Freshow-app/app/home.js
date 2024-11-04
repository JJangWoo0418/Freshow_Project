import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function FridgeApp() {
    const [memo, setMemo] = useState('');
    const [ingredients, setIngredients] = useState([
        { name: '한우', percentage: 10, image: 'image_url_1' },
        { name: '마늘', percentage: 30, image: 'image_url_2' },
        { name: '상추', percentage: 70, image: 'image_url_3' },
    ]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>냉장고 이름</Text>

            <View style={styles.topIcons}>
                <Link href="/recipe-recommendation" style={styles.iconWrapper}>
                    <Text style={styles.iconText}>레시피 추천</Text>
                    <Image source={{ uri: '../../assets/레시피북.png' }} style={styles.icon} />
                </Link>
                <Link href="/add-ingredient" style={styles.iconWrapper}>
                    <Text style={styles.iconText}>재료 추가</Text>
                    <Image source={{ uri: '../../assets/냉장고.png' }} style={styles.icon} />
                </Link>
            </View>

            <View style={styles.memoSection}>
                <TextInput
                    style={styles.memoInput}
                    value={memo}
                    onChangeText={setMemo}
                    placeholder="제목없는 메모..."
                    multiline
                />
            </View>

            <View style={styles.ingredientSection}>
                <Text style={styles.sectionTitle}>재료관리</Text>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                        <Image source={{ uri: ingredient.image }} style={styles.ingredientImage} />
                        <Text>{ingredient.name}</Text>
                        <View style={styles.progressWrapper}>
                            <View
                                style={{
                                    ...styles.progress,
                                    width: `${ingredient.percentage}%`,
                                    backgroundColor: ingredient.percentage > 50 ? 'green' : ingredient.percentage > 20 ? 'orange' : 'red',
                                }}
                            />
                        </View>
                        <Text>{ingredient.percentage}%</Text>
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
    title: {
        fontSize: 24,
        color: '#CDEEFF',
        textAlign: 'center',
        marginBottom: 20,
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
        fontSize: 16,
        color: '#333',
        marginBottom: 4, // 텍스트와 이미지 사이의 간격 조정
    },
    icon: {
        width: 40,
        height: 40,
    },
    memoSection: {
        marginBottom: 20,
    },
    memoInput: {
        width: '100%',
        height: 80,
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        backgroundColor: '#FFF',
    },
    ingredientSection: {
        backgroundColor: '#CDEEFF',
        padding: 16,
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    ingredientImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    progressWrapper: {
        flex: 1,
        height: 8,
        backgroundColor: '#ddd',
        borderRadius: 4,
        marginHorizontal: 8,
    },
    progress: {
        height: '100%',
        borderRadius: 4,
    },
});
