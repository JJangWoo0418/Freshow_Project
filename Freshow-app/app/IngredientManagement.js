import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // fridgeId 가져오기
import { auth, db } from './firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import styles from './components/css/IngredientManagementStyle';

const IngredientManagement = () => {
    const { fridgeId } = useLocalSearchParams(); // MainPage에서 전달받은 fridgeId
    const [categories, setCategories] = useState([]);

    // 유통기한 퍼센트 계산 함수
    const calculateExpiryPercentage = (expiryDate) => {
        try {
            if (typeof expiryDate === 'number') {
                expiryDate = expiryDate.toString();
            }

            if (typeof expiryDate === 'string' && expiryDate.length === 8) {
                const expiry = new Date(
                    `${expiryDate.substring(0, 4)}-${expiryDate.substring(4, 6)}-${expiryDate.substring(6, 8)}`
                );
                const today = new Date();
                const totalDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
                const maxShelfLife = 10; // 최대 유통기한 일수
                const percentage = Math.max(0, Math.min(100, Math.round((totalDays / maxShelfLife) * 100)));
                return percentage;
            }
        } catch (error) {
            console.error('유통기한 계산 오류:', error);
        }
        return 0;
    };

    const fetchIngredients = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser || !fridgeId) {
            console.error('로그인이 필요하거나 유효하지 않은 냉장고 ID입니다.');
            return;
        }

        try {
            const ingredientsCollection = collection(db, '계정', currentUser.uid, '냉장고', fridgeId, '재료');
            const categorySnapshot = await getDocs(ingredientsCollection);

            const fetchedCategories = [];
            categorySnapshot.forEach((doc) => {
                const data = doc.data();
                const items = Object.keys(data).map((key) => ({
                    name: key,
                    expiryDate: data[key],
                    expiryPercentage: calculateExpiryPercentage(data[key]),
                    image: require('../assets/삼겹살.jpg'), // 예제 이미지
                }));
                fetchedCategories.push({
                    title: doc.id,
                    items,
                });
            });

            setCategories(fetchedCategories);
        } catch (error) {
            console.error('재료 데이터 가져오기 오류:', error);
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, [fridgeId]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {categories.map((category, index) => (
                <View key={index} style={styles.categoryContainer}>
                    <View style={styles.categoryHeader}>
                        <Text style={styles.categoryTitle}>{category.title}</Text>
                        <TouchableOpacity>
                            <Text style={styles.addButton}>+</Text>
                        </TouchableOpacity>
                    </View>
                    {category.items.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            <Image source={ingredient.image} style={styles.ingredientImage} />
                            <View style={styles.ingredientDetails}>
                                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                                <View style={styles.progressBarContainer}>
                                    <View
                                        style={{
                                            ...styles.progressBar,
                                            width: `${ingredient.expiryPercentage}%`,
                                            backgroundColor:
                                                ingredient.expiryPercentage > 50
                                                    ? 'green'
                                                    : ingredient.expiryPercentage > 20
                                                    ? 'orange'
                                                    : 'red',
                                        }}
                                    />
                                </View>
                            </View>
                            <Text style={styles.percentageText}>{ingredient.expiryPercentage}%</Text>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

export default IngredientManagement;
