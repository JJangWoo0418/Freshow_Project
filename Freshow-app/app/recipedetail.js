import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from './components/css/recipedetailstyle';

export default function Recipedetail() {
    const router = useRouter();
    const { recipe } = useLocalSearchParams();
    const [recipeSteps, setRecipeSteps] = useState([]);
    const recipeData = recipe ? JSON.parse(recipe) : null;

    useEffect(() => {
        // 레시피 단계 API 호출 (필요시 구현)
        if (recipeData) {
            setRecipeSteps([
                "김치와 돼지고기를 볶는다.",
                "양념을 넣고 끓인다.",
                "재료를 섞는다.",
                "마무리로 간을 맞춘다.",
            ]); // 실제 API 호출로 대체 가능
        }
    }, [recipeData]);

    if (!recipeData) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>레시피 데이터를 로드할 수 없습니다.</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>돌아가기</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: recipeData.image }} style={styles.recipeImage} />
                <Text style={styles.title}>{recipeData.title}</Text>
                <Text style={styles.subTitle}>냉장고 재료로 만든 요리</Text>
            </View>

            <View style={styles.stepsContainer}>
                {recipeSteps.map((step, index) => (
                    <View key={index} style={styles.stepCard}>
                        <Text style={styles.stepNumber}>{index + 1}.</Text>
                        <Text style={styles.stepText}>{step}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>돌아가기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
