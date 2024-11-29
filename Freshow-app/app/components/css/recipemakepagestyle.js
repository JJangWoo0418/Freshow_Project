import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:50
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    recipeImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        
    },
    recipeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20,
        color: '#DD4A48',
    },
    stickBar: {
        width: '120%',
        height: 6,
        marginVertical: 10,
        alignSelf: 'center',
    },
    loader: {
        marginTop: 20,
    },
    stepsScroll: {
    },
    stepsContainer: {
        paddingVertical: 10,
        marginTop: 3,
        paddingBottom: 130
    },
    step: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    stepNumber: {
        fontWeight: 'bold',
        marginRight: 5,
        color: '#DD4A48',
        fontSize: 20, 
        lineHeight: 25,
    },
    stepText: {
        flex: 1, // 텍스트가 자동으로 줄바꿈되도록 설정
        fontSize: 20, // 텍스트 크기
        lineHeight: 25, // 줄 간격
        color: '#333', // 텍스트 색상
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
        borderTopWidth: 5,
        borderTopColor: '#E4E4E4',
        marginTop: 20,
    },
    footerButton: {
        alignItems: 'center',
    },
    footerIcon: {
        width: 50,
        height: 50,
    },
    imageLoader: {
        position: 'absolute',
        top: '40%',
        alignSelf: 'center',
        zIndex: 10,
    },
    card: {
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 10,
        elevation: 3, // 안드로이드 그림자
        shadowColor: '#000', // iOS 그림자
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    cardNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6347',
        marginBottom: 5,
        marginLeft: 150,
    },
    cardText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    healtheatbtn: {
        marginBottom: 15,
        marginTop: 10,
    }
    
});


export default styles;
