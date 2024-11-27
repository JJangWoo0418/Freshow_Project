import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
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
    const { id, name, image } = useLocalSearchParams(); // 라우팅 데이터 가져오기
    const [recipeSteps, setRecipeSteps] = useState([]); // 레시피 단계
    const [loading, setLoading] = useState(true); // 로딩 상태 관리

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
                        { role: "system", content: "You are a professional chef assistant who provides recipes in Korean." },
                        {
                            role: "user",
                            content: `Provide a step-by-step recipe for ${name} in Korean. Each step should be numbered and concise.`
                        },
                    ],
                    max_tokens: 300,
                    temperature: 0.7,
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
        <ScrollView style={styles.container}>
            {/* 헤더 영역 */}
            <View style={styles.header}>
                <Image source={{ uri: image }} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{name || "레시피"}</Text>
                <Text style={styles.recipeSubtitle}>건강하게 먹어보기</Text>
            </View>

            {/* 로딩 상태 */}
            {loading ? (
                <ActivityIndicator size="large" color="#FF6347" style={styles.loader} />
            ) : (
                <View style={styles.stepsContainer}>
                    {recipeSteps.map((step, index) => (
                        <View key={index} style={styles.step}>
                            <Text style={styles.stepNumber}>{index + 1}.</Text>
                            <Text style={styles.stepText}>{step}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* 하단 버튼 */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => router.back()}>
                    <Image source={require('../assets/BackBtn.png')} style={styles.footerIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => router.push('/')}>
                    <Image source={require('../assets/GoMainBtn.png')} style={styles.footerIcon} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default RecipeMakePage;
