import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, StatusBar} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import styles from './components/css/loginstyle';
import { COLORS } from "../constants";

const Login = () => {
    const router = useRouter();

    return (        
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"/>

            <Stack.Screen
                options={{
                    headerTitle: "프래시오",
                    headerStyle: { backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                }}
            />

            <View style={styles.topContent}>
                <Image source={require('../assets/LoginLogo.png')} style={styles.mascot} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/GoogleLoginBtn.png')} style={styles.socialIcon} />             
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/FacebookLoginbtn.png')} style={styles.socialIcon} />                   
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/AppleLoginBtn.png')} style={styles.socialIcon} />                   
                </TouchableOpacity>
            </View>

            <Image source={require('../assets/Stick.png')} style={styles.stickBar} />

            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="아이디" placeholderTextColor={COLORS.gray} />
                <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor={COLORS.gray} secureTextEntry />
            </View>

            <TouchableOpacity style={styles.startButton} onPress={() => router.push('Main')}>
                <Image source={require('../assets/Btn2.png')} />
            </TouchableOpacity>

            <View style={styles.footer}>
                <TouchableOpacity>
                    <Image source={require('../assets/PasswordSearch.png')} /> 
                </TouchableOpacity>
                
                <Text style={styles.footerSeparator}> | </Text>
                <TouchableOpacity onPress={() => router.push('register')}>
                    <Image source={require('../assets/RegisterBtn.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Login;