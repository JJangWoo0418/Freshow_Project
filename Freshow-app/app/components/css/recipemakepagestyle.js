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
        width: '90%',
        height: 6,
        marginVertical: 10,
        alignSelf: 'center',
    },
    loader: {
        marginTop: 20,
    },
    stepsScroll: {
        flex: 1,
    },
    stepsContainer: {
        paddingVertical: 10,
        marginTop: 20,
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
        borderTopWidth: 0,
        borderTopColor: '#ddd',
    },
    footerButton: {
        alignItems: 'center',
    },
    footerIcon: {
        width: 50,
        height: 50,
    },
});


export default styles;
