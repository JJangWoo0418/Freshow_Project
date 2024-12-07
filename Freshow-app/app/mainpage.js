import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert,
    StatusBar
} from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './components/css/mainpagestyle';

import { auth, db } from '../app/firebaseconfig';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    serverTimestamp,
} from 'firebase/firestore';

export default function MainPage() {
    const { fridgeId } = useLocalSearchParams(); // fridgeId를 받아옵니다
    const router = useRouter(); // 화면 이동을 위한 router 추가
    const [memo, setMemo] = useState('');
    const [title, setTitle] = useState('');
    const [memos, setMemos] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [fridgeName, setFridgeName] = useState('냉장고 이름');

    // Firestore에서 냉장고 이름 가져오기
    const fetchFridgeName = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser || !fridgeId) return;

        try {
            const fridgeDocRef = doc(db, '계정', currentUser.uid, '냉장고', fridgeId);
            const fridgeDoc = await getDoc(fridgeDocRef);

            if (fridgeDoc.exists()) {
                setFridgeName(fridgeDoc.data().name || '냉장고 이름');
            }
        } catch (error) {
            console.error('냉장고 이름 가져오기 오류:', error);
        }
    };

    // Firestore에서 메모 가져오기
    const fetchMemos = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser || !fridgeId) {
            Alert.alert('로그인 필요', '메모를 불러오려면 로그인이 필요합니다.');
            return;
        }

        try {
            const memosCollection = collection(
                db,
                '계정',
                currentUser.uid,
                '냉장고',
                fridgeId,
                '메모'
            );
            const querySnapshot = await getDocs(memosCollection);
            const fetchedMemos = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMemos(fetchedMemos);
        } catch (error) {
            console.error('메모 데이터 가져오기 오류:', error);
        }
    };

    // Firestore에서 재료 데이터 가져오기
    const fetchIngredients = async () => {
        const currentUser = auth.currentUser;
    
        if (!currentUser || !fridgeId) {
            Alert.alert('로그인 필요', '재료 데이터를 불러오려면 로그인이 필요합니다.');
            return;
        }
    
        try {
            const ingredientsCollection = collection(
                db,
                '계정',
                currentUser.uid,
                '냉장고',
                fridgeId,
                '재료'
            );
            const querySnapshot = await getDocs(ingredientsCollection);
    
            const fetchedIngredients = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return Object.keys(data).map((key) => ({
                    name: key, // 음식 이름 (문서 필드 이름)
                    image: data[key]["사진"] ? { uri: data[key]["사진"] } : require('../assets/삼겹살.jpg'), // 이미지
                    expiryDate: data[key]["유통기한"] || "유통기한 없음", // 유통기한
                    expiryPercentage: calculateExpiryPercentage(data[key]["유통기한"]), // 유통기한 퍼센트 계산
                    remaining: data[key]["남은 수량"] || 0, // 남은 수량
                    memo: data[key]["메모"] || "메모 없음", // 메모
                    type: data[key]["물건 종류"] || "알 수 없음", // 물건 종류
                }));
            }).flat();
    
            setIngredients(
                fetchedIngredients.sort((a, b) => a.expiryPercentage - b.expiryPercentage)
            );
        } catch (error) {
            console.error('재료 데이터 가져오기 오류:', error);
        }
    };
    

    useEffect(() => {
        fetchFridgeName();
        fetchMemos();
        fetchIngredients();
    }, [fridgeId]);

    // 유통기한을 퍼센트로 계산하는 함수
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

    // 메모 저장 함수
    const handleMemoSave = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser || !fridgeId) {
            Alert.alert('로그인 필요', '메모를 저장하려면 로그인이 필요합니다.');
            return;
        }

        if (memo.trim() && title.trim()) {
            try {
                const memosCollection = collection(
                    db,
                    '계정',
                    currentUser.uid,
                    '냉장고',
                    fridgeId,
                    '메모'
                );
                await addDoc(memosCollection, {
                    title: title.trim(),
                    content: memo.trim(),
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
                setTitle('');
                setMemo('');
                fetchMemos();
                setShowPopup(true); // 메모 저장 후 팝업 표시
                setTimeout(() => setShowPopup(false), 2000); // 2초 후 팝업 숨기기
            } catch (error) {
                console.error('메모 저장 오류:', error);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.header}>
                <Link href="/fridgeselect" style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Link>
                <Text style={styles.title}>{fridgeName}</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.topIcons}>
            <Link href = {{ pathname: "/test",  // 원하는 페이지 경로
                    params: { userId: auth.currentUser?.uid, fridgeId: fridgeId },  // userId와 fridgeId 전달
                }}
                style={styles.iconWrapper}
            >
                <Image source={require('../assets/RecipeSuggestBtn.png')} style={styles.icon} />
            </Link>
            
                <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push({
                    pathname: "/add_object",
                    params: {fridgeId}, // fridgeId 전달
                })}>
                    <Image source={require('../assets/AddIngredientBtn.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* 메모 영역 */}
            <Image source={require('../assets/MemoText.png')} style={styles.memotext} />
            {/* 메모 및 제목, 햄버거 버튼 영역 */}
            <View style={styles.memoSection}>
                <View style={styles.memoHeader}>
                    <TextInput
                        style={[styles.titleInput]}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="메모 제목..."
                        onBlur={handleMemoSave}
                    />
                    <Link href={`/MemoList?fridgeId=${fridgeId}`} style={styles.menuIcon}>
                        <Ionicons name="menu" size={24} color="black" />
                    </Link>
                </View>
                <TextInput
                    style={styles.memoInput}
                    value={memo}
                    onChangeText={setMemo}
                    placeholder="메모 내용을 입력하세요..."
                    placeholderTextColor={'gray'}
                    multiline
                    onBlur={handleMemoSave}
                />
            </View>

            {/* 메모 저장 알림 팝업 */}
            {showPopup && (
                <Modal
                    transparent={true}
                    visible={showPopup}
                    animationType="fade"
                    onRequestClose={() => setShowPopup(false)}
                >
                    <View style={styles.popupContainer}>
                        <View style={styles.popupContent}>
                            <Text style={styles.popupText}>메모가 저장되었습니다!</Text>
                            <TouchableOpacity
                                onPress={() => setShowPopup(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {/* 재료 관리 버튼 */}
            <TouchableOpacity
                style={styles.ingredientSection}
                onPress={() => router.push(`/IngredientManagement?fridgeId=${fridgeId}`)}
            >
                <Text style={styles.sectionTitle}>재료관리</Text>
                {ingredients.slice(0, 4).map((ingredient, index) => ( // 처음 4개만 표시
                    <View key={index} style={styles.ingredientItem}>
                        {/* 음식 이미지 */}
                        <View>
                            <Image source={ingredient.image} style={styles.ingredientImage} />
                            
                            {/* 음식 이름 */}
                            <Text style={styles.ingredientName}>{ingredient.name}</Text>
                        </View>

                        {/* 유통기한 퍼센트 표시 */}
                        <View style={styles.progressWrapper}>
                            <View
                                style={{
                                    ...styles.progress,
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

                        {/* 퍼센트 텍스트 */}
                        <Text style={styles.expirypercentage}>{ingredient.expiryPercentage}%</Text>
                    </View>
                ))}
            </TouchableOpacity>
        </ScrollView>
    );
}
