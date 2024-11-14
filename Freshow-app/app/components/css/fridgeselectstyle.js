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
        marginBottom:0,
    },
    // headerTitle: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     color: '#3b5998',
    // },
    logo: {
        marginTop: 20,
        marginLeft: 0,
        resizeMode: 'contain',
        width: 1,
        height: 1,
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






    container: {
        flex: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#CDEEFF',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#CDEEFF',
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
        color: '#aaa',
    },
    fridgeImage: {
        width: '100%',
        height: 200,
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
});

export default styles;