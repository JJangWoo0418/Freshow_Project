import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
    },
    backButtonImage: {
        width: 24,  // 적절한 크기로 설정
        height: 24,
        resizeMode: 'contain',
        marginTop: 22
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        borderRadius: 4,
        marginBottom: 16,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#F44336',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
