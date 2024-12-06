// MemoListStyle.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        marginTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    headerTitle: {
        fontFamily: 'ONE Mobile POP',
        fontSize: 24,
    },
    memoCard: {
        // 기존 스타일에 position: 'relative' 추가
        position: 'relative',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    memoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    memoCardTouchable: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
    },
    memoTitle: {
        fontFamily: 'ONE Mobile POP',
        fontSize: 18,
        textAlign: 'left',
    },
    memoContent: {
        fontFamily: 'ONE Mobile POP',
        fontSize: 14,
        height:100,
        color: '#555',
        textAlign: 'left',
        marginBottom: 100,
        paddingTop: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    optionsMenu: {
        position: 'absolute',
        alignSelf: 'center',
        top: '40%',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
});
