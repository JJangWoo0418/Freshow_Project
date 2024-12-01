import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: 'white',
        marginTop: 50,
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
        fontSize: 28,
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
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    memoSection: {
        marginBottom: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#FFFCED',
        padding: 10,
    },
    memoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        marginRight: 35,
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
    titleInput: {
        width: '100%',
        height: 30,
        fontFamily: "ONE Mobile POP",
        color: 'black', 
        fontSize: 20,
        textAlignVertical: 'top',
        paddingBottom: 10,
        marginTop: 10,
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
        borderRadius: 10,
        marginRight: 8,
        marginLeft: 8,
    },
    ingredientName: {
        fontFamily: "ONE Mobile POP",
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    progressWrapper: {
        flex: 1,
        height: 8,
        backgroundColor: '#ddd',
        borderRadius: 4,
        marginLeft: 20,
    },
    progress: {
        height: '100%',
        borderRadius: 4,
    },
    
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // 배경을 반투명하게
    },
    popupContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    popupText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#CDEEFF', // 변경된 색상
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    memotext:{
        marginLeft: 4,
        marginBottom: 20,
        marginTop: 10
    },
    imageandnamecontainer:{
    },
    expirypercentage:{
        marginLeft: 10    
    }
});
