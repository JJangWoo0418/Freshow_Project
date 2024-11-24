import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './components/css/recipepagestyle';
import OpenAI from "openai";
import { OPENAI_API_KEY } from './components/apikey'; // API 키 가져오기

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,  // 브라우저 환경에서 사용 허용
    organization: "org-CfP6ktdew70Z93iYGcQFwgVf",
    project: "proj_Xbs47CHaP3DioAdxXxrI91f0",
});

const RecipePage = () => {
    const router = useRouter();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    // 재료 목록 (사용자가 보유한 재료를 기반으로 설정)
    const ingredients = ['김치', '돼지고기', '두부'];

    // 레시피 추천 요청 함수
    const fetchRecipes = async (retryCount = 0) => {
        setLoading(true);
        try {
            // GPT-4 API 호출하여 레시피 추천 받기
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant that suggests Korean dishes." },
                    { role: "user", content: `Using the following ingredients: ${ingredients.join(", ")}, suggest some Korean dishes that can be made.` }
                ],
                max_tokens: 100,
                temperature: 0.7,
            });

            // GPT-4 응답에서 레시피 추천 목록 추출
            const recommendedRecipes = completion.choices[0].message.content.trim().split('\n');

            // 각 레시피에 대해 DALL-E API 호출하여 이미지 생성
            const recipesWithImages = await Promise.all(recommendedRecipes.map(async (recipe, index) => {
                const imageGeneration = await openai.images.generate({
                    prompt: `${recipe} Korean dish, professional food photography`,
                    n: 1,
                    size: '1024x1024',
                });

                return {
                    id: index.toString(),
                    name: recipe,
                    image: imageGeneration.data[0].url,
                };
            }));

            setRecipes(recipesWithImages);
        } catch (error) {
            if (error.status === 429 && retryCount < 3) {
                // 429 오류 발생 시 일정 시간 후 재시도
                setTimeout(() => fetchRecipes(retryCount + 1), 3000);
            } else {
                console.error('Error fetching recipes:', error);
                alert('레시피를 불러오는 중 문제가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    const renderRecipeItem = ({ item }) => (
        <TouchableOpacity style={styles.recipeItem} onPress={() => router.push(`/recipeDetail?id=${item.id}`)}>
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
            <Image source={require('../assets/ArrowRightBtn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Image source={require('../assets/RecipeRecommendLogo.png')} style={styles.Logo} />

            <TouchableOpacity style={styles.fetchButton} onPress={fetchRecipes}>
                <Text style={styles.fetchButtonText}>레시피 추천받기</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#FF6347" />
            ) : (
                <FlatList
                    data={recipes}
                    renderItem={renderRecipeItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.recipeList}
                />
            )}

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Image source={require('../assets/BackBtn.png')} style={styles.backButtonIcon} />
            </TouchableOpacity>
        </View>
    );
};

export default RecipePage;
