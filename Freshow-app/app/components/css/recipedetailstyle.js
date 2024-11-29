import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e74c3c',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    stepCard: {
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 12,
    },
    stepNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    stepText: {
        fontSize: 14,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    backButton: {
        padding: 10,
        backgroundColor: '#e74c3c',
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
    },
    backButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    mainButton: {
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 8,
        flex: 1,
        marginLeft: 8,
    },
    mainButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
