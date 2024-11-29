import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    },
    header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    },
    headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    },
    headerButton: {
    fontSize: 16,
    color: "#333",
    },
    productInfoContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    },
    imageButton: {
    backgroundColor: "#E0F7FA",
    paddingVertical: 80,
    alignItems: "center",
    borderRadius: 8,
    },
    imageButtonText: {
    color: "#333",
    fontSize: 16,
    },
    imagePreview: {
    width: 100, // 원하는 너비
    height: 100, // 원하는 높이
    borderRadius: 10, // 테두리 둥글게
    resizeMode: "cover", // 이미지가 뷰에 맞게 잘림 없이 표시되도록 설정
    borderWidth: 1, // 테두리 두께
    borderColor: "#ddd", // 테두리 색상
    marginTop: 10, // 위쪽 여백
    },
    itemTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    },
    toggleContainer: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#000",
    },
    toggleButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#B3E5FC",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5, // 버튼 테두리를 둥글게 설정
    width: 100, // 너비를 고정
    height: 40, // 높이를 고정
    },
    selectedToggleButton: {
    backgroundColor: "#fff",
    },
    toggleButtonText: {
    color: "#fff",
    fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    submitButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    closeButton: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    tagList: {
        marginTop: 10,
    },
    tagItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    tagIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    tagLabel: {
        fontSize: 16,
    },
    selectedToggleButtonText: {
    color: "#81D4FA",
    fontWeight: "bold",
    },
    tagButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#FFB6C1",
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: 100, // 너비를 고정
    height: 43, // 높이를 고정
    marginLeft: 50,
    },
    tagButtonText: {
    color: "#fff",
    fontWeight: "bold",
    },
    customTagButton: {
    backgroundColor: "#E8E8E8",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    },
    customTagText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    },
    label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    },
    input: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 355,
    },
    countContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    },
    countButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    },
    countButtonText: {
    fontSize: 20,
    color: "#333",
    },
    countText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    },
    quantityInput: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 15,
    width: 228,
    },
    expiryContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    },
    expiryButton: {
    backgroundColor: "#FFB6C1",
    paddingVertical: 12,
    paddingHorizontal: 119,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    },
    expiryButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    },
    dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    },
    dateInput: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    marginRight: 10,
    },
    calendarIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10, // 아이콘과 입력창 간격
    },
    calendarIconText: {
    fontSize: 24, // 달력 아이콘 크기
    },
    });
    
    export default styles;