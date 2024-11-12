import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        paddingRight: 10,
    },
    title: {
        fontFamily: "ONE Mobile POP",
        fontSize: 32,
        color: '#CDEEFF',
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        flex: 1,
    },
    topIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    iconWrapper: {
        alignItems: 'center',
    },
    iconText: {
        fontFamily: "ONE Mobile POP",
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    icon: {
        width: 80,
        height: 80,
    },
    memoSection: {
        marginBottom: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#FFFCED',
        padding: 8,
    },
    memoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    memoDate: {
        fontFamily: "ONE Mobile POP",
        fontSize: 14,
        color: '#666',
    },
    menuIcon: {
        padding: 8,
    },
    memoInput: {
        width: '100%',
        height: 80,
        fontFamily: "ONE Mobile POP",
        color: '#999999',
        fontSize: 12,
        textAlignVertical: 'top',
    },
    ingredientSection: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#CDEEFF',
        padding: 16,
    },
    sectionTitle: {
        fontFamily: "ONE Mobile POP",
        fontSize: 25,
        marginBottom: 10,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        padding: 8,
    },
    ingredientImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    ingredientName: {
        fontFamily: "ONE Mobile POP",
        fontSize: 14,
        fontWeight: '400',
    },
    progressWrapper: {
        flex: 1,
        height: 8,
        backgroundColor: '#ddd',
        borderRadius: 4,
        marginLeft: 8,
    },
    progress: {
        height: '100%',
        borderRadius: 4,
    },
});
