import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingBottom: 20, // 하단 여백 추가
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3b5998',
    },
    mascot: {
        width: 30,
        height: 30,
    },
    freshow: {
        width: 120,
        height: 40,
    },
    logo: {
        marginTop: 20,
        marginLeft: 0,
        resizeMode: 'contain',
        width: 1,
        height: 1,
    },
    addButton: {
        padding: 10,
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
        paddingTop: 50,
    },
    emptyText: {
        fontSize: 18,
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
        width: '100%',
        height: 200,
        borderRadius: 10,
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
    deleteButton: {
        backgroundColor: '#FFB3B3',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
    },
    editButton: {
        backgroundColor: '#B3D9FF',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
    },
    actionText: {
        color: '#fff',
        fontSize: 16,
    },
    infoText: {
        fontSize: 15,
        color: '#aaa',
        marginLeft: 50,
        marginTop: 10,
    },
});

export default styles;
