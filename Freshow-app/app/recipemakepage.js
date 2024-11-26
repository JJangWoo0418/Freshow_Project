import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import OpenAI from "openai";
import { OPENAI_API_KEY } from './components/apikey';
import styles from './components/css/recipemakepagestyle';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    organization: "org-CfP6ktdew70Z93iYGcQFwgVf",
    project: "proj_Xbs47CHaP3DioAdxXxrI91f0",
});

const RecipeMakePage = () => {
    const router = useRouter();
    const { id = '', name = '' } = router.query; // 기본값 설정
    const [instructions, setInstructions] = useState([]); // 요리 과정 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태 관리

    useEffect(() => {
        console.log('Router Query:', router.query); // 쿼리 디버깅

        const fetchRecipeInstructions = async () => {
            if (!name) return; // name이 없으면 중단
            console.log(`Fetching instructions for recipe: ${name}`);
            setLoading(true);
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful assistant that provides cooking instructions." },
                        { role: "user", content: `Provide a step-by-step cooking instruction for making ${name} in Korean.` },
                    ],
                    max_tokens: 500,
                    temperature: 0.7,
                });

                // GPT 응답에서 요리 과정 추출
                const instructionText = completion.choices[0].message.content.trim();
                const instructionsList = instructionText.split('\n').filter(step => step);
                setInstructions(instructionsList);
            } catch (error) {
                console.error('Error fetching instructions:', error);
                alert('요리 과정을 불러오는 중 문제가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeInstructions();
    }, [name]);

    // `id`와 `name`이 없는 경우 처리
    if (!id || !name) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>잘못된 요청입니다. 메인 화면으로 돌아가세요.</Text>
                <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
                    <Text style={styles.buttonText}>메인으로</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* 레시피 제목 */}
            <Text style={styles.headerTitle}>레시피</Text>

            {/* 요리 이미지 */}
            <Image
                source={{ uri: id ? `https://via.placeholder.com/1024?text=${name}` : 'https://via.placeholder.com/1024' }}
                style={styles.recipeImage}
            />

            {/* 요리 이름 */}
            <Text style={styles.recipeTitle}>{name}</Text>
            <Text style={styles.subtitle}>건강하게 먹어보기</Text>

            {/* 로딩 상태 표시 */}
            {loading ? (
                <ActivityIndicator size="large" color="#FF6347" />
            ) : (
                <View style={styles.instructionsContainer}>
                    {instructions.map((step, index) => (
                        <View key={index} style={styles.stepContainer}>
                            <Text style={styles.stepText}>{index + 1}. {step}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* 하단 버튼 */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>돌아가기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
                    <Text style={styles.buttonText}>메인으로</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default RecipeMakePage;
