import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
    },
    backButtonText: {
        fontSize: 24,
        color: '#3b5998',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3b5998',
        marginBottom: 20,
        textAlign: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#CDEEFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    input: {
        height: 50,
        borderColor: '#CDEEFF',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: '#CDEEFF',
    },
    saveButton: {
        backgroundColor: '#CDEEFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default styles;
