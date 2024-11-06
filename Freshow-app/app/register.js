import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StatusBar, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import styles from './components/css/registerstyle';
import { COLORS } from "../constants";

const Register = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (confirmPassword && text !== confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        if (password && text !== password) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Stack.Screen
                options={{
                    headerTitle: "회원가입",
                    headerStyle: { backgroundColor: "#FFFFFF" },
                    headerShadowVisible: false,
                }}
            />

            <View style={styles.content}>
                <Text style={styles.title}>회원가입                                                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.idinput}
                        placeholder="아이디"
                        placeholderTextColor={COLORS.gray}
                        
                    />
                    <TouchableOpacity style={styles.duplicateCheckButton}>
                        <Image source={require('../assets/duplicatecheckbtn.png')} />
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry
                    value={password}
                    onChangeText={handlePasswordChange}
                    autoCompleteType="off"
                />
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호 확인"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    autoCompleteType="off"
                />
                
                {passwordError ? (
                    <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}

                <Image source={require('../assets/Stick.png')} style={styles.stickBar} />

                <TouchableOpacity style={styles.registerButton}>
                    <Image source={require('../assets/registerbtn2.png')} />
                </TouchableOpacity>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.push('login')}>
                        <Image source={require('../assets/registerquestionbtn.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;
