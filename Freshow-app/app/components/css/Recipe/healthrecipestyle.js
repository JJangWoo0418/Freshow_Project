import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6347',
        textAlign: 'center',
        marginBottom: 10,
    },
    healtheatlogo: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginLeft: 30,
        marginTop: 50,
    },
    loader: {
        marginTop: 50,
    },
    cardContainer: {
        paddingBottom: 30,
        paddingTop: 20,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    cardNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF6347',
        marginBottom: 10,
        marginLeft: 130,
    },
    cardText: {
        fontSize: 16,
        color: '#555',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 30,
        borderTopWidth: 0,
        borderTopColor: '#E4E4E4',
        marginTop: 50,
        marginLeft: 20,
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
    },
    footerIcon: {
        width: 50,
        height: 50,
    },
});

export default styles;
