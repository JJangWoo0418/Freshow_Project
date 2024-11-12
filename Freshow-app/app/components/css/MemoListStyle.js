// MemoListStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    headerTitle: {
        fontFamily: 'ONE Mobile POP',
        fontSize: 24,
    },
    memoCard: {
        borderRadius: 12,
        padding: 20, // 패딩을 더 넓게 설정하여 메모 카드 크기 증가
        marginBottom: 16,
    },
    memoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, // 제목과 점 세게 부분을 위로 올리기 위한 마진 감소
    },
    memoTitle: {
        fontFamily: 'ONE Mobile POP',
        fontSize: 18,
        textAlign: 'left', // 제목 왼쪽 정렬
    },
    memoContent: {
        fontFamily: 'ONE Mobile POP',
        fontSize: 14, // 메모 내용 글자 크기 작게 조정
        color: '#555',
        textAlign: 'left', // 메모 내용 왼쪽 정렬
        marginBottom: 100,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorPicker: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
        justifyContent: 'space-around',
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 8,
    },
    deleteOption: {
        alignItems: 'center',
        marginTop: 16,
    },
    deleteText: {
        fontSize: 16,
        color: 'gray',
    },
});
