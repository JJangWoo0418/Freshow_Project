import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: 55,
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    recipeImage: {
        width: '70%',
        height: '60%',
        borderRadius: 10,
    },
    recipeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6347',
        marginTop: 30
    },
    stepsContainer: {
        marginTop: 3,
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
        width: 60,
        height: 60,
        marginRight: 5,
    },
    footerText: {
        fontSize: 16,
        color: '#333',
    },
    loader: {
        marginTop: 50,
    },
    stickBar: {
        width: 360,
        height: 6,
        alignItems: 'center',
        marginBottom: 20,
    }
});

export default styles;
