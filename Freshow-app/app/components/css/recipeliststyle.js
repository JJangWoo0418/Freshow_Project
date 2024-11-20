import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF4D4D',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
    listContainer: {
        flex: 1,
        padding: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
    },
    recipeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFCF2',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        elevation: 2,
    },
    recipeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    footer: {
        padding: 15,
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF4D4D',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    backIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default styles;