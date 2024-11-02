import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3b5998',
    },
    addButton: {
        backgroundColor: '#CDEEFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    addButtonText: {
        fontSize: 24,
        color: '#000',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888888',
        textAlign: 'center',
    },
    fridgeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#CDEEFF',
        borderRadius: 8,
        marginBottom: 16,
    },
    fridgeImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    fridgeInfo: {
        flex: 1,
    },
    fridgeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    fridgeDescription: {
        fontSize: 14,
        color: '#666666',
    },
    settingsButton: {
        padding: 5,
    },
    settingsButtonText: {
        fontSize: 18,
        color: '#000',
    },
});

export default styles;
