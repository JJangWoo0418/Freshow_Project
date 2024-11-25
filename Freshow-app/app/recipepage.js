import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './components/css/recipepagestyle';
import OpenAI from "openai";
import { OPENAI_API_KEY } from './components/apikey';

// OpenAI 클라이언트 설정
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    organization: "org-CfP6ktdew70Z93iYGcQFwgVf",
    project: "proj_Xbs47CHaP3DioAdxXxrI91f0",
});

// RecipePage 컴포넌트 정의
const RecipePage = () => {
    const router = useRouter(); // 페이지 이동을 위한 라우터 가져오기
    const [recipes, setRecipes] = useState([]); // 레시피 데이터를 저장하는 상태 변수
    const [loading, setLoading] = useState(false); // 로딩 상태 관리

    // 사용자가 가진 재료 목록 (여기서는 예시로 사용)
    const ingredients = ['계란', '밥', '치즈', '면' , '마늘' , '토마토' , '김치', '돼지고기', '양파', '소고기', '김', '된장', '당근', '소시지', '고추장', '참기름', '가래떡'];

    // OpenAI API를 호출하여 레시피를 가져오는 함수
    const fetchRecipes = async (retryCount = 0) => {
        setLoading(true); // 로딩 상태를 true로 설정
        try {
            // GPT-3.5-turbo API 호출: 재료를 입력받아 요리 추천
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo", // 사용 모델
                messages: [
                    { role: "system", content: "You are a helpful assistant that suggests dishes." }, // 시스템 역할 정의
                    { role: "user", content: `Using the following ingredients: ${ingredients.join(", ")}, Recommend three dishes that can be made using only these ingredients, with the titles only, and respond in Korean.` } // 사용자 요청 메시지
                ],
                max_tokens: 100, // 응답 최대 토큰 수
                temperature: 0.7, // 출력의 다양성을 조절하는 값
            });

            // GPT-4 응답에서 레시피 목록 추출
            const recommendedRecipes = completion.choices[0].message.content
                .trim() // 공백 제거
                .split('\n') // 줄바꿈을 기준으로 레시피를 나눔
                .filter(recipe => recipe); // 빈 값 제거

            // 각 레시피에 대해 DALL-E 3 API로 이미지 생성 요청
            const recipesWithImages = [];
            for (let i = 0; i < recommendedRecipes.length; i++) {
                try {
                    // 요청 간격을 두기 위해 2초 대기
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    // DALL-E 3 API로 이미지 생성
                    const imageGeneration = await openai.images.generate({
                        model: "dall-e-3", // DALL-E 3 모델 사용
                        prompt: `${recommendedRecipes[i]} dish, professional food image`, // 이미지 생성 설명
                        n: 1, // 생성할 이미지 개수
                        size: '1024x1024', // 이미지 크기
                    });

                    // 레시피 이름과 생성된 이미지 URL 저장
                    recipesWithImages.push({
                        id: i.toString(), // 고유 ID
                        name: recommendedRecipes[i], // 레시피 이름
                        image: imageGeneration.data[0].url, // 이미지 URL
                    });
                } catch (error) {
                    console.error(`Error generating image for recipe "${recommendedRecipes[i]}":`, error);
                    // 이미지 생성 실패 시 기본 이미지 사용
                    recipesWithImages.push({
                        id: i.toString(),
                        name: recommendedRecipes[i],
                        image: 'https://via.placeholder.com/1024', // 기본 이미지 URL
                    });
                }
            }

            setRecipes(recipesWithImages); // 상태에 레시피 데이터 설정
        } catch (error) {
            // 429 오류(요청 초과)가 발생하면 재시도
            if (error.status === 429 && retryCount < 3) {
                console.log('429 Too Many Requests. Retrying...');
                setTimeout(() => fetchRecipes(retryCount + 1), 3000); // 3초 후 재시도
            } else {
                console.error('Error fetching recipes:', error); // 기타 오류 처리
                alert('레시피를 불러오는 중 문제가 발생했습니다.');
            }
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };

    // 레시피 항목 렌더링 함수
    const renderRecipeItem = ({ item }) => (
        <TouchableOpacity style={styles.recipeItem} onPress={() => router.push(`/recipeDetail?id=${item.id}`)}> {/* 상세 페이지로 이동 */}
            <Image source={{ uri: item.image }} style={styles.recipeImage} /> {/* 레시피 이미지 */}
            <Text style={styles.recipeName}>{item.name}</Text> {/* 레시피 이름 */}
            <Image source={require('../assets/ArrowRightBtn.png')} style={styles.arrowIcon} /> {/* 화살표 아이콘 */}
        </TouchableOpacity>
    );

    // 메인 UI 구성
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" /> {/* 상태 표시줄 스타일 */}
            <Image source={require('../assets/RecipeRecommendLogo.png')} style={styles.Logo} /> {/* 로고 이미지 */}

            <TouchableOpacity style={styles.fetchButton} onPress={fetchRecipes}> {/* 버튼을 누르면 레시피를 가져옴 */}
                <Image source={require('../assets/FoodSearchBtn.png')} style={styles.searchIcon} />
            </TouchableOpacity>

            {/* 로딩 상태 표시 */}
            {loading ? (
                <ActivityIndicator size="large" color="#FF6347" /> 
            ) : (
                <FlatList
                    data={recipes} // 레시피 데이터
                    renderItem={renderRecipeItem} // 개별 아이템 렌더링
                    keyExtractor={(item) => item.id} // 리스트의 고유 키
                    contentContainerStyle={styles.recipeList} // 스타일 적용
                />
            )}

            {/* 뒤로가기 버튼 */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Image source={require('../assets/BackBtn.png')} style={styles.backButtonIcon} />
            </TouchableOpacity>
        </View>
    );
};

export default RecipePage;
