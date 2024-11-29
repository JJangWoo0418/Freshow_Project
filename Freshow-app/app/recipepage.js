import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from './firebaseconfig'; // Firestore 인스턴스 가져오기
import { doc, getDoc } from 'firebase/firestore';
import styles from './components/css/recipepagestyle';
import OpenAI from "openai";
import { OPENAI_API_KEY } from './components/apikey';

// OpenAI 설정
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    organization: "org-CfP6ktdew70Z93iYGcQFwgVf",
    project: "proj_Xbs47CHaP3DioAdxXxrI91f0",
});

const RecipePage = () => {
    const router = useRouter();
    const [recipes, setRecipes] = useState([]); // 추천된 레시피 목록
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [fetching, setFetching] = useState(false); // 중복 요청 방지 상태
    const [ingredients, setIngredients] = useState([]); // Firebase에서 가져온 재료 목록

    // 재료 데이터 Firebase에서 가져오기
    const fetchIngredients = async () => {
        try {
            const userId = "qA1vecXHMyX7wqfRY53UuWa2NvB2"; // 현재 사용자 ID (예시)
            const refrigeratorId = "u7mCQptga2njYSCBgkho"; // 냉장고 ID (예시)

            // 채소, 육류 카테고리 데이터 가져오기 (각각의 문서로 접근)
            const vegetablesRef = doc(db, '계정', userId, '냉장고', refrigeratorId, '재료', '채소');
            const meatsRef = doc(db, '계정', userId, '냉장고', refrigeratorId, '재료', '육류');

            // 데이터 가져오기
            const vegetablesSnapshot = await getDoc(vegetablesRef);
            const meatsSnapshot = await getDoc(meatsRef);

            // 각 카테고리에서 재료 목록 추출
            const vegetables = vegetablesSnapshot.exists() ? Object.keys(vegetablesSnapshot.data()) : [];
            const meats = meatsSnapshot.exists() ? Object.keys(meatsSnapshot.data()) : [];

            // 재료 합치기
            const allIngredients = [...vegetables, ...meats];

            setIngredients(allIngredients); // 재료 상태 업데이트
            console.log('냉장고의 재료:', allIngredients); // 콘솔에 알림 출력
            Alert.alert('냉장고 재료 가져오기', `냉장고에서 가져온 재료: ${allIngredients.join(', ')}`);

            // OpenAI에 재료를 전달하여 레시피 추천 받기
            fetchRecipes(allIngredients);

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
                        content: `Using the following ingredients: ${ingredients.join(
                            ", "
                        )}, recommend three dishes that can be made using only these ingredients. Provide titles only in Korean.`,
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
            onPress={() =>
                router.push({
                    pathname: '/recipemakepage',
                    params: {
                        id: item.id,
                        name: item.name,
                        image: item.image || 'https://via.placeholder.com/1024',
                    },
                })
            }
        >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
            <Image source={require('../assets/ArrowRightBtn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Image source={require('../assets/RecipeRecommendLogo.png')} style={styles.Logo} />

            <TouchableOpacity style={styles.fetchButton} onPress={fetchIngredients}>
                <Image source={require('../assets/FoodSearchBtn.png')} style={styles.searchIcon} />
            </TouchableOpacity>

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
                    <Image source={require('../assets/BackBtn.png')} style={styles.backButtonIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RecipePage;
