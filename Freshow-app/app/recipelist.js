import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './components/css/recipeliststyle';

const API_KEY = "3f3ce51a86ec4d21ae46"; // 여기에 발급받은 API 키를 입력하세요.
const API_URL = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/100`;

export default function Recipelist() {
    const navigation = useNavigation();
    const route = useRoute();
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    // 냉장고 재료를 route에서 받아옵니다.
    const { ingredients } = route.params || { ingredients: [] };

    // API로부터 레시피 데이터를 가져옵니다.
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                if (data?.COOKRCP01?.row) {
                    const fetchedRecipes = data.COOKRCP01.row.map((recipe) => ({
                        id: recipe.RCP_SEQ,
                        title: recipe.RCP_NM,
                        image: recipe.ATT_FILE_NO_MAIN,
                        ingredients: recipe.RCP_PARTS_DTLS,
                    }));
                    setRecipes(fetchedRecipes);
                }
            } catch (error) {
                console.error("레시피 데이터 가져오기 실패:", error);
            }
        };

        fetchRecipes();
    }, []);

    // 냉장고 재료를 기준으로 레시피 필터링
    useEffect(() => {
        if (recipes.length > 0) {
            const filtered = recipes.filter((recipe) =>
                ingredients.some((ingredient) =>
                    recipe.ingredients.includes(ingredient)
                )
            );
            setFilteredRecipes(filtered);
        }
    }, [recipes, ingredients]);

    return (
        <View style={styles.container}>
            {/* 윗부분 */}
            <View style={styles.header}>
                <Text style={styles.title}>레시피 추천</Text>
                <Text style={styles.subtitle}>
                    현재 냉장고 안에 있는 재료로 요리할 수 있는 메뉴입니다.{'\n'}
                    레시피가 궁금한 요리를 선택해보세요!
                </Text>
            </View>

            {/* 리스트 영역 */}
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
                                onPress={() => navigation.navigate('Recipedetail', { recipe: item })}
                            >
                                <Image source={{ uri: item.image }} style={styles.recipeImage} />
                                <Text style={styles.recipeTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </View>

            {/* 아래부분 */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../assets/backbtn.png')} style={styles.backIcon} />
                    <Text style={styles.backButtonText}>돌아가기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
