import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.White,
        paddingHorizontal: SIZES.large,
    },
    topContent: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    mascot: {
        width: 250,
        height: 250,
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
        marginBottom: 12,
        marginTop: 2
    },
    socialButton: {
        width: "110%",
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
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
        marginBottom: 5,
    },
    input: {
        width: "77%",
        height: 45,
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray,
        borderWidth: 1,
        marginVertical: 8,
        alignItems: "center",
    },
    startButton: {
        width: "90%",
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: SIZES.radius,
        marginBottom: 3,
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
        marginLeft: 15,
        marginRight: 15,
    },
    stickBar:{
        width: 300, 
        height: 3,
        marginBottom: 20, 
        marginTop: 2,
        alignItems: 'center',
    }
});

export default styles;
