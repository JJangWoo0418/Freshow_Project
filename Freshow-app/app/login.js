import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import styles from './components/css/loginstyle';
import { COLORS } from "../constants";
import * as Google from 'expo-auth-session/providers/google';
import { firebase } from '../app/firebaseconfig';

const Login = () => {
    const router = useRouter();

    // Google 로그인 프로바이더 초기화
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "",
        androidClientId: "",
        iosClientId: "",
        webClientId: "",
        scopes: ["profile", "email"],
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            const credential = firebase.auth.GoogleAuthProvider.credential(authentication.idToken);
            
            firebase.auth().signInWithCredential(credential)
                .then((userCredential) => {
                    const user = userCredential.user;

                    // 계정 DB 구조 확인 및 초기화
                    const userRef = firebase.firestore().collection('계정').doc(user.uid);
                    userRef.get().then((docSnapshot) => {
                        if (!docSnapshot.exists) {
                            userRef.set({
                                username: user.displayName || 'Unknown',
                                email: user.email,
                                createdAt: new Date(),
                            });
                        }
                    });

                    Alert.alert("로그인 성공", "Google 로그인에 성공했습니다.");
                    router.push('Main');
                })
                .catch(error => {
                    Alert.alert("로그인 오류", error.message);
                });
        }
    }, [response]);

    return (        
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"/>

            <Stack.Screen
                options={{
                    headerTitle: "프래시오",
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                }}
            />

            <View style={styles.topContent}>
                <Image source={require('../assets/LoginLogo.png')} style={styles.mascot} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.socialButton}
                    disabled={!request}
                    onPress={() => promptAsync({ useProxy: true })}
                >
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
