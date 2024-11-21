import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6347',
        marginTop: 20,
        textAlign: 'center',
    },
    Logo: {
        alignItems: 'center',
        marginTop: 70,
        marginLeft: 13,
        resizeMode: 'contain'
    },
    recipeList: {
        marginVertical: 10,
    },
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
        marginBottom: 15,
        borderWidth: 3,
        borderColor: 'Black',
    },
    recipeImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    recipeName: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6347',
        fontFamily: 'ONE Mobile POP'
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center',
    },
    backButtonIcon: {
        width: 100,
        height: 100,
        marginRight: 10,
        resizeMode: 'contain',
        marginBottom: 55,
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 16,
        color: '#333333',
    },
});

export default styles;