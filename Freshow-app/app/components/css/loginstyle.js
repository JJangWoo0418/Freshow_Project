import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E6F2F5',
        paddingHorizontal: SIZES.large,
    },
    topContent: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    mascot: {
        width: 80,
        height: 80,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontFamily: FONT.bold,
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 14,
        fontFamily: FONT.medium,
        color: COLORS.gray,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    socialButton: {
        width: "90%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        flexDirection: "row",
    },
    socialIcon: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        width: "90%",
        height: 45,
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray,
        borderWidth: 1,
        marginVertical: 5,
    },
    startButton: {
        width: "90%",
        backgroundColor: '#B3E5FC',
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: SIZES.radius,
        marginBottom: 15,
    },
    startButtonText: {
        fontSize: 16,
        fontFamily: FONT.bold,
        color: COLORS.black,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    footerText: {
        fontSize: 14,
        color: COLORS.gray,
    },
    footerSeparator: {
        fontSize: 14,
        color: COLORS.gray,
        marginHorizontal: 5,
    },
});

export default styles;
