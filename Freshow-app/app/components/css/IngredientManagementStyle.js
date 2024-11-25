import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    categoryContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f0f8ff',
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 1,
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'ONE-Mobile-POP', // Figma 폰트 적용
        color: '#333',
    },
    addButton: {
        fontSize: 24,
        color: '#007AFF',
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 1,
    },
    ingredientImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    ingredientDetails: {
        flex: 1,
    },
    ingredientName: {
        fontSize: 16,
        fontFamily: 'ONE-Mobile-POP', // Figma 폰트 적용
        color: '#555',
        marginBottom: 5,
    },
    progressBarContainer: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 5,
    },
    percentageText: {
        fontSize: 14,
        fontFamily: 'ONE-Mobile-POP', // Figma 폰트 적용
        color: '#555',
    },
});

export default styles;
