import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; // fridgeId 가져오기
import { auth, db } from './firebaseconfig';
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'; // 뒤로가기 버튼 아이콘
import styles from './components/css/IngredientManagementStyle';
//
const IngredientManagement = () => {
    const { fridgeId } = useLocalSearchParams(); // MainPage에서 전달받은 fridgeId
    const router = useRouter(); // 화면 이동을 위한 router 추가
    const [categories, setCategories] = useState([]);
    const [fridgeName, setFridgeName] = useState(''); // 냉장고 이름 상태 추가

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
                    name: key, // 음식 이름 (문서 필드 이름)
                    image: data[key]["사진"] ? { uri: data[key]["사진"] } : require('../assets/삼겹살.jpg'), // 이미지
                    expiryDate: data[key]["유통기한"] || "유통기한 없음", // 유통기한
                    expiryPercentage: calculateExpiryPercentage(data[key]["유통기한"]), // 유통기한 퍼센트 계산
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

    const fetchFridgeName = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser || !fridgeId) return;

        try {
            const fridgeDoc = doc(db, '계정', currentUser.uid, '냉장고', fridgeId);
            const fridgeData = await getDoc(fridgeDoc);
            if (fridgeData.exists()) {
                setFridgeName(fridgeData.data().name || '냉장고');
            }
        } catch (error) {
            console.error('냉장고 이름 가져오기 오류:', error);
        }
    };

    useEffect(() => {
        fetchIngredients();
        fetchFridgeName();
    }, [fridgeId]);

    return (
        <View style={styles.container}>
            {/* 헤더 영역 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>{fridgeName}</Text>
                <View style={{ width: 24 }} /> {/* 오른쪽 공간 확보 */}
            </View>
    
            {/* 재료 관리 영역 */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {categories.map((category, index) => (
                    <View key={index} style={styles.categoryContainer}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.categoryTitle}>{category.title}</Text>
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
        </View>
    );    
};

export default IngredientManagement;
