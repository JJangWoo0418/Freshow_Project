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
        marginBottom: 16,
    },
    backText: {
        color: '#007BFF',
        fontSize: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    saveText: {
        color: '#007BFF',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    imagePreview: {
        width: 355, // 원하는 너비
        height: 310, // 원하는 높이
        borderRadius: 10, // 테두리 둥글게
        resizeMode: "cover", // 이미지가 뷰에 맞게 잘림 없이 표시되도록 설정
        borderWidth: 1, // 테두리 두께
        borderColor: "#ddd", // 테두리 색상
        marginTop: 10, // 위쪽 여백
    },
    imageButtonText: {
        color: "#333",
        fontSize: 16,
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
});


export default styles;