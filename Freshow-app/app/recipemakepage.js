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
    const { id, name, image } = useLocalSearchParams(); // 매개변수 가져오기
    const [recipeSteps, setRecipeSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // GPT API 호출하여 레시피 단계 가져오기
        const fetchRecipeDetails = async () => {
            setLoading(true);
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a professional chef assistant." },
                        {
                            role: "user",
                            content: `Give me a step-by-step recipe in Korean for making ${name}. Each step should be concise and numbered.`
                        }
                    ],
                    max_tokens: 300,
                    temperature: 0.7,
                });

                // GPT 응답을 받아 단계별 레시피로 분리
                const steps = completion.choices[0].message.content
                    .trim()
                    .split('\n')
                    .filter(step => step); // 빈 값 제거
                setRecipeSteps(steps);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
                alert("레시피를 불러오는 중 문제가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [name]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: image }} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{name}</Text>
                <Text style={styles.recipeSubtitle}>건강하게 먹어보기</Text>
            </View>

            {/* 로딩 표시 */}
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
                    <Text style={styles.footerText}>돌아가기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => router.push('/')}>
                    <Image source={require('../assets/GoMainBtn.png')} style={styles.footerIcon} />
                    <Text style={styles.footerText}>메인으로</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default RecipeMakePage;
