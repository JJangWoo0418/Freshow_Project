import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from './components/css/recipedetailstyle';

const RecipeDetail = () => {
    const router = useRouter();
    const { recipe } = useLocalSearchParams();
    const recipeData = JSON.parse(recipe);

    const steps = [
        recipeData.MANUAL01,
        recipeData.MANUAL02,
        recipeData.MANUAL03,
        recipeData.MANUAL04,
        recipeData.MANUAL05,
        recipeData.MANUAL06,
    ].filter(Boolean); // 빈 값 제거

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{recipeData.RCP_NM}</Text>
            <Image source={{ uri: recipeData.ATT_FILE_NO_MAIN }} style={styles.image} />
            <Text style={styles.subtitle}>{recipeData.RCP_PAT2}</Text>
            <FlatList
                data={steps}
                keyExtractor={(item, index) => `step-${index}`}
                renderItem={({ item, index }) => (
                    <View style={styles.stepCard}>
                        <Text style={styles.stepNumber}>{index + 1}.</Text>
                        <Text style={styles.stepText}>{item}</Text>
                    </View>
                )}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>돌아가기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/home')}>
                    <Text style={styles.mainButtonText}>메인으로</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RecipeDetail;