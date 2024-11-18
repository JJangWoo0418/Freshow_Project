import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
    topContent: {
        alignItems: 'center',
        marginTop: 50,
    },
    mascot: {
        width: 350,
        height: 350,
        resizeMode: 'contain',
    },
    subtitle: {
        marginTop: 20,
        fontSize: SIZES.large,
        color: COLORS.black,
        textAlign: 'center',
    },
    bottomContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '95%',
        height: 50,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    loginButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 15,
    },
    loginButtonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },
    kakaoButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    socialIcon: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    registerLink: {
        color: COLORS.gray,
        fontSize: SIZES.medium,
        textDecorationLine: 'underline',
        marginTop: 15,
    },
    stickBar:{
        width: 350, 
        height: 3,
        marginBottom: 20, 
        marginTop: 10,
        alignItems: 'center',
    },
    registerBtn: {
        marginTop: 10,
    },
});

export default styles;
