import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
        color: 'white'
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
    backButtonImage: {
        width: 24,  // 적절한 크기로 설정
        height: 24,
        resizeMode: 'contain',
        marginTop: 10,
        marginBottom: 22
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
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
        borderRadius: 10,
    },
    placeholderText: {
        fontSize: 18,
        color: '#555',
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
        backgroundColor: '#F5F5F5',
    },
    saveButton: {
        backgroundColor: '#87CEEB',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default styles;
