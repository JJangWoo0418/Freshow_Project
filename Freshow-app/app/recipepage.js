import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './components/css/recipepagestyle';

const recipes = [
    {
        id: '1',
        name: '김치찌개',
        // image: require('../assets/kimchi_stew.jpg'),
    },
    {
        id: '2',
        name: '김치찜',
        // image: require('../assets/kimchi_jjim.jpg'),
    },
    {
        id: '3',
        name: '삼겹김치볶음밥',
        // image: require('../assets/kimchi_fried_rice.jpg'),
    },
    {
        id: '4',
        name: '삼겹살 구이',
        // image: require('../assets/grilled_pork.jpg'),
    },
];

const RecipePage = () => {
    const router = useRouter();

    const renderRecipeItem = ({ item }) => (
        <TouchableOpacity style={styles.recipeItem} onPress={() => router.push(`/recipeDetail?id=${item.id}`)}>
            <Image source={item.image} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
            <Image source={require('../assets/ArrowRightBtn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Image source={require('../assets/RecipeRecommendLogo.png')} style={styles.Logo}/>

            <FlatList
                data={recipes}
                renderItem={renderRecipeItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.recipeList}
            />

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Image source={require('../assets/BackBtn.png')} style={styles.backButtonIcon} />
            </TouchableOpacity>
        </View>
    );
};

export default RecipePage;
