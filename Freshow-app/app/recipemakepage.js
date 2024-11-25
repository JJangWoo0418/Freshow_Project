import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import styles from './components/css/recipemakepagestyle';

const RecipeDetailPage = () => {
    const router = useRouter();
    const { id, name } = useSearchParams(); // 전달된 id와 name 가져오기
    const [loading, setLoading] = useState(false);
    const [instructions, setInstructions] = useState([]);

    useEffect(() => {
        // 선택한 레시피의 자세한 정보를 가져오는 함수
        const fetchRecipeDetails = async () => {
            setLoading(true);
            try {
                // 예: OpenAI API를 사용해 요리 과정을 가져옴
                const response = await fetch(`https://example.com/recipes/${id}`);
                const data = await response.json();
                setInstructions(data.instructions); // 요리 과정 설정
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.recipeTitle}>{name}</Text> {/* 레시피 제목 */}
            <Image source={{ uri: `https://example.com/recipes/images/${id}.png` }} style={styles.recipeImage} /> {/* 레시피 이미지 */}

            {loading ? (
                <ActivityIndicator size="large" color="#FF6347" />
            ) : (
                <View style={styles.instructionsContainer}>
                    {instructions.map((step, index) => (
                        <Text key={index} style={styles.instructionText}>
                            {index + 1}. {step}
                        </Text>
                    ))}
                </View>
            )}

            {/* 돌아가기 버튼 */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>돌아가기</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default RecipeDetailPage;
