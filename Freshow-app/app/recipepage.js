import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from './firebaseconfig'; // Firestore 인스턴스 가져오기
import { collection, getDocs } from 'firebase/firestore';
import styles from './components/css/recipepagestyle';
import OpenAI from "openai";
import { OPENAI_API_KEY } from './components/apikey';
import { useLocalSearchParams } from 'expo-router';

// OpenAI 설정
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    organization: "org-CfP6ktdew70Z93iYGcQFwgVf",
    project: "proj_Xbs47CHaP3DioAdxXxrI91f0",
});

const RecipePage = () => {
    const router = useRouter();
    const { userId, fridgeId } = useLocalSearchParams(); // userId와 fridgeId를 URL 파라미터로 받아오기
    const [recipes, setRecipes] = useState([]); // 추천된 레시피 목록
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [fetching, setFetching] = useState(false); // 중복 요청 방지 상태
    const [ingredients, setIngredients] = useState([]); // Firebase에서 가져온 재료 목록

    // 오늘 날짜 계산 (yyyyMMdd 형식)
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = (today.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작
        const dd = today.getDate().toString().padStart(2, '0');
        return `${yyyy}${mm}${dd}`;
    };

    // 재료 데이터 Firebase에서 가져오기
    const fetchIngredients = async () => {
        try {
            console.log("fetchIngredients 호출됨");

            // '재료' 컬렉션에서 모든 카테고리 문서 가져오기
            const ingredientsRef = collection(db, '계정', userId, '냉장고', fridgeId, '재료');

            // 모든 카테고리 문서 가져오기
            const snapshot = await getDocs(ingredientsRef);
            const validIngredients = [];
            const todayDate = getTodayDate(); // 오늘 날짜 계산 (yyyyMMdd 형식)

            // 각 카테고리에서 유효한 재료만 추출
            snapshot.forEach(docSnapshot => {
                const categoryData = docSnapshot.data();
                
                // 카테고리 내의 각 재료를 확인 (삼겹살, 소고기 등)
                for (let ingredient in categoryData) {
                    const ingredientData = categoryData[ingredient]; // 예: 삼겹살(Map 형식)
                    const expiryDate = ingredientData['유통기한']; // 유통기한(yyyyMMdd 형식)
                    
                    // 유통기한이 존재하고, 유통기한이 오늘 날짜 이상인 경우만 유효한 재료로 추가
                    if (expiryDate && expiryDate >= todayDate) {
                        validIngredients.push(ingredient); // 유통기한이 지나지 않은 재료만 추가
                    }
                }
            });

            // 유효한 재료가 있을 경우 레시피 추천 요청
            if (validIngredients.length > 0) {
                console.log('유효한 냉장고 재료:', validIngredients); // 유효한 재료 출력
                Alert.alert('냉장고 속 재료로 레시피 검색. . .', `포함된 재료 : ${validIngredients.join(', ')}`); // 알림 표시

                // 유효한 재료를 바탕으로 레시피 추천 받기
                fetchRecipes(validIngredients);
            } else {
                Alert.alert('오류', '유효한 재료가 없습니다. 냉장고를 확인해주세요.');
            }

        } catch (error) {
            console.error('재료 가져오기 오류:', error);
            Alert.alert('오류', '냉장고 재료를 가져오는 중 문제가 발생했습니다.');
        }
    };

    // 레시피 데이터 가져오기
    const fetchRecipes = async (ingredients, retryCount = 0) => {
        if (fetching) return; // 중복 호출 방지
        setFetching(true);
        setLoading(true);

        try {
            // GPT-3.5 모델을 통해 추천 레시피 요청
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant that suggests dishes." },
                    {
                        role: "user",
                        content: `Using the following ingredients: ${ingredients.join(", ")}, recommend three dishes that can be made using only these ingredients. Provide titles only in Korean.`,
                    },
                ],
                max_tokens: 100,
                temperature: 1,
            });

            // 추천된 레시피 데이터 추출
            const recommendedRecipes = completion.choices[0].message.content
                .trim()
                .split('\n')
                .filter(recipe => recipe); // 빈 줄 제거

            // 각 레시피에 대해 이미지 생성 요청
            const recipesWithImages = await Promise.all(
                recommendedRecipes.map(async (recipe, index) => {
                    try {
                        const imageGeneration = await openai.images.generate({
                            model: "dall-e-3",
                            prompt: `${recipe} dish, professional food image`,
                            n: 1,
                            size: '1024x1024',
                        });
                        return {
                            id: index.toString(),
                            name: recipe,
                            image: imageGeneration.data[0].url,
                        };
                    } catch (error) {
                        console.error(`Image generation failed for "${recipe}":`, error);
                        return {
                            id: index.toString(),
                            name: recipe,
                            image: 'https://via.placeholder.com/1024', // 기본 이미지
                        };
                    }
                })
            );

            setRecipes(recipesWithImages); // 상태 업데이트
        } catch (error) {
            // 429 Too Many Requests 처리 및 재시도 로직
            if (error.status === 429 && retryCount < 3) {
                console.log('429 Too Many Requests. Retrying...');
                setTimeout(() => fetchRecipes(ingredients, retryCount + 1), 3000); // 3초 후 재시도
            } else {
                console.error('Error fetching recipes:', error);
                Alert.alert('오류', '레시피를 가져오는 중 문제가 발생했습니다.');
            }
        } finally {
            setLoading(false);
            setFetching(false);
        }
    };

    // 레시피 항목 렌더링
    const renderRecipeItem = ({ item }) => (
        <TouchableOpacity
            style={styles.recipeItem}
            onPress={() => {
                console.log("Navigating to recipemakepage.js with:", {
                    id: item.id,
                    name: item.name,
                    image: item.image || 'https://via.placeholder.com/1024',
                    fridgeId: fridgeId,
                }); // 로그 추가
    
                router.push({
                    pathname: '/recipemakepage',
                    params: {
                        id: item.id,
                        name: item.name,
                        image: item.image || 'https://via.placeholder.com/1024',
                        fridgeId: fridgeId, // fridgeId 전달
                    },
                });
            }}
        >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
            <Image source={require('../assets/ArrowRightBtn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
    );
    

    // 페이지가 처음 렌더링될 때 fetchIngredients 함수 실행
    useEffect(() => {
        if (userId && fridgeId) {
            console.log("Fetching ingredients with:", { userId, fridgeId }); // 로그 추가
            fetchIngredients();
        } else {
            Alert.alert('오류', '사용자 ID와 냉장고 ID를 확인해주세요.');
        }
    }, [userId, fridgeId]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Image source={require('../assets/RecipeRecommendLogo.png')} style={styles.Logo} />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <Image source={require('../assets/tom-and-jerry-searching.gif')} style={styles.loadingImage} />
                    <Image source={require('../assets/RecipeWaitText.png')} style={styles.loadingText} />
                </View>
            ) : recipes.length === 0 ? (
                <Image source={require('../assets/RecipeLogo.png')} style={styles.recipeLogo} />
            ) : (
                <FlatList
                    data={recipes}
                    renderItem={renderRecipeItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.recipeList}
                />
            )}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Image source={require('../assets/back.png')} style={styles.backButtonIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RecipePage;
