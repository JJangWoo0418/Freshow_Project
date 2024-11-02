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
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#CDEEFF',
        marginBottom: 20,
        borderRadius: 8,
    },
    label: {
        fontSize: 16,
        color: '#3b5998',
        marginBottom: 5,
        fontWeight: 'bold',
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
        marginBottom: 10,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default styles;
