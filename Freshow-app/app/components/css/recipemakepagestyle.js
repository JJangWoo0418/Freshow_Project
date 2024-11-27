import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    recipeImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    recipeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6347',
        marginVertical: 10,
    },
    recipeSubtitle: {
        fontSize: 16,
        color: '#888',
    },
    stepsContainer: {
        marginTop: 20,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    stepNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#FF6347',
    },
    stepText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerIcon: {
        width: 24,
        height: 24,
        marginRight: 5,
    },
    footerText: {
        fontSize: 16,
        color: '#333',
    },
    loader: {
        marginTop: 50,
    },
});

export default styles;
