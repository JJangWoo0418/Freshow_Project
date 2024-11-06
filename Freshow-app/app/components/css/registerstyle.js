import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 9,
        marginRight: 5
    },
    idinput: {
        height: 40,
        width: 190,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 1,
        backgroundColor: COLORS.lightGray,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 330,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: COLORS.lightGray,
    },
    duplicateCheckButton: {
        paddingHorizontal: 15,
        marginLeft: 8,
        marginBottom: 1
    },
    duplicateCheckText: {
        color: COLORS.black,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: SIZES.small,
        marginBottom: 10,
    },
    registerButton: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    registerButtonText: {
        color: COLORS.black,
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: COLORS.gray,
    },
    loginLink: {
        color: COLORS.blue,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    stickBar:{
        width: 330, 
        height: 3,
        marginBottom: 20, 
        marginTop: 20,
        alignItems: 'center',
    }
});

export default styles;
