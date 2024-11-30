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
    saveButton: {
    width: 40, 
    height: 40, 
    marginLeft: 1,
    fontsize: 30,
    marginTop: 12,
    },
    saveButtonText: {
    fontSize: 16, // 텍스트 크기 조정
    fontWeight: "600",
    color: "black",
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
    width: 355, // 원하는 너비
    height: 300, // 원하는 높이
    backgroundColor: "#E0F7FA",
    paddingVertical: 120,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1
    },
    imageButtonText: {
    color: "#333",
    fontSize: 16,
    width: 70,
    height: 70,
    resizeMode: 'contain'
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
    itemTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    },
    toggleContainer: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#B3E5FC",
    width: 220
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
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
    },
    selectedToggleButton: {
    backgroundColor: "white",
    borderRadius: 13,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
    },
    toggleButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
    marginBottom: 20,
    marginRight: 15,
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
        fontSize: 25,
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
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: 100, // 너비를 고정
    height: 43, // 높이를 고정
    marginLeft: 35,
    },
    tagButtonText: {
    color: "black",
    fontWeight: "bold",
    },
    customTagButton: {
    backgroundColor: "#B3E5FC",
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
    fontWeight: "bold",
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
    taginput: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 280,
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
    alignItems: "flex-start",
    },
    expiryButton: {
    backgroundColor: "#FFB6C1",
    paddingVertical: 12,
    paddingHorizontal: 118,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1
    },
    backButton: {
    width: 40, // Ionicons와 동일한 너비
    height: 40, // Ionicons와 동일한 높이
    marginRight: 8,
    marginTop: 10,
    marginLeft: 4,
    },
    backIcon: {
    },
    backButtonText: {
    fontSize: 20,
    color: "#000",
    },
    expiryButtonText: {
    color: "black",
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
    unitput:{
        height: 40,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        width: 100,
        marginLeft: 145,
    },
    });
    
    export default styles;