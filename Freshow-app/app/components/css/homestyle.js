import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.large,
    },
    mascot: {
        width: width * 0.4, // 화면 폭의 40%로 크기 조정
        height: height * 0.2, // 화면 높이의 20%로 크기 조정
        marginBottom: SIZES.large,
        resizeMode: 'contain', // 비율을 유지하면서 이미지 크기 조정
    },
    title: {
        fontSize: SIZES.xLarge,
        fontFamily: FONT.bold,
        color: COLORS.black,
        marginBottom: SIZES.small,
    },
    description: {
        fontSize: SIZES.medium,
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: SIZES.large,
        lineHeight: SIZES.large,
    },
    highlight: {
        color: COLORS.accent,
        fontWeight: 'bold',
    },
    startButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.medium,
        paddingHorizontal: width * 0.3, // 화면 폭의 30%로 버튼 크기 조정
        borderRadius: SIZES.radius,
        marginBottom: SIZES.medium,
    },
    startButtonText: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    loginText: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    loginLink: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});

export default styles;
