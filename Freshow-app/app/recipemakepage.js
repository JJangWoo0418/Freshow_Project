import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import OpenAI from "openai";
import { OPENAI_API_KEY } from './components/apikey';
import styles from './components/css/recipemakepagestyle';

// OpenAI 설정
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const RecipeMakePage = () => {
    const router = useRouter();
    const { id, name, image = 'https://via.placeholder.com/1024', fridgeId } = useLocalSearchParams();

    // 로그 추가: fridgeId 값 확인
    console.log("Received parameters in recipemakepage.js:", { id, name, fridgeId });
    const [recipeSteps, setRecipeSteps] = useState([]); // 레시피 단계
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [imageLoading, setImageLoading] = useState(true); // 이미지 로딩 상태

    useEffect(() => {
        // GPT API 호출하여 레시피 단계 가져오기
        const fetchRecipeDetails = async () => {
            if (!name) {
                alert("음식 이름 데이터가 없습니다.");
                return;
            }
            setLoading(true);
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a professional chef assistant who provides detailed recipes in Korean,I would like to use the '-' symbol to break each line. Each explanation should be about two sentence. Explain in at least 10 steps, Don't write the recipe title" },
                        {
                            role: "user",
                            content: `Provide a step-by-step recipe for ${name} in Korean. I would like to use the '-' symbol to break each line. Each explanation should be about two sentence. Explain in at least 10 steps, Don't write the recipe title `
                        },
                    ],
                    max_tokens: 800,
                    temperature: 0.5,
                });

                // GPT 응답 처리
                const steps = completion.choices[0].message.content
                    .trim()
                    .split('\n') // 줄바꿈 기준으로 단계 분리
                    .filter(step => step); // 빈 줄 제거
                setRecipeSteps(steps);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
                alert("레시피를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [name]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            {/* 헤더 영역 */}
            <View style={styles.header}>
                {imageLoading && (
                    <ActivityIndicator size="large" color="#FF6347" style={styles.imageLoader} />
                )}
                <Image
                    source={{ uri: image }}
                    style={styles.recipeImage}
                    onLoad={() => setImageLoading(false)} // 이미지 로딩 완료 시 상태 업데이트
                    onError={() => {
                        setImageLoading(false);
                        alert("이미지를 불러오는 중 오류가 발생했습니다.");
                    }}
                />
                <Text style={styles.recipeTitle}>{name || "레시피"} 레시피</Text>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() =>
                        router.push({
                            pathname: '/healthrecipe',
                            params: {
                                name,      // 요리 이름 전달
                                fridgeId,  // fridgeId 추가 전달
                            },
                        })
                    }
                >
                    <Image source={require('../assets/HealthEatBtn.png')} style={styles.healtheatbtn} />
                </TouchableOpacity>



                <Image source={require('../assets/Stick.png')} style={styles.stickBar} />
            </View>

            {/* 레시피 설명 영역 */}
            {loading ? (
                <ActivityIndicator size="large" color="#FF6347" style={styles.loader} />
            ) : (
                <ScrollView style={styles.stepsScroll} contentContainerStyle={styles.stepsContainer}>
                    {recipeSteps.map((step, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardNumber}>{index + 1}.</Text>
                            <Text style={styles.cardText}>{step}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}

            {/* 하단 버튼 영역 */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => router.back()}>
                    <Image source={require('../assets/AgainButton.png')} style={styles.footerIcon2} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() =>
                        router.push({
                            pathname: 'mainpage',
                            params: { fridgeId: fridgeId || '' }, // fridgeId가 없으면 빈 값 전달
                        })
                    }
                >
                    <Image source={require('../assets/GoMainBtn.png')} style={styles.footerIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RecipeMakePage;
