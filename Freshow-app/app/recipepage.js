import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './components/css/recipepagestyle';
import OpenAI from "openai";
import { OPENAI_API_KEY } from './components/apikey';

// OpenAI 설정
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    organization: "org-CfP6ktdew70Z93iYGcQFwgVf",
    project: "proj_Xbs47CHaP3DioAdxXxrI91f0",
});

const RecipePage = () => {
    const router = useRouter();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const ingredients = ['계란', '밥', '치즈', '면', '마늘', '토마토', '김치', '돼지고기', '양파', '소고기', '김', '된장', '당근', '소시지', '고추장', '참기름', '가래떡'];

    const fetchRecipes = async (retryCount = 0) => {
        setLoading(true);
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant that suggests dishes." },
                    { role: "user", content: `Using the following ingredients: ${ingredients.join(", ")}, recommend three dishes that can be made using only these ingredients. Provide titles only in Korean.` }
                ],
                max_tokens: 100,
                temperature: 0.7,
            });

            const recommendedRecipes = completion.choices[0].message.content
                .trim()
                .split('\n')
                .filter(recipe => recipe);

            const recipesWithImages = await Promise.all(
                recommendedRecipes.map(async (recipe, index) => {
                    try {
                        const imageGeneration = await openai.images.generate({
                            model: "dall-e-3",
                            prompt: `${recipe} dish, professional food image`,
                            n: 1,
                            size: '1024x1024',
                        });
                        return {
                            id: index.toString(),
                            name: recipe,
                            image: imageGeneration.data[0].url,
                        };
                    } catch (error) {
                        console.error(`Image generation failed for "${recipe}":`, error);
                        return {
                            id: index.toString(),
                            name: recipe,
                            image: 'https://via.placeholder.com/1024',
                        };
                    }
                })
            );

            setRecipes(recipesWithImages);
        } catch (error) {
            if (error.status === 429 && retryCount < 3) {
                console.log('429 Too Many Requests. Retrying...');
                setTimeout(() => fetchRecipes(retryCount + 1), 3000);
            } else {
                console.error('Error fetching recipes:', error);
                Alert.alert('오류', '레시피를 가져오는 중 문제가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    const renderRecipeItem = ({ item }) => (
        <TouchableOpacity
            style={styles.recipeItem}
            onPress={() => router.push({
                pathname: '/recipemakepage',
                params: {
                    id: item.id,
                    name: item.name,
                    image: item.image,
                },
            })}
        >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
            <Image source={require('../assets/ArrowRightBtn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Image source={require('../assets/RecipeRecommendLogo.png')} style={styles.Logo} />

            <TouchableOpacity style={styles.fetchButton} onPress={fetchRecipes}>
                <Image source={require('../assets/FoodSearchBtn.png')} style={styles.searchIcon} />
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#FF6347" />
            ) : (
                <FlatList
                    data={recipes}
                    renderItem={renderRecipeItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.recipeList}
                />
            )}

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Image source={require('../assets/BackBtn.png')} style={styles.backButtonIcon} />
            </TouchableOpacity>
        </View>
    );
};

export default RecipePage;
