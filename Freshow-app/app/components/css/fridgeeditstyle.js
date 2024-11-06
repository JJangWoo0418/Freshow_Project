import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',  // 배경색
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
    },
    backButtonText: {
        fontSize: 24,
        color: '#4A90E2',  // 뒤로 가기 버튼 색상
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A90E2',  // 헤더 텍스트 색상
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#E0F7FA',  // 이미지 배경색
        marginBottom: 20,
        borderRadius: 8,
    },
    label: {
        fontSize: 16,
        color: '#4A90E2',  // 라벨 텍스트 색상
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: '#B3E5FC',  // 입력 필드 테두리 색상
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',  // 입력 필드 배경색을 흰색으로 설정
    },
    saveButton: {
        backgroundColor: '#4A90E2',  // 저장 버튼 배경색
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',  // 저장 버튼 텍스트 색상
    },
    deleteButton: {
        backgroundColor: '#FF6347',  // 삭제 버튼 배경색
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',  // 삭제 버튼 텍스트 색상
    },
});

export default styles;
