import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../app/firebase';
import styles from './components/css/recipeliststyle';

// API 정보
const API_KEY = "3f3ce51a86ec4d21ae46";
const API_URL = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/100`;

export default function Recipelist() {
    const router = useRouter();
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    // Firebase에서 재료 데이터 가져오기
    const fetchIngredients = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "유통기한"));
            const fetchedIngredients = querySnapshot.docs.flatMap(doc =>
                Object.keys(doc.data()).map(ingredient => ingredient.trim().toLowerCase()) // 데이터 정규화
            );
            setIngredients(fetchedIngredients);
            console.log("Fetched Ingredients:", fetchedIngredients);
        } catch (error) {
            console.error("재료 데이터 가져오기 실패:", error);
        }
    };

    // 공공 API에서 레시피 가져오기
    const fetchRecipes = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data?.COOKRCP01?.row) {
                const fetchedRecipes = data.COOKRCP01.row.map(recipe => ({
                    id: recipe.RCP_SEQ,
                    title: recipe.RCP_NM,
                    image: recipe.ATT_FILE_NO_MAIN,
                    ingredients: recipe.RCP_PARTS_DTLS
                        .split(",")
                        .map(ingredient => ingredient.trim().toLowerCase()), // 데이터 정규화
                }));
                setRecipes(fetchedRecipes);
                console.log("Fetched Recipes:", fetchedRecipes);
            }
        } catch (error) {
            console.error("레시피 데이터 가져오기 실패:", error);
        }
    };

    // 재료 기반 레시피 필터링
    useEffect(() => {
        if (recipes.length > 0 && ingredients.length > 0) {
            const filtered = recipes
                .map(recipe => {
                    const matchedIngredients = recipe.ingredients.filter(ingredient =>
                        ingredients.includes(ingredient)
                    );
                    console.log(`Recipe: ${recipe.title}, Matched:`, matchedIngredients); // 디버깅용 로그
                    return {
                        ...recipe,
                        matchedCount: matchedIngredients.length,
                    };
                })
                .filter(recipe => recipe.matchedCount > 0) // 교집합 없는 레시피 제외
                .sort((a, b) => b.matchedCount - a.matchedCount); // 교집합 많은 순으로 정렬
            setFilteredRecipes(filtered);
            console.log("Filtered Recipes:", filtered);
        }
    }, [recipes, ingredients]);

    // 초기 데이터 로드
    useEffect(() => {
        fetchIngredients();
        fetchRecipes();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>레시피 추천</Text>
                <Text style={styles.subtitle}>
                    현재 냉장고 안에 있는 재료로 요리할 수 있는 메뉴입니다.{'\n'}
                    레시피가 궁금한 요리를 선택해보세요!
                </Text>
            </View>

            <View style={styles.listContainer}>
                {filteredRecipes.length === 0 ? (
                    <Text style={styles.emptyText}>
                        현재 재료로 만들 수 있는 음식이 없어요!{'\n'}재료를 추가해주세요!
                    </Text>
                ) : (
                    <FlatList
                        data={filteredRecipes}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.recipeCard}
                                onPress={() =>
                                    router.push({
                                        pathname: '/recipedetail',
                                        params: { recipe: JSON.stringify(item) },
                                    })
                                }
                            >
                                <Image source={{ uri: item.image }} style={styles.recipeImage} />
                                <Text style={styles.recipeTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                )}
            </View>
        </View>
    );
}
