import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.large,
    },
    topContent: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 20
    },
    bottomContent: {
        alignItems: 'center',
        marginBottom: 30, // 버튼과 로그인 텍스트의 하단 여백
    },
    mascot: {
        width: width * 0.8,
        height: height * 0.75,
        marginBottom: SIZES.large,
        resizeMode: 'contain',
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
        paddingVertical: SIZES.medium,
        paddingHorizontal: width * 0.3,
        borderRadius: SIZES.radius,
        marginBottom: 2,        
    },
    startButtonText: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    loginText: {
        fontSize: SIZES.medium,
        color: COLORS.gray,
        marginBottom: 20,
    },
    loginLink: {
        resizeMode: 'contain',
        marginTop:10
    },
});

export default styles;
