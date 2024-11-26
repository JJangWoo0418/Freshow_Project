import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6347',
        marginBottom: 10,
    },
    recipeImage: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    recipeTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    instructionsContainer: {
        width: '90%',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    stepContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    stepText: {
        fontSize: 16,
        lineHeight: 22,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 20,
    },
    backButton: {
        flex: 1,
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    homeButton: {
        flex: 1,
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 10,
        marginLeft: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;