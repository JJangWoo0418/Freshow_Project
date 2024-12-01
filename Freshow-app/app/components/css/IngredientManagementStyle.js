import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16, // 전체 컨테이너 좌우 여백 추가
        marginTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4, // 전체 헤더 아래 여백
        paddingHorizontal: 16,
        paddingTop: 16, // 헤더 상단 여백
        marginRight: 33, 
        paddingRight: 40
    },
    backButton: {
        marginBottom: 17, //
        marginRight: 20
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
        marginBottom: 20, // Title 아래 추가 여백
        marginLeft: 20, // Title 위에 추가 여��
        paddingLeft: 20
    },
    categoryContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f0f8ff',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 16, // 카테고리 컨테이너 내부 좌우 여백 추가
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontFamily: "ONE Mobile POP",
        color: '#333',
    },
    addButton: {
        fontSize: 24,
        color: '#007AFF',
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 16, // 양옆 padding 추가
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
    },
    ingredientImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    ingredientDetails: {
        flex: 1,
    },
    ingredientName: {
        fontSize: 16,
        fontFamily: "ONE Mobile POP",
        color: '#555',
        marginBottom: 5,
    },
    progressBarContainer: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 5,
    },
    percentageText: {
        fontSize: 14,
        fontFamily: "ONE Mobile POP",
        color: '#555',
        marginTop: 22,
        marginLeft: 10,
    },
});

export default styles;
