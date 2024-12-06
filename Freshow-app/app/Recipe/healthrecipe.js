import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import OpenAI from "openai";
import { OPENAI_API_KEY } from '../components/apikey';
import styles from '../components/css/Recipe/healthrecipestyle';

// OpenAI 설정
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const HealthRecipe = () => {
    const router = useRouter();
    const { name, fridgeId} = useLocalSearchParams(); // 선택된 요리 이름 가져오기
    console.log('Received fridgeId in HealthRecipe:', fridgeId); // 로그로 확인
    const [tips, setTips] = useState([]); // GPT로부터 받은 건강한 요리 방법
    const [loading, setLoading] = useState(true); // 로딩 상태 관리

    // GPT API 호출하여 건강한 요리 방법 가져오기
    const fetchHealthTips = async () => {
        setLoading(true);
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional chef assistant. Provide healthy tips in Korean on how to cook or modify dishes for better health.",
                    },
                    {
                        role: "user",
                        content: `Provide 4 healthy cooking tips for the dish "${name}" in Korean. Each tip should be about one sentence and should not be numbered. `,
                    },
                ],
                max_tokens: 500,
                temperature: 0.7,
            });

            // GPT 응답 처리
            const response = completion.choices[0].message.content
                .trim()
                .split('\n') // 줄바꿈 기준으로 나누기
                .filter(tip => tip); // 빈 줄 제거

            setTips(response); // 상태 업데이트
        } catch (error) {
            console.error("Error fetching health tips:", error);
            alert("건강한 요리 방법을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };

    useEffect(() => {
        fetchHealthTips(); // 컴포넌트 로드 시 데이터 가져오기
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Image source={require('../../assets/HealthEatLogo.png')} style={styles.healtheatlogo} />

            {loading ? (
                <ActivityIndicator size="large" color="#FF6347" style={styles.loader} />
            ) : (
                <ScrollView style={{marginBottom:50}}contentContainerStyle={styles.cardContainer}>
                    {tips.map((tip, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardNumber}>📌</Text>
                            <Text style={styles.cardText}>{tip}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}

            {/* 하단 버튼 영역 */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => router.back()}>
                    <Image source={require('../../assets/back.png')} style={styles.footerIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() =>
                        router.push({
                            pathname: 'Main/mainpage',
                            params: { fridgeId }, // fridgeId를 함께 전달
                        })
                    }
                >
                    <Image source={require('../../assets/GoMainBtn.png')} style={styles.footerIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HealthRecipe;
