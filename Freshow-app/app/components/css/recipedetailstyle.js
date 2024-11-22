import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFF',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    recipeImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6347',
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 16,
        color: '#555',
    },
    stepsContainer: {
        marginVertical: 20,
    },
    stepCard: {
        backgroundColor: '#F9F9F9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderColor: '#DDD',
        borderWidth: 1,
    },
    stepNumber: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    stepText: {
        fontSize: 16,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#EEE',
        borderRadius: 8,
    },
    backIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    backButtonText: {
        fontSize: 16,
        color: '#555',
    },
    homeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#EEE',
        borderRadius: 8,
    },
    homeIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    homeButtonText: {
        fontSize: 16,
        color: '#555',
    },
    errorText: {
        fontSize: 18,
        color: '#FF0000',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default styles;
