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
        marginLeft: 18,
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
        borderRadius: 15,
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
        marginTop: 50,
        justifyContent: 'center',
    },
    backButtonIcon: {
        width: 100,
        height: 100,
        marginRight: 2,
        resizeMode: 'contain',
        marginBottom: 40,
        alignItems: 'center',
        marginLeft: 30,
    },
    backButtonText: {
        fontSize: 16,
        color: '#333333',
    },
    searchIcon: {
        width: 70,
        height: 70,
        marginLeft: 155,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    recipeLogo: {
        width: 300,
        height: 300,
        marginLeft: 33,
        marginTop: 40,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 3,
    },
    loadingContainer:{
        alignItems: 'center',
        marginRight: 30,
        marginTop: 30,
    },
    loadingImage: {
        width: 230,
        height: 230,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 35
    },
    loadingText:{
        width: 200,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 35,
        resizeMode: 'contain'
    },
});

export default styles;